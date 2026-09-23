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
    hideSidebar: boolean,
    isOpen: boolean
    onClose: () => void;
    onOpen: () => void;
}

function Sidebar({pages, nextRouteLabel, nextRoute, sectionLabel, basePath, isSmallScreen, hideSidebar, isOpen, onClose, onOpen}: SidebarProps)
{

    //deciede if the sidebar should render based on if there is enough space for it to,
    //if it does not have enough space, and the user has not pressed the button to open it,
    //then you do not render it, otherwise, if they have, you see if it gets rendered in the floating
    //style, or just the regular embedded way
    const shouldRender = !isSmallScreen || isOpen;
    console.log("IsSmallScreen: " + isSmallScreen);
    console.log("hideSideBar: " + hideSidebar);
    if(!shouldRender) return null;


    if(isSmallScreen)
    {
        //load in the div with a floating style if the screen is too small to actually
        //fit the sort of embedded like content
        return (
            <div className={"sidebar sideBar-floating"}>
                
                {/*The top decoration stuff and also a button for closing as well*/}
                <div className = "sidebar-header">
                    <span className="sidebar-title">{sectionLabel ? `${sectionLabel} :>` : ''}</span>
                    <button className="sidebar-closeButton" onClick={onClose}>
                    <svg className="sidebar-closeSvg" width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 19L12.7071 12.7071C12.3166 12.3166 12.3166 11.6834 12.7071 11.2929L19 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11 19L4.70711 12.7071C4.31658 12.3166 4.31658 11.6834 4.70711 11.2929L11 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </button>
                </div>
                <hr className="sidebar-divider" />
        

                {/*Dynamically load in the links based on the information from section.ts*/}
                {/*Load them in dynamically based on said information and then also determine what kind they are*/}  
                <div className="sidebar-links">
                    {pages.map(page => (
                        <SidebarItem key={page.slug} page={page} basePath={basePath} />
                    ))}
                </div>

                {/*The bottom bit that would load in the next section button sort of */}
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

    //render the sidebar and the given content, only if the actual sidebar close button has not been
    //pressed, and only if the screen is in fact NOT small
    return (
        <div className={`sidebar sideBar-embedded ${hideSidebar ? 'sidebar-collapsed' : ''}`}>
            

            <button className="sidebar-openAgain" onClick={hideSidebar ? onOpen : onClose} aria-label={hideSidebar ? 'Open sidebar' : 'Close sidebar'}>
                <svg className="sidebar-openArrowSvg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5L11.7929 11.2929C12.1834 11.6834 12.1834 12.3166 11.7929 12.7071L5.5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.5 5L19.7929 11.2929C20.1834 11.6834 20.1834 12.3166 19.7929 12.7071L13.5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>


            <div className='sidebar-content'>
                {/*The top decoration stuff and also a button for closing as well*/}
                <div className = "sidebar-header">
                    <span className="sidebar-title">{sectionLabel ? `${sectionLabel} :>` : ''}</span>
                    <button className="sidebar-closeButton" onClick={onClose}>
                    <svg className="sidebar-closeSvg" width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 19L12.7071 12.7071C12.3166 12.3166 12.3166 11.6834 12.7071 11.2929L19 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11 19L4.70711 12.7071C4.31658 12.3166 4.31658 11.6834 4.70711 11.2929L11 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </button>
                </div>
                <hr className="sidebar-divider" />
        

                {/*Dynamically load in the links based on the information from section.ts*/}
                {/*Load them in dynamically based on said information and then also determine what kind they are*/}  
                <div className="sidebar-links">
                    {pages.map(page => (
                        <SidebarItem key={page.slug} page={page} basePath={basePath} />
                    ))}
                </div>

                {/*The bottom bit that would load in the next section button sort of */}
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
        </div>

    );  

}

export default Sidebar;