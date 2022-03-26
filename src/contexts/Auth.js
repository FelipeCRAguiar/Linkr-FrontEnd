import React from "react";
import { useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {

    const [trigger, setTrigger] = useState(false);
console.log(trigger);
    return (
        <AuthContext.Provider value={{ trigger, setTrigger }}>
            {props.children}
        </ AuthContext.Provider>
    )
}