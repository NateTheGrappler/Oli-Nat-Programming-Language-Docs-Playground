import { useState, useEffect } from "react";
import "../../assets/testCases.css"


interface TestCase {
    name: string;
    code: string;
}

//get all of the actual testFiles, since they're just test files you can query them outright
const testFiles = import.meta.glob('/src/testCases/*.oli', {
    query: '?raw',
    import: 'default',
    eager: true
})


//for each file path, get just the name of the file by stripping all the uneeded content, and then read it and set it's code in the sampleTests variable
const sampleTests: TestCase[] = Object.entries(testFiles).map(([path, code]) => {
    const fileName = path.split('/').pop()!.replace('.oli', '');
    return { name: fileName, code: code as string };
});

interface testCaseProps {
    changeCode: (code:string)=>void
}

function TestCases({changeCode}: testCaseProps) {
    

    function handleClick(code: string) {
        changeCode(code);
    }

    return (
        <div className="testCases">
            <div className="testCases-title">Sample Programs</div>
            <div className="testCases-list">
                {sampleTests.map((test) => (
                    <button
                        key={test.name}
                        onClick ={() => handleClick(test.code)}
                        className="testCases-item">
                        {test.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TestCases;