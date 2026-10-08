import { sections, type Page } from "./sections";


export interface orderedPage {
    route: string;      // /docs/guide/arrays
    title: string;     //  arrays
    sectionId: string; // src/docs
    slug: string;
}

//turn the nested arrays of children pages into a single flat array of ordered page values
function flatten(pages: Page[], sectionRoute: string, sectionId: string): orderedPage[] {
    return pages.flatMap(page =>
        page.children?.length
            ? flatten(page.children, sectionRoute, sectionId)
            : [{ route: `${sectionRoute}/${page.slug}`, title: page.title, sectionId, slug: page.slug }]
    );
}

//flip through each of those pages and then just get one giant list of the routes for all of them
export const allPages: orderedPage[] = sections.flatMap(sections => 
    flatten(sections.pages, sections.route, sections.id)
);