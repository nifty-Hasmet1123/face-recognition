import { useState, useEffect } from "react";
import "./Delete.css";

// fetch configuration:
const config = {
    method: "delete",
    headers: { "Content-type": "application.json" }
};

// main jsx
const Delete = ({ setUserId, onRouteChange }) => {
    const [ isSuccess, setIsSuccess ] = useState(false);
    
    const onClickHandler = async () => {
        try {
            const [ userTable, loginTable ] = await Promise.all([
                await fetch(`http://localhost:8001/remove/users/${setUserId}`, config),
                await fetch(`http://localhost:8001/remove/logins/${setUserId}`, config)
            ]);
            
            if (userTable.status === 204 && loginTable.status === 204) {
                console.log("Successfully Deleted");
                setIsSuccess(true);
            } else {
                console.log("Resource not found")
            };
        } catch (error) {
            console.log({ "Error": error })
        };
    };

    useEffect(() => {
        // use useEffect to render immedietly any changes made on isSuccess state
        if (isSuccess) {
            console.log("second call", isSuccess);
            onRouteChange("signIn");
        };
    }, [ isSuccess, onRouteChange ]);

    return (
        <button onClick={ onClickHandler } className="delete-bar">
            Delete account
        </button>
    );
};

export default Delete;

// In your Delete component, you're using useState to manage the isSuccess state. When you set isSuccess to true using setIsSuccess(true) in the first call, the component will re-render. However, the value of isSuccess won't be immediately updated in the same execution context. This is why you're seeing false when you log it in the second call.

// To address this, you can use the useEffect hook to listen for changes in isSuccess and trigger actions based on the updated value. Here's how you can modify your Delete component:

// The useEffect hook is a great way to respond to changes in state variables immediately after they are updated. When you use useState to manage state, any changes to the state variables trigger a re-render of your component. However, these updates may not be immediately available in the current execution context. This is where useEffect comes in handy.

// By wrapping your logic in a useEffect function and specifying the state variable as a dependency (in the dependency array), you ensure that the code inside the useEffect block runs as soon as the state variable changes. This allows you to respond to state changes promptly and perform actions based on the updated state.

// In your case, you used useEffect to respond to changes in the isSuccess state and perform the routing action when isSuccess is true. This is a common pattern when working with React components to ensure that your component responds immediately to changes in state and produces the expected behavior.
