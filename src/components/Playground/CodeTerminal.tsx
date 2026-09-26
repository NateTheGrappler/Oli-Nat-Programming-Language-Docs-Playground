import "../../assets/CodeTerminal.css"
import computer from '../../assets/Images/ComputerTerminalLONG.png';

function CodeTerminal()
{

    return (
        <div className="codeTerminal">
            <div className="codeTerminal-monitor">
                <img className="codeTerminal-Computer" src={computer} alt="Retro terminal" />
            </div>
        </div>
    );
}

export default CodeTerminal;