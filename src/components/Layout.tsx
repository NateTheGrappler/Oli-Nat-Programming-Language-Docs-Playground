import {useLocation} from 'react-router-dom'
import {sections} from '../config/sections'
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import NavBar from './Navbar';
import useMediaQuery from '../hooks/useMediaQuery';
import {useState, useEffect} from 'react'
import '../assets/Layout.css'


function Layout() {

    //get the location URL and screensize check
    const location = useLocation();
    const isSmallScreen = useMediaQuery('(max-width: 1080px)')
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [hideSidebar, setHideSidebar] = useState(false); //feels a little silly to have this but it is used to differentiate between the screen closing due to user input or because of a small screen



    //reset the open variable that the button changes whenever the screen size changes from either big or small
    //this is so the user does not have the sidebar interface kept open whenever the page is resized
    useEffect(() => {
        setSideBarOpen(false);
    }, [isSmallScreen])


    //get the route sections but order them based on the longer route first so that way whenever you try to sort them based on what they are
    //you don't end up with the wrong one just because they all start with /docs and what not
    const activeSection = [...sections]
    .sort((a,b) => b.route.length - a.route.length)
    .find(s=>location.pathname.startsWith(s.route))


    return (
        <div className="outerShellDiv">
            {/*This is the app shell div and it basically holds the nav bar and encompassing side by side elements*/}

            <div className = "navbarDiv">
                <NavBar 
                    sections={sections}
                    activeId={activeSection?.id}
                    isSmallScreen={isSmallScreen}
                    showToggle={isSmallScreen}
                    toggleSidebar={() => setSideBarOpen(o=>!o)}
                />
            </div>
            
            {/*Content div that would hold both the different clickable sections as well as main md display component */}
            <div className="contentDiv">

                {isSmallScreen && sideBarOpen && (
                <div className="sidebar-backdrop" onClick={() => setSideBarOpen(false)} />
                )}

                <Sidebar pages = {activeSection?.pages?? []} 
                                nextRouteLabel={activeSection?.nextRouteLabel} 
                                nextRoute={activeSection?.nextRoute} 
                                sectionLabel={activeSection?.label} 
                                basePath={activeSection?.route ?? ''} 
                                isSmallScreen={isSmallScreen}
                                hideSidebar={hideSidebar}
                                isOpen={sideBarOpen}
                                onClose = {() => {setSideBarOpen(false); setHideSidebar(true)}}
                                onOpen = {() => {setHideSidebar(false)}}/>
                <MainContent activeSection={activeSection} documentationFilePath={location.pathname}/>
            </div>

        </div>
    );
}

export default Layout;