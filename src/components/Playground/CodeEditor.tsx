import CodeMirror from '@uiw/react-codemirror';
import { nord } from '@uiw/codemirror-theme-nord';
import { cpp } from '@codemirror/lang-cpp';
import "../../assets/CodeEditor.css"

interface codeEditorProps {
    code: string;
    changeCode: (code: string) => void;
}

function CodeEditor({code, changeCode}: codeEditorProps)
{

    function handleClear() {
        //a bunch of newline characters so it shows the numbers cuz it looks better
        changeCode("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    }


    return (
        <div className="codeEditor">
            

            <CodeMirror
                className="codeEditorRoot"
                value={code}
                height="100%"
                theme ={nord}
                extensions={[cpp()]}
                onChange={(value) => changeCode(value)}
                basicSetup={{
                    lineNumbers: true,
                    highlightActiveLine: true,
                    foldGutter: true,
                }}
            />

            <div className="codeEditor-Buttons">
                <button className="codeEditor-Clear" onClick={handleClear}>Clear</button>
                <button className="codeEditor-Run">Run</button>
            </div>
            
        </div>
    );
}

export default CodeEditor;