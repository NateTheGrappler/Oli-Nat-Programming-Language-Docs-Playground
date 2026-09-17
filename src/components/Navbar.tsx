import type { Section } from '../config/sections';

function NavBar({sections, activeId}: {sections: Section[], activeId?: string})
{

    console.log(sections)
    return (
        <div>
            <h1>This is the Navbar, id {activeId}</h1>
        </div>
    );
}

export default NavBar;