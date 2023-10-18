import { useState, useRef } from "react";
import "./ImageLink.css";
import Tilt from "react-parallax-tilt";

const ImageLinkForm = ({ onInputChange, onButtonSubmit, userId }) => {
    const [currentcount, setCurrentcount] = useState(0);
    const [showDisplay, setShowDisplay] = useState(false);
    const nameRef = useRef("");

    async function fetchImageApi() {
        try {
            const data = await fetch("http://localhost:8001/image", {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: userId
                })
            });
            const response = await data.json();
            const { id, name } = response;
        
            console.log(`Entries added succesfully to ${name} with id number ${id}`);
            // hook the name to the useRef instance
            nameRef.current = name;

            // now to display, set the useState to true;
            setShowDisplay(true);
        } catch (error) {
            console.error("Error fetching image data:", error);
        };
    };

    const callButtonSubmitAndIncrementCount = () => {
        onButtonSubmit();
        setCurrentcount(prev => prev + 1);
        fetchImageApi(); // call the function here 
    }

    return (
        <div className="img-link-main">
            {
                // show the display of this p tag when detect button is clicked
                showDisplay && <p className="main-para"> Hello! { nameRef.current.toUpperCase() } scroll down to see the image :) </p>
            }
            <p className="main-para">
                This Magic Brain will detect faces in your pictures.
            </p>
            <p className="main-para">
                Detect Image Count used: { currentcount }
            </p>
            <div className="div-input">
                <Tilt>
                    <div className="input-container">
                        <input type="text" onChange={ onInputChange } placeholder="Enter URL Image" id="-img-transition"/>
                        <button onClick={ callButtonSubmitAndIncrementCount }>Detect</button>
                    </div>
                </Tilt>
            </div>
        </div>
    );
}

export default ImageLinkForm;