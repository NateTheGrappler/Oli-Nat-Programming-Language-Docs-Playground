import type { Section } from '../config/sections';
import { allPages } from '../config/pageOrder';
import type { ComponentType } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../assets/MainContent.css'

//all of the given documents that Ima write
const docModules = import.meta.glob('/src/docs/**/*.mdx');


function MainContent({activeSection, documentationFilePath}: {activeSection?: Section, documentationFilePath: string})
{

    //state regarding the actual documentation files
    const [DocComponent, setDocComponent] = useState<ComponentType | null>(null);
    const [notFound, setNotFound] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    //get all of the pages that actually have content while content is still being written in, skip over empty ones for better user experience
    const accessiblePages = allPages.filter(
        page => `/src/docs/${page.sectionId}/${page.slug}.mdx` in docModules
    );


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
        console.log("Doc Filepath: " + documentationFilePath);
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

        useLayoutEffect(() => {
        scrollRef.current?.scrollTo({ top: 0 });
    }, [DocComponent]);

    //
    const currentRoute = documentationFilePath.replace(/\/$/, ''); //ignore a trailing slash
    const index = accessiblePages.findIndex(page => page.route === currentRoute); //in the long list of avaliable pages, find the index of ones matching current route without slug, so like /docs/guides*
    const previous = index > 0 ? accessiblePages[index - 1] : null; //see if there are previous pages the user can click to
    const next = index !== -1 && index < accessiblePages.length - 1 ? accessiblePages[index + 1] : null;



    return (
        <div className="outerMainContentDiv" ref = {scrollRef}>
            <div className="doc-content">
                {notFound && <p>Page not found, please allow admin time to fillout page, or contribute to the documentation yourself!.</p>}
                {DocComponent && <DocComponent />}
            </div>


            <nav className="doc-movement" aria-label="Page navigation">
                {previous && (
                    <Link to={previous.route} className="doc-movement-link doc-movement-previous">
                        <span className="doc-movement-title">{"<<: " + previous.title}</span>
                    </Link>
                )}
                {next && (
                    <Link to={next.route} className="doc-movement-link doc-movement-next">

                        <span className="doc-movement-title">{next.title + " :>>"}</span>
                    </Link>
                )}
            </nav>

        </div>
    );
}

export default MainContent;