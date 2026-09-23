import type { Section } from '../config/sections';
import {useLocation, NavLink} from 'react-router-dom'
import logo from '../assets/Images/Oli-Nat-Logo-NoDragon.png';
import '../assets/Navbar.css'
import DocsDropdown from "./DocsDropdown"

interface NavBarProps {
    sections: Section[];
    activeId?: string;
    isSmallScreen: boolean;
    showToggle: boolean;
    toggleSidebar: () => void;
}

function NavBar({sections, activeId, isSmallScreen, showToggle, toggleSidebar }: NavBarProps)
{
    const location = useLocation();
    const breadcrumb = "C:" + location.pathname;

    return (
        <div className='navBarMainDiv'>

            {/*Main logo, title, and the dir path, maybe a search bar eventually */}
            <div className="navbarLeft">

                {/*Bascially, this button needs to be rendered here but controls another component
                this means that it needs to have state live inside of layout, so you pass in the function and
                boolean inside of the layout component, but actually call the onclick function here in this button */}
                {showToggle && (
                    <button className="navbar-openSidebar" onClick={toggleSidebar}>
                        <svg className="sidebar-closeSvg" width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z" fill="currentColor"/>
                        </svg>
                    </button> 
                )}

                {/*render the logo and name no matter what */}
                <img src={logo} alt="Oli-Nat Logo" className="navbarLogo" />
                <span className="navbar-name">Oli-Nat</span>

                {/*Trim dir path whenever its too small to save screen space */}
                {!isSmallScreen && <span className="navbar-breadcrumb">{breadcrumb}</span>}
            </div>

            <div className="navBarRight">
                
                {/*Eventually these will become clickable redirects, the docs might be different because I want it to be a dropdown */}
                <DocsDropdown sections={sections}/>
               
                {!isSmallScreen &&
                    <NavLink to="/docs/contributing" className="navbar-link">
                        <span>Contribute</span>
                    </NavLink>
                }

                <NavLink to="/playground" className={!isSmallScreen? "playground-link" : "playground-link-small"}>
                    <span>Code Playground</span>
                </NavLink>
                
                
                {/*svg images for easier navigation and more concise navbar maybe eventually change these up so they highlight on hover*/}
                {!isSmallScreen &&
                    <a href="https://github.com/NateTheGrappler/OliNat-Programming-Language" target="_blank" aria-label="GitHub repository">
                        <svg className="navbar-github-icon" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="currentColor"/>
                        </svg>
                    </a>
                }


                <NavLink to="/" className="navbar-link navbar-home-link" aria-label="Home">
                    <svg className={!isSmallScreen? "navbar-home-icon" : "navbar-home-icon-small"} fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9	C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52	C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z"/></svg>
                </NavLink>

            </div>

        </div>
    );
}

export default NavBar;