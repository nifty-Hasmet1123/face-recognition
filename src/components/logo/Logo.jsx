import "./Logo.css";
import brain from "./brain.png";
import Tilt from "react-parallax-tilt";

const Logo = () => {
    return (
        <Tilt className="tilt-logo" tiltMaxAngleX={10}>
            <div className="logo-container">
                <img src={brain} alt="brain" />
            </div>
        </Tilt>         
    );
}

export default Logo;