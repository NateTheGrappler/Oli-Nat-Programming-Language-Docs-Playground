import {useLocation} from 'react-router-dom'
import {sections} from '../config/sections'

function Layout() {
    const location = useLocation();                                                  //(the application URL pretty much)
    const activeSection = sections.find(s => location.pathname.startsWith(s.route)); //based on URL, get from the section json the route that matches current location


    return (
        <body>
            
        </body>
    );
}

export default Layout;