import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { Page } from '../config/sections';

function SidebarItem({page, basePath, depth = 0}: {page: Page; basePath: string; depth?: number})
{
    const [open, setOpen] = useState(false);
    const hasChildren = !!page.children?.length; //!! coverts to boolean value and then flips the value and whatnot
    const isChild = depth > 0;

    if(hasChildren)
    {
        return (
            <div className = "sidebar-item">
                <button className = "sidebar-category" onClick={()=> setOpen(o=>!o)} style={{ paddingLeft: `${12 + depth * 12}px` }}> 
                    <span>{page.title}</span>
                    <span className={`sidebar-chevron ${open ? 'sidebar-chevron-open' : ''}`}>▸</span>
                </button>


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