import "./FaceRecognition.css";
import Tilt from "react-parallax-tilt";

const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className="face-container">
            <div className="image-container">
                <Tilt>
                    <img id="image-input" src={imageUrl} alt="" height="auto" width="500px"/>
                    <div 
                    className="bounding-box" 
                    style={{
                        top: box.topRow,
                        bottom: box.bottomRow,
                        left: box.leftCol,
                        right: box.rightCol
                    }}
                    >
                    </div>
                </Tilt>
            </div>
        </div>
    );
}

export default FaceRecognition;