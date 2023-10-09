

// dom manipulation
// const inputElement = () => {
//     const confirmationPassword = document.getElementById("confirmP"); // confirmation password
//     const password = document.getElementById("rPassword");
    
//     confirmationPassword.value === password.value ? 
//     console.log(confirmationPassword.value, password.value): 
//     alert("confirmation Password and password is not the same")
// }

import { useState } from "react";
import RegisterCss from "./RegisterCss.module.css";

// let idForImage;
const Register = ({ onRouteChange, setUserId }) => {
    // useState returns 2 arrays (first: current-state, second: state update function)
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [jsonDataRegister, setJsonDataRegister] = useState({});

    const fetchRegisterApi = async () => {
        try {
            if (!!password && !!username) {
                const dataFetchFromRegister = await fetch("http://localhost:8001/register", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    // body attributes should match in the back-end side
                    body: JSON.stringify({
                        email: username,
                        password: password
                    })
                });
                
                const response = await dataFetchFromRegister.json();
                // console.log(response);
                // console.log(jsonDataRegister);
                // idForImage = response.id;
                // console.log(response.id);
                // console.log(typeof(response.id));

                // set the signInIdData when it comes from the Register
                setUserId(response.id);
                setJsonDataRegister(response);
            }
        } catch (error) {
            console.error({ Error: "error in fetching api" })
        };
    };

    const usernameAndPasswordValidity = () => {
        let condition;

        password.length < 5 ? alert("Password should be higher in length"): 
        username.length < 5 ? alert("Username should be higher in length"):
        condition = true;

        return condition;
    };

    const validityCheck = (event) => {
        event.preventDefault(); // prevents auto-refresh after clicking confirm (for console.logs)
        fetchRegisterApi();
        // logic for routing after checking
        // added additional condition if password and username and 
        // confirm password is not null or empty string
        if (!!password && !!username && !!confirmationPassword && !!jsonDataRegister) {
            confirmationPassword !== password ? alert("confirmation password and password is not the same"):
            usernameAndPasswordValidity() ? onRouteChange("home"):
            console.error("validity error")
        } else {
            alert("Fields should not be empty")
        }
    };

    return (
        <div className={RegisterCss.registerForm}>
            <div className={RegisterCss.registerWrapper}>
                <header>
                    <h1>Register Form</h1>
                </header>
                <div className={ RegisterCss.createUserName }>
                    <label htmlFor="rUsername" className={ RegisterCss.pads }>Create New Username: </label>
                    <input 
                        type="text" 
                        id="rUsername" 
                        name="rUsername" 
                        value={ username }
                        placeholder="Email only here"
                        className={ `${ RegisterCss.pads } ${ RegisterCss.inputBox }` }
                        onChange={ (event) => setUsername(event?.target?.value)}
                    />
                </div>
                <div>
                    <label htmlFor="rPassword" className={ RegisterCss.pads }>Create New Password: </label>
                    <input 
                        className={`${RegisterCss.pads} ${ RegisterCss.inputBox }`}
                        type="password" 
                        id="rPassword"
                        name="rPassword"// add this for the input reset to recognize it when resetting
                        value={ password } 
                        onChange={ (event) => setPassword(event?.target?.value) }
                    /> 
                </div>
                <div>
                    <label htmlFor="confirmP" className={ RegisterCss.pads }>Confirm New Password: </label>
                    <input
                        className={`${RegisterCss.pads} ${ RegisterCss.inputBox }`}
                        type="password" 
                        id="confirmP"
                        name="confirmP"
                        value={ confirmationPassword }
                        onChange={ (event) => setConfirmationPassword(event?.target?.value) }
                    />
                </div>
                <div className={ RegisterCss.buttonsSelect }>
                    <button className={ RegisterCss.buttonConfirm } onClick={ validityCheck } type="submit">Confirm</button>
                    <button 
                        className={ RegisterCss.buttonReset } 
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
        </div>
    );
};

// export { Register, idForImage };

export default Register;