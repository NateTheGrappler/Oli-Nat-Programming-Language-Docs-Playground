import "../../assets/testCases.css"

interface TestCase {
    name: string;
    code: string;
}

const sampleTests: TestCase[] = [
    { name: "Hello World", code: `println("Hello Dear User!");` },
];

function TestCases() {
    return (
        <div className="testCases">
            <div className="testCases-title">Sample Programs</div>
            <div className="testCases-list">
                {sampleTests.map((test) => (
                    <button
                        key={test.name}
                        className="testCases-item">
                        {test.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TestCases;