import type { Section } from "../config/sections";
import { useState} from "react";
import { NavLink } from "react-router-dom";
import "../assets/DocsDrowpdown.css"


function DocsDropdown({sections}: {sections: Section[]})
{
    const [open, setOpen] = useState(false);
    const [clicked, setClicked] = useState(false);


    //add in an optional click feature for keeping the menu open if someone would like
    function handleClick()
    {
        setOpen(o=>!o);
        setClicked(o=>!o);
        console.log("Handled Click")
    }



    return (
        <div className = "dropdown" >

            <button className="dropdown-trigger" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onClick={handleClick}>
                Docs
                <span className={`dropdown-chevron ${open ? 'dropdown-chevron-open' : ''}`}> ▾</span>
            </button>

            {(open || clicked) && 
                <div className="dropdown-menu" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                    {sections.map(section => (
                        <NavLink key={section.id} to={section.route} className="dropdown-item" onClick={() => setOpen(false)}>
                            {section.label}
                        </NavLink>
                    ))}
                </div>
            }

        </div>
    );
}

export default DocsDropdown;