import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./styles/reset.css"
import Login from "./views/Login"
import SignUp from "./views/SignUp"

export default function App() {

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/sign-up' element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}