import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./styles/reset.css"
import Login from "./views/Login"

export default function App() {

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}