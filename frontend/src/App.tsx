import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Contact, Home , ReservationPage, ReservationsListPage, Login, Register, NotFound} from "./pages/";
import {Navigation} from "./components";

function App() {


    return (
        <BrowserRouter>
            <Navigation/>
            <div id="container">
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/contact'} element={<Contact/>}/>
                    <Route path={'/reservation'} element={<ReservationPage />} />
                    <Route path={'/reservations'} element={<ReservationsListPage />} />
                    <Route path={'/register'} element={<Register />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
