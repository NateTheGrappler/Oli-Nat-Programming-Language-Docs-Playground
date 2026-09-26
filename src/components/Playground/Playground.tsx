import CodeEditor from "./CodeEditor";
import CodeTerminal from "./CodeTerminal";
import TestCases from "./testCases";
import "../../assets/Playground.css"

//main parent component that encompasses the content that gets seen by the /playground route
function Playground()
{
    return (

        <div className = "playground-mainContent">
            
            <div className = "playground-inputContent">
                <TestCases />
                <CodeEditor />
            </div>
            
            <CodeTerminal />

        </div>

    );
}

export default Playground;