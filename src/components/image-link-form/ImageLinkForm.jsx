import "./ImageLink.css";
import Tilt from "react-parallax-tilt";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className="img-link-main">
            <p className="main-para">
                This Magic Brain will detect faces in your pictures.
            </p>
            <div className="div-input">
                <Tilt>
                    <div className="input-container">
                        <input type="text" onChange={onInputChange} placeholder="Enter URL Image" id="-img-transition"/>
                        <button onClick={onButtonSubmit}>Detect</button>
                    </div>
                </Tilt>
            </div>
        </div>
    );
}

export default ImageLinkForm;