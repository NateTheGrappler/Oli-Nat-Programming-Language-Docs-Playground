import type { Page } from '../config/sections';
import '../assets/Sidebar.css'

function Sidebar({pages, isSmallScreen, isOpen}: {pages: Page[], isSmallScreen: boolean, isOpen: boolean})
{

    //deciede if the sidebar should render based on if there is enough space for it to,
    //if it does not have enough space, and the user has not pressed the button to open it,
    //then you do not render it, otherwise, if they have, you see if it gets rendered in the floating
    //style, or just the regular embedded way
    const shouldRender = !isSmallScreen || isOpen;
    if(!shouldRender) return null;
    const mode = isSmallScreen ? 'sideBar-floating' : 'sideBar-embedded'

    return (
        <div className = {mode}>
            <h1>This is the SideBar</h1>
        </div>
    );
}

export default Sidebar;