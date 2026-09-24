import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import { nord } from '@uiw/codemirror-theme-nord';
import { cpp } from '@codemirror/lang-cpp';
import "../../assets/CodeEditor.css"
import logo from '../../assets/Images/Oli-Nat-Logo-Banner.png';



function CodeEditor()
{

    const [code, setCode] = useState("make int x = 10;\nprintln(x);")

    return (
        <div className="codeEditor">
            

            <CodeMirror
                className="codeEditorRoot"
                value={code}
                height="100%"
                theme ={nord}
                extensions={[cpp()]}
                onChange={(value) => setCode(value)}
                basicSetup={{
                    lineNumbers: true,
                    highlightActiveLine: true,
                    foldGutter: true,
                }}
            />

            <div className="codeEditor-Buttons">
                <button className="codeEditor-Clear">Clear</button>
                <button className="codeEditor-Run">Run</button>
            </div>


            
        </div>
    );
}

export default CodeEditor;