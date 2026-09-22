import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { Page } from '../config/sections';

function SidebarItem({page, basePath, depth = 0}: {page: Page; basePath: string; depth?: number})
{
    const [open, setOpen] = useState(false);
    const hasChildren = !!page.children?.length; //!! syntax coverts to boolean value and then flips the value and whatnot
    const isChild = depth > 0;

    if(hasChildren)
    {
        return (
            <div className = "sidebar-item">

                {/*The parent items which include a chevron to showcase they have extra stuff in them*/}
                <button className = "sidebar-category" onClick={()=> setOpen(o=>!o)} style={{ paddingLeft: `${12 + depth * 12}px` }}> 
                    <span>{page.title}</span>
                    <span className={`sidebar-chevron ${open ? 'sidebar-chevron-open' : ''}`}>▸</span>
                </button>

                {/*Render Child Items by just looping over them and calling this same component so they can get rendered down below*/}
                <div className={`sidebar-children-wrapper ${open ? 'sidebar-children-open' : ''}`}>
                    <div className="sidebar-children-inner">
                        {page.children!.map(child => (
                            <SidebarItem key={child.slug} page={child} basePath={basePath} depth={depth + 1} />
                        ))}
                    </div>
                </div>

            </div>
        );
    }

    //render the sidebar item without the excess recusrive items
    //basically make the check to see if it is a regular item or if it is a
    //nested item and render them differently, also render differently if it
    //is the currently selected item as well
    return (
        <NavLink
            to={`${basePath}/${page.slug}`} 
            className={({ isActive }) =>
                `sidebar-link ${isChild ? 'sidebar-item-nested' : ''} 
                ${isActive ? 'sidebar-link-active' : ''}`}
                style={{ paddingLeft: `${12 + depth * 12}px` }}>
            {page.title}
        </NavLink>
    )
}

export default SidebarItem;