import "./Nav.css";


// added currentRoute for changing navigation
const Navigation = ({ onRouteChange, isSignedIn, currentRoute }) => {
    // line 7 use function do not call it directly or your browser will crash
    if (isSignedIn && currentRoute === "home") {
        return (
            <nav className="navbar-main">
                <button className="nav-button" onClick={ () => onRouteChange("signIn") }>Sign Out</button> 
            </nav>
        );
    } else {
        return (
            <nav className="navbar-main">
                <button className="nav-button" onClick={ () => onRouteChange("signIn") }>Sign In</button>
                <button className="nav-button" onClick={ () => onRouteChange("register") }>Register</button>
            </nav>
        );
    };
};

export default Navigation;


// const Navigation = ({ onRouteChange }) => {
//     // line 7 use function do not call it directly or your browser will crash
//     return (
//         <nav className="navbar-main">
//             <button onClick={ () => onRouteChange("signIn") }>Sign Out</button> 
//         </nav>
//     );
// }

// export default Navigation;