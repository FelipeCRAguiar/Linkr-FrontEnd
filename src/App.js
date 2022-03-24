import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/reset.css";
import Login from "./views/Login";
import AuthContext from "./contexts/AuthContext";
import { useState } from "react/cjs/react.production.min";

export default function App() {

    const tokenOnLocalStorage = localStorage.getItem("token");
    const [token, setToken] = useState('');

    function setAndPersistToken(token) {
		setToken(token);
		localStorage.setItem("token", token);
	}

    return(
        <AuthContext.Provider value={{token, setToken, setAndPersistToken}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}