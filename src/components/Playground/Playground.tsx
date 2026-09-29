import CodeEditor from "./CodeEditor";
import CodeTerminal from "./CodeTerminal";
import TestCases from "./testCases";
import "../../assets/Playground.css"
import { useState, useEffect, useRef } from 'react';

//import the WASM executable here
import createOliNat from '../../WASM/Oli_Nat.mjs'


//main parent component that encompasses the content that gets seen by the /playground route
function Playground()
{
    const [code, setCode] = useState("")
    const [codeOutput, setCodeOutput] = useState<{text: string; error: boolean}[]>([]);
    const [ready, setReady] = useState(false);

    
    const runRef = useRef<((source: string) => number) | null>(null);
    const linesRef = useRef<{text: string; error: boolean}[]>([]);

    //instantiate the executable instance for the actual compiler
    useEffect( () => {

        createOliNat({
            //establish two hooks that catch the output from the language, pass in the outputted line from the Vm and the exit code
            print: (line) => linesRef.current.push({text: line, error: false}),
            printErr: (line) => linesRef.current.push({text: line, error: true}),
        })
        .then((mod) => {
            //update the signal that says the module is ready to run and everything is all loaded in
            runRef.current = mod.cwrap('runFromSource', 'number', ['string']);
            setReady(true);
        })
    }, []);


    //the function that handles calling the module function and updating all of the code output that occurs
    const runProgram = () => {

        //see where we get
        console.log("Running Code:");
        console.log(code)

        //null check
        const run = runRef.current;
        if(!run) {console.log("WASM module failed to load in correctly, aborting program"); return; }


        //clear any of the old output from program
        linesRef.current = [];

        //use the copied over runRef.current function in order to pass in the text in the CodeEditor Component as 
        //a source string for the wASM language executable, and then using the established hooks above and what not,
        //populate the output string with the actual output of the language
        run(code);
        setCodeOutput(linesRef.current);

        //print it out to the terminal for now
        console.log("Code Output:")
        console.log(codeOutput)
        console.log(codeOutput[0].text)
    };


    return (

        <div className = "playground-mainContent">
            
            <div className = "playground-inputContent">
                <TestCases changeCode={setCode}/>
                <CodeEditor code={code} changeCode={setCode} runCode={runProgram}/>
            </div>
            
            <CodeTerminal outPutArray={codeOutput} ready={ready}/>

        </div>

    );
}

export default Playground;