import { useState, useEffect } from "react";
import "./SignInForm.css";
// import Tilt from "react-parallax-tilt";

// const handleInvalidMessage = (event) => {
//     event.target?.setCustomValidity("Please enter a valid URL");
// }

const SignInForm = ({ onRouteChange }) => {
    const [ emailState, setEmailState ] = useState("");
    const [ passwordState, setPasswordState ] = useState("");
    const [ jsonData, setJsonData ] = useState({}); // modify this based on the response of your back-end api. In this case it returns an object
    // const [ mainData, setMainData ] = useState([]);
    // const [ fetchTimeout, setFetchTimeout ] = useState(null);
    
    // creates states onChange
    const onChangeEmail = (event) => {
        const emailValue = event?.target?.value;
        // setEmailState(emailValue);
        setEmailState(prev => emailValue);
    }
    // const onPasswordChange = (event) => setPasswordState(event?.target?.value);
    const onPasswordChange = (event) => {
        const passwordValue = event?.target?.value;
        // setPasswordState(passwordValue);
        setPasswordState(prev => passwordValue);
    };

    // reset the fields
    const onClickReset = () => {
        setEmailState("");
        setPasswordState("")
    }
    
    // const backEndData = async () => {
    //     const fetchData = await fetch("http://localhost:8001/");
    //     const response = await fetchData.json();

    //     setMainData(response);
    // };
    
    // useEffect for fetching api's 
    // use the second argument of fetch and modifying the default method
    useEffect(() => {
        const fetchBackEndData = async () => {
            // init parameter for fetch accepts a `object` configuration options.
            const fetchConfiguration = {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: emailState,
                    password: passwordState
                })
            };
            
            try {
                if (emailState.length > 5 && passwordState.length > 5) {
                    const response = await fetch("http://localhost:8001/signin", fetchConfiguration);
                    const responseJson = await response.json();
                    setJsonData(responseJson);
                };
            } catch (error) {
                return console.error({ "Error fetching data" : error });
            };
        };
        // call the function
        fetchBackEndData();
    }, [ emailState, passwordState ]); // added this two state in the useEffect render

    const onSignInSubmit = async () => {
        const validator = (email, password) => {
            return email.toString() === emailState && password === passwordState;
        };

        const foundEntry = () => {
            try {
                const { email, password } = jsonData;
                return validator(email, password);
            } catch (error) {
                alert("Enter valid username and password")
            };
        };

        foundEntry() ? onRouteChange("home"): 
        console.error({ "Error": "Does not match" })
    };

    // added enter event 
    const onEnterKeyDown = (event) => {
        event.key === "Enter" && onSignInSubmit();
        // event.key === "Enter" && console.log(event.key);
    };

    return (
        <div id="signIn">
            <div className="wrapper">
                <header className="header">
                    <h1>Sign In</h1>
                </header>
                <main className="container" onKeyDown={onEnterKeyDown}> {/* added onEnterKeyDown on main container */}
                    <div className="uname-div label-input">
                        <label htmlFor="username">Username: </label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={ emailState } 
                            onChange={ onChangeEmail }
                        />
                    </div>
                    <div className="pass-div label-input">
                        <label htmlFor="password">Password: </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            // required onInvalid={ handleInvalidMessage } 
                            value={ passwordState } 
                            onChange={ onPasswordChange }
                        />
                    </div>
                    <div className="buttons-container">
                        <button 
                            type="submit" 
                            id="bcLogin" 
                            onClick={ onSignInSubmit }
                        >
                            Sign In
                        </button>
                        <button 
                            type="reset" 
                            value="Reset" 
                            id="resInput" 
                            onClick={ onClickReset }
                        >
                            Reset
                        </button>
                    </div>
                    <div id="sign-up">
                        <button 
                            id="su" 
                            href="" 
                            rel="noopener noreferrer" 
                            onClick={ () => onRouteChange("register") } // use function do not call it directly or your browser will crash
                        >
                            Register
                        </button>
                    </div>
                </main>
                <footer className="footer">
                    <div className="rememberMeContainer">
                        <input type="checkbox" id="rememberz"/>
                        <label htmlFor="rememberz">Remember Me </label>
                    </div>
                    <div className="forgetPasswordContainer">
                        <button href="" id="fp">Forget Password?</button>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default SignInForm;