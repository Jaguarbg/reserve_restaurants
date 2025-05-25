import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import '../styles/Contact.scss';


export const Register = () =>{
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/api/auth/register', formData);
        navigate('/login');
    };

    return (
        <div className="all">
            <form onSubmit={handleSubmit} className="contact-form">
                <h2>Registration</h2>
                <input name="username" placeholder="Потребителско име" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Имейл" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Парола" onChange={handleChange} required />
                <button type="submit">Регистрация</button>
            </form>
        </div>
    );
}
