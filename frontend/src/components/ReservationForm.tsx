import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ReservationPage.scss";
import { useLocation, useNavigate } from 'react-router-dom';

type Place = {
    id: number;
    name: string;
};

export const ReservationForm = () => {
    const [placeName, setPlaceName] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPlaceId = Number(queryParams.get('placeId') || 0);
    const navigate = useNavigate();

    const [reservation, setReservation] = useState({
        name: "",
        phone: "",
        date: "",
        time: "",
        guests: 0,
        place_id: initialPlaceId
    });

    useEffect(() => {
        axios.get("http://localhost:3001/api/places")
            .then(res => {
                const found = res.data.find((p: Place) => p.id === initialPlaceId);
                if (found) setPlaceName(found.name);
            })
            .catch(err => console.error("Грешка при зареждане на заведения:", err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setReservation(prev => ({
            ...prev,
            [name]: name === "guests" || name === "place_id" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:3001/api/reservations",
                reservation,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status === 201) {
                alert("Резервацията е успешна!");
                navigate("/reservations");
            }
        } catch (error) {
            console.error("Грешка при създаване на резервация:", error);
            alert("Възникна грешка при създаването на резервацията!");
        }
    };

    return (
        <div className="all">
            <form onSubmit={handleSubmit} className="reservation-form">
                <h2>Създайте резервация</h2>

                <div className="grid">
                    <label>
                        Име:
                        <br />
                        <input type="text" name="name" value={reservation.name} onChange={handleChange} required />
                    </label>

                    <label>
                        Телефон:
                        <br />
                        <input type="text" name="phone" value={reservation.phone} onChange={handleChange} required />
                    </label>

                    <label>
                        Дата:
                        <br />
                        <input type="date" name="date" value={reservation.date} onChange={handleChange} required />
                    </label>

                    <label>
                        Час:
                        <br />
                        <input type="time" name="time" value={reservation.time} onChange={handleChange} required />
                    </label>
                </div>

                <label>
                    Брой гости:
                    <br />
                    <input type="number" name="guests" value={reservation.guests} onChange={handleChange} required />
                </label>

                <label>
                    {placeName && (
                        <div className="selected-restaurant">
                            <strong>Резервация за:</strong> {placeName}
                        </div>
                    )}
                </label>

                <button type="submit">Запази резервация</button>
            </form>
        </div>
    );
};
