import { useState } from "react";
import axios from "axios";

export const ContactForm = () => {
    const [contact, setContact] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContact(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/api/contact", contact);
            if (response.status === 201 || response.status === 200) {
                alert("Съобщението беше изпратено успешно!");
                setContact({ name: "", email: "", message: "" });
            }
        } catch (error) {
            console.error("Грешка при изпращане на съобщението:", error);
            alert("Възникна грешка при изпращането, моля опитайте отново.");
        }
    };

    return (
        <div className="all">
            <form onSubmit={handleSubmit} className="contact-form">
                <h2>Свържете се с нас</h2>

                <label>
                    Име:
                    <br />
                    <input
                        type="text"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Имейл:
                    <br />
                    <input
                        type="email"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Съобщение:
                    <br />
                    <textarea
                        name="message"
                        value={contact.message}
                        onChange={handleChange}
                        required
                        rows={5}
                    />
                </label>

                <button type="submit">Изпрати</button>
            </form>
        </div>
    );
};
