import React from "react";
import { useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {

    const [trigger, setTrigger] = useState(false);

    return (
        <AuthContext.Provider value={{ trigger, setTrigger }}>
            {props.children}
        </ AuthContext.Provider>
    )
}