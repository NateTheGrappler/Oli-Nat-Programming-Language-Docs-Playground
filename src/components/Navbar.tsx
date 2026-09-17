import type { Section } from '../config/sections';
import '../assets/Navbar.css'


interface NavBarProps {
    sections: Section[];
    activeId?: string;
    showToggle: boolean;
    toggleSidebar: () => void;
}

function NavBar({sections, activeId, showToggle, toggleSidebar }: NavBarProps)
{

    console.log(sections)
    return (
        <div className='navBarMainDiv'>

            {/*Bascially, this button needs to be rendered here but controls another component
            this means that it needs to have state live inside of layout, so you pass in the function and
            boolean inside of the layout component, but actually call the onclick function here in this button */}
            {showToggle && (
                <button onClick={toggleSidebar}>whatever button image</button>
            )}
            <h1>This is the navbar</h1>

        </div>
    );
}

export default NavBar;