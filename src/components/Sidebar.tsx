import type { Page } from '../config/sections';
import {NavLink} from 'react-router-dom'
import SidebarItem from './SidebarItem';
import '../assets/Sidebar.css'

interface SidebarProps {
    pages: Page[];
    nextRouteLabel?: string;
    nextRoute?: string;
    sectionLabel?: string; 
    basePath: string; 
    isSmallScreen: boolean, 
    isOpen: boolean
}

function Sidebar({pages, nextRouteLabel, nextRoute, sectionLabel, basePath, isSmallScreen, isOpen}: SidebarProps)
{

    //deciede if the sidebar should render based on if there is enough space for it to,
    //if it does not have enough space, and the user has not pressed the button to open it,
    //then you do not render it, otherwise, if they have, you see if it gets rendered in the floating
    //style, or just the regular embedded way
    const shouldRender = !isSmallScreen || isOpen;
    if(!shouldRender) return null;
    const mode = isSmallScreen ? 'sideBar-floating' : 'sideBar-embedded'

    return (
        <div className={`sidebar ${mode}`}>
            <span className="sidebar-title">{sectionLabel ? `${sectionLabel} :>` : ''}</span>
            <hr className="sidebar-divider" />

            <div className="sidebar-links">
                {pages.map(page => (
                    <SidebarItem key={page.slug} page={page} basePath={basePath} />
                ))}
            </div>


            {nextRoute && (
                <>
                    <span className="sidebar-nextRead">Suggested Next Read:</span>
                    <hr className="sidebar-divider-bottom" />
                    <NavLink to={nextRoute} className="sidebar-next-button">
                        {nextRouteLabel}  ➜
                    </NavLink>
                </>
            )}

        </div>

        
    );
}

export default Sidebar;