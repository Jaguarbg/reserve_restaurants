import {NavLink, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";

export const Navigation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = () => setIsLoggedIn(!!localStorage.getItem('token'));
        checkLogin();
        window.addEventListener('authChange', checkLogin);
        return () => window.removeEventListener('authChange', checkLogin);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <nav>
            {isLoggedIn ? (
                <ul>
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/contact'}>Contact</NavLink></li>
                    <li style={{ marginLeft: "auto" }}><NavLink to={'/reservations'}>My Reservations</NavLink></li>
                    <button onClick={handleLogout}>Logout</button>
                </ul>
            ) : (
                <ul>
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/contact'}>Contact</NavLink></li>
                    <li style={{ marginLeft: "auto" }}><NavLink to={'/login'}>Login</NavLink></li>
                    <li><NavLink to={'/register'}>Register</NavLink></li>
                </ul>
            )}
        </nav>
    )
}