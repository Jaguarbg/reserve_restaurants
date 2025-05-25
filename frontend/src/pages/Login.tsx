import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Contact.scss';

export const Login = () => {
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:3001/api/auth/login', formData);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isAdmin', res.data.isAdmin ? "true" : "false");
        window.dispatchEvent(new Event('authChange'));
        navigate('/');
    };

    return (
        <div className = "all">
            <form onSubmit={handleSubmit} className= "contact-form">
                <h2>Login</h2>
                <input name="identifier" placeholder="Имейл или потребителско име" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Парола" onChange={handleChange} required />
                <button type="submit">Вход</button>
            </form>
        </div>
    );
}
