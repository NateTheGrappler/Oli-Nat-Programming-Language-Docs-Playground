import {useLocation} from 'react-router-dom'
import {sections} from '../config/sections'
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import NavBar from './Navbar';


function Layout() {
     //(the application URL pretty much)
    const location = useLocation();

    //get the route sections but order them based on the longer route first so that way whenever you try to sort them based on what they are
    //you don't end up with the wrong one just because they all start with /docs and what not
    const activeSection = [...sections]
    .sort((a,b) => b.route.length - a.route.length)
    .find(s=>location.pathname.startsWith(s.route))


    return (
        <div className="outerShellDiv">
            {/*This is the app shell div and it basically holds the nav bar and encompassing side by side elements*/}
            <NavBar sections={sections} activeId={activeSection?.id}/>
            
            {/*Content div that would hold both the different clickable sections as well as main md display component */}
            <div className="contentDiv">
                <Sidebar pages = {activeSection?.pages?? []}/>
                <MainContent activeSection={activeSection} documentationFilePath={location.pathname}/>
            </div>

        </div>
    );
}

export default Layout;