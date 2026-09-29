import computer from '../../assets/Images/ComputerTerminalLONG.png';
import "../../assets/CodeTerminal.css"
import { useRef, useEffect } from 'react';

type CodeOutputArray = {text: string; error: boolean}[]

interface CodeTerminalProps {
    outPutArray: CodeOutputArray,
    ready: boolean,
}

function CodeTerminal({outPutArray, ready}: CodeTerminalProps)
{

    //this is the screen for the computer image, just a div but still
    const screenRef = useRef<HTMLDivElement>(null);


    //any time the output changes rerender the div so that way it shows the newest most relevant output between react rerenders
    useEffect(() => {
        const screen = screenRef.current;
        if(screen)
        {
            screen.scrollTop = screen.scrollHeight;
        }
    }, [outPutArray])

    return (
        <div className="codeTerminal">
            <div className="codeTerminal-monitor">
                <img className="codeTerminal-Computer" src={computer} alt="Retro terminal" />
                <div className = "codeTerminal-screen" ref={screenRef}>

                    {/*Standard text that is ran whenever there is no output from the code yet */}
                    {outPutArray.length === 0 ? (

                        <div className='codeTerminal-placeHolder'>
                            {ready ? ":> press run to execute your code!" : "> loading Oli-Nat Binaries..."}
                        </div>

                    ) : (
                        outPutArray.map((line, i) => (
                            <div key={i} className={!line.error ? "codeTerminal-line" : "codeTerminal-error"}>
                                {/*This iterates over all of the line objects stored inside of the output array and then renders them as their own div */}
                                {":> " + line.text}
                            </div>
                        ))
                    )}

                </div>
            </div>
        </div>
    );
}

export default CodeTerminal;