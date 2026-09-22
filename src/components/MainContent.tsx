import type { Section } from '../config/sections';
import '../assets/MainContent.css'

function MainContent({activeSection, documentationFilePath}: {activeSection?: Section, documentationFilePath: string})
{

    return (
        <div className="outerMainContentDiv">
            <h1>{activeSection?.label}</h1>
        </div>
    );
}

export default MainContent;