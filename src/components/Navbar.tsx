import type { Section } from '../config/sections';
import {useLocation, NavLink} from 'react-router-dom'
import logo from '../assets/Images/Oli-Nat-Logo-NoDragon.png';
import githubIcon from '../assets/Images/github-dark.svg';
import homeIcon from '../assets/Images/home.svg';
import terminalIcon from '../assets/Images/terminalConsole.png';
import '../assets/Navbar.css'

interface NavBarProps {
    sections: Section[];
    activeId?: string;
    showToggle: boolean;
    toggleSidebar: () => void;
}

function NavBar({sections, activeId, showToggle, toggleSidebar }: NavBarProps)
{
    const location = useLocation();
    const breadcrumb = "C:" + location.pathname;

    return (
        <div className='navBarMainDiv'>

            {/*Bascially, this button needs to be rendered here but controls another component
            this means that it needs to have state live inside of layout, so you pass in the function and
            boolean inside of the layout component, but actually call the onclick function here in this button */}
            {showToggle && (
                <button onClick={toggleSidebar}>whatever button image</button>
            )}


            <div className="navbarLeft">
                <img src={logo} alt="Oli-Nat Logo" className="navbarLogo" />
                
                
                <span className="navbar-name">Oli-Nat</span>               
                
                <span className="navbar-breadcrumb">{breadcrumb}</span>
            
            </div>

            <div className="navBarRight">
                
                <span className="navbar-link">Docs ▼</span>
                <span className="navbar-link">Contribute</span>

                <NavLink to="/playground" className="playground-link">
                    <span>Code Playground</span>
                </NavLink>
                
                
                {/*svg images for easier navigation and more concise navbar */}
                <a href="https://github.com/NateTheGrappler/OliNat-Programming-Language" aria-label="GitHub repository">
                    <img src={githubIcon} className="navbar-github-icon"/>
                </a>
                <NavLink to="/" className="navbar-link navbar-home-link" aria-label="Home">
                    <img src={homeIcon} className="navbar-github-icon"/>
                </NavLink>

            </div>

        </div>
    );
}

export default NavBar;