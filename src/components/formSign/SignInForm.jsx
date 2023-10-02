import "./SignInForm.css";
// import Tilt from "react-parallax-tilt";

const handleInvalidMessage = (event) => {
    event.target?.setCustomValidity("Please enter a valid URL");
}

const SignInForm = ({ onRouteChange }) => {
    return (
        <form action="" id="signIn">
            <div className="wrapper">
                <header className="header">
                    <h1>Sign In</h1>
                </header>
                <main className="container">
                    <div className="uname-div label-input">
                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username" name="username"/>
                    </div>
                    <div className="pass-div label-input">
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" name="password" required onInvalid={handleInvalidMessage} />
                    </div>
                    <div className="buttons-container">
                        <button type="submit" id="bcLogin">Login</button>
                        {/* <button type="button">Cancel</button> */}
                        <input type="reset" value="Reset" id="resInput"/>
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
        </form>
    );
}

export default SignInForm;