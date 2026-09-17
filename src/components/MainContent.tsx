import type { Section } from '../config/sections';

function MainContent({activeSection, documentationFilePath}: {activeSection?: Section, documentationFilePath: string})
{

    console.log(documentationFilePath)
    return (
        <div>
            <h1>{activeSection?.label}</h1>
        </div>
    );
}

export default MainContent;