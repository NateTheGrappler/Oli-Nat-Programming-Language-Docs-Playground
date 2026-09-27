import CodeEditor from "./CodeEditor";
import CodeTerminal from "./CodeTerminal";
import TestCases from "./testCases";
import "../../assets/Playground.css"
import { useState } from 'react';


//main parent component that encompasses the content that gets seen by the /playground route
function Playground()
{
    const [code, setCode] = useState("make int x = 10;\nprintln(x);")
    

    return (

        <div className = "playground-mainContent">
            
            <div className = "playground-inputContent">
                <TestCases changeCode={setCode}/>
                <CodeEditor code={code} changeCode={setCode} />
            </div>
            
            <CodeTerminal />

        </div>

    );
}

export default Playground;