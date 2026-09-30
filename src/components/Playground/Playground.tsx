import CodeEditor from "./CodeEditor";
import CodeTerminal from "./CodeTerminal";
import TestCases from "./testCases";
import "../../assets/Playground.css"
import { useState, useEffect, useRef } from 'react';

//import the WASM executable
import createOliNat from '../../WASM/Oli_Nat.mjs'


//main parent component that encompasses the content that gets seen by the /playground route
function Playground()
{
    const [code, setCode] = useState('#pullf io\nprintln("Hello Dear User!");');
    const [codeOutput, setCodeOutput] = useState<{text: string; error: boolean}[]>([]);
    const [ready, setReady] = useState(false);

    
    const runRef = useRef<((source: string) => Promise<number>) | null>(null);
    const linesRef = useRef<{text: string; error: boolean}[]>([]);

    //for handling the intake function in language
    const [running, setRunning] = useState(false);
    const [awaitingInput, setAwaitingInput] = useState(false);
    const inputResolveRef = useRef<((line: string) => void) | null>(null);


    //the place to store the bytes that get flushed out
    const outBytesRef = useRef<number[]>([]);
    const errorBytesRef = useRef<number[]>([]);
    const decoder = useRef(new TextDecoder()); //the text decorder takes in an array of bytes and outputs a JS string

    //the flush from the c function sends all of the programs here, but the print/printErr hooks only flush out the containing code buffer
    //only on a new line character, so instead flush it out witht this function here so that way the "print" function of the IO stdlib works properly
    function flushPrintBuffer(bytes: number[], error: boolean)
    {
        if(bytes.length === 0) return;
        linesRef.current.push({
            text: decoder.current.decode(new Uint8Array(bytes)), //convert the num array for the chars into a uint8 try and then decorder makes it a string
            error
        });

        bytes.length=0; //clear buffer
    }



    //instantiate the executable instance for the actual compiler
    useEffect( () => {

        createOliNat({
            //establish two hooks that catch the output from the language, pass in the outputted line from the Vm and the exit code
            //change the hooks from just pushing outright to linesRef to instead an intermediary flush funciton so that way when "print" is called
            //the given data doesn't just sit in the buffer until a newline character appears (the 10 is the size of the \n character)
            stdout: (c) => c === 10 ? flushPrintBuffer(outBytesRef.current, false) : outBytesRef.current.push(c),
            stderr: (c) => c === 10 ? flushPrintBuffer(errorBytesRef.current, true) : errorBytesRef.current.push(c),

            //called when the native intake() function runs
            requestInput: () => new Promise<string>((resolve) => {
                flushPrintBuffer(outBytesRef.current, false); //push out any prompt that the intake function might have had as an arugment
                setCodeOutput([...linesRef.current]);          //display out whatever had already been printed out so you can print it again
                inputResolveRef.current = resolve;            //the resolved promise response
                setAwaitingInput(true);
            })


        })
        .then((mod) => {
            //update the signal that says the module is ready to run and everything is all loaded in
            runRef.current = mod.cwrap('runFromSource', 'number', ['string'], {async:true});
            setReady(true);
        });
    }, []);


    //the function that handles calling the module function and updating all of the code output that occurs
    const runProgram = async () => {

        //see where we get
        console.log("Running Code:");
        console.log(code)

        //null check
        const run = runRef.current;
        if(!run || running) {console.log("WASM module failed to load in correctly, aborting program"); return; }


        //clear any of the old output from program
        setRunning(true);
        linesRef.current = [];

        //use the copied over runRef.current function in order to pass in the text in the CodeEditor Component as 
        //a source string for the wASM language executable, and then using the established hooks above and what not,
        //populate the output string with the actual output of the language
        await run(code);


        //run the flush function to empty the buffer of anything that does not have a new line character
        flushPrintBuffer(outBytesRef.current, false);
        flushPrintBuffer(errorBytesRef.current, true);


        setCodeOutput([...linesRef.current]); //create shallow copy of output because intake might change it

        //print it out to the terminal for now
        console.log("Code Output:")
        console.log(codeOutput)
        //console.log(codeOutput[0].text)
        setRunning(false);
    };

    //
    const submitInput = (text: string) => {
        const resolve = inputResolveRef.current;
        if(!resolve) {console.log("Resolve value is null at the attempt of inputting through intake function"); return;}

        //echo out what user types onto the prompt line so its a bit more seemless
        const last = linesRef.current[linesRef.current.length -1];
        if(last && !last.error) {last.text += text}
        else { linesRef.current.push({text, error: false}); }

        //clean up the data that the input feature touches, and also restart up the VM with the lst line inside of intakeNative in natives.c
        inputResolveRef.current = null;
        setAwaitingInput(false);
        resolve(text);
    }


    return (

        <div className = "playground-mainContent">
            
            <div className = "playground-inputContent">
                <TestCases changeCode={setCode}/>
                <CodeEditor code={code} changeCode={setCode} runCode={runProgram}/>
            </div>
            
            <CodeTerminal outPutArray={codeOutput} ready={ready} awaitingInput={awaitingInput} handleInputSubmit={submitInput}/>

        </div>

    );
}

export default Playground;