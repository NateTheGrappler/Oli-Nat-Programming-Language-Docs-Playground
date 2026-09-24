import type { Section } from '../config/sections';
import type { ComponentType } from 'react';
import { useEffect, useState } from 'react';
import '../assets/MainContent.css'

//all of the given documents that Ima write
const docModules = import.meta.glob('/src/docs/**/*.mdx');


function MainContent({activeSection, documentationFilePath}: {activeSection?: Section, documentationFilePath: string})
{

    //state regarding the actual documentation files
    const [DocComponent, setDocComponent] = useState<ComponentType | null>(null);
    const [notFound, setNotFound] = useState(false);


    useEffect(() => {

        //if you can't get the config json then just bail out of rendering
        if(!activeSection)
        {
            console.log("Main Content failed to get sections json")
            setDocComponent(null);
            setNotFound(true);
            return;
        }

        //out of the current route get the actual name of the document, the page slug
        const pageSlug = documentationFilePath.replace(activeSection.route, '')
        .split('/')
        .filter(Boolean)[0];
        console.log("Page Slug: " + pageSlug);

        //use the page slug and then the given section ID to determine the place of the .mdx file in the project structure dir
        const filePath = `/src/docs/${activeSection.id}/${pageSlug}.mdx`;
        console.log("FilePath: " + filePath);
        const loader = docModules[filePath];

        //if you could not find the document, bail out of rendering and send a message in the console
        if(!loader)
        {
            console.log("Loader Failed to Get Document")
            setDocComponent(null);
            setNotFound(true);
            return;
        }

        setNotFound(false);
        let cancelled = false;

        //load in the document that you had gotten so you can actually start rendering it
        loader().then((mod: any) => {
            if (!cancelled) setDocComponent(() => mod.default);
        });

        return () => { cancelled = true; };

    }, [activeSection, documentationFilePath])


    return (
        <div className="outerMainContentDiv">
            <div className="doc-content">
                {notFound && <p>Page not found.</p>}
                {DocComponent && <DocComponent />}
            </div>
        </div>
    );
}

export default MainContent;