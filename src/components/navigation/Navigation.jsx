import "./Nav.css";
import Delete from "../deletion/Delete";

// added currentRoute for changing navigation
const Navigation = ({ onRouteChange, isSignedIn, currentRoute, setUserId }) => {
    // line 10 and 15, 16 use function do not call it directly or your browser will crash
    if (isSignedIn && currentRoute === "home") {
        return (
            <nav className="navbar-main">
                <button className="nav-button" onClick={ () => onRouteChange("signIn") }>Sign Out</button>
                <Delete setUserId={ setUserId } onRouteChange={ onRouteChange }/>
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