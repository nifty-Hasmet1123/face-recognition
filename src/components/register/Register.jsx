import { useState } from "react";
import RegisterCss from "./RegisterCss.module.css";

// dom manipulation
// const inputElement = () => {
//     const confirmationPassword = document.getElementById("confirmP"); // confirmation password
//     const password = document.getElementById("rPassword");
    
//     confirmationPassword.value === password.value ? 
//     console.log(confirmationPassword.value, password.value): 
//     alert("confirmation Password and password is not the same")
// }

const Register = ({ onRouteChange }) => {
    
    // useState returns 2 arrays (first: current-state, second: state update function)
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const usernameAndPasswordValidity = () => {
        let condition;

        password.length < 5 ? alert("Password should be higher in length"): 
        username.length < 5 ? alert("Username should be higher in length"):
        condition = true;

        return condition;
    };

    const validityCheck = (event) => {
        event.preventDefault(); // prevents auto-refresh after clicking confirm (for console.logs)
        
        // logic for routing after checking
        // added additional condition if password and username and 
        // confirm password is not null or empty string
        if (!!password && !!username && !!confirmationPassword) {
            confirmationPassword !== password ? 
            alert("confirmation password and password is not the same"):

            usernameAndPasswordValidity() ? onRouteChange("home"):
            console.error("validity error")
        } else {
            alert("Fields should not be empty")
        }
    };

    // line 63 assignment of user's input value to the empty password string. same in line 75, line 86
    // added setPassword function to line 40

    return (
        <form action="" className={RegisterCss.registerForm}>
            <div className={RegisterCss.registerWrapper}>
                <header>
                    <h1>Register Form</h1>
                </header>
                <div className={RegisterCss.createUserName}>
                    <label htmlFor="rUsername" className={RegisterCss.pads}>Create New Username: </label>
                    <input 
                        type="text" 
                        id="rUsername" 
                        name="rUsername" 
                        value={username}
                        className={`${RegisterCss.pads} ${RegisterCss.inputBox}`}
                        onChange={ (event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="rPassword" className={RegisterCss.pads}>Create New Password: </label>
                    <input 
                        className={`${RegisterCss.pads} ${RegisterCss.inputBox}`}
                        type="password" 
                        id="rPassword"
                        name="rPassword"// add this for the input reset to recognize it when resetting
                        value={password} 
                        onChange={ (event) => setPassword(event.target.value) }
                    /> 
                </div>
                <div>
                    <label htmlFor="confirmP" className={RegisterCss.pads}>Confirm New Password: </label>
                    <input
                        className={`${RegisterCss.pads} ${RegisterCss.inputBox}`}
                        type="password" 
                        id="confirmP"
                        name="confirmP"
                        value={confirmationPassword}
                        onChange={ (event) => setConfirmationPassword(event.target.value) }
                    />
                </div>
                <div className={RegisterCss.buttonsSelect}>
                    <button className={RegisterCss.buttonConfirm} onClick={validityCheck}>Confirm</button>
                    <button 
                        className={RegisterCss.buttonReset} 
                        type="button"
                        onClick={ (event) => {
                            // Check if the event came from the reset button
                            // this will remove the invulnerability alert message from chrome
                            if (event.target === event.currentTarget) {
                                setUsername("");
                                setConfirmationPassword("");
                                setPassword("");
                            };
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Register;