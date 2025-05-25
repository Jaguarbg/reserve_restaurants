import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ReservationPage.scss";


type Reservation = {
    id: number;
    name: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
};

export const ReservationList: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<Partial<Reservation>>({});
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    const confirmDelete = (id: number) => {
        if (window.confirm("Наистина ли искаш да изтриеш резервацията?")) {
            axios.delete(`http://localhost:3001/api/reservations/${id}`, config)
                .then(() => setReservations(prev => prev.filter(r => r.id !== id)));
        }
    };

    const handleEditClick = (reservation: Reservation) => {
        setEditingId(reservation.id);
        setEditData(reservation);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleEditSave = async () => {
        if (!editingId) return;
        await axios.put(
            `http://localhost:3001/api/reservations/${editingId}`,
            editData,
            config
        );
        setReservations(prev =>
            prev.map(r => (r.id === editingId ? { ...r, ...editData } : r))
        );
        setEditingId(null);
        setEditData({});
    };

    useEffect(() => {
        axios.get("http://localhost:3001/api/reservations", config)
            .then(res => {
                setReservations(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(`Грешка при зареждане на резервациите. ${err}`);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Зареждане...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="reservations-list">
            <h2>Списък с резервации</h2>
            <div className="reservation-list">
                <ul>
                    {reservations.map(res =>
                        <li key={res.id} className="reservation-item">
                            {editingId === res.id ? (
                                <>
                                    <input name="name" value={editData.name || ""} onChange={handleEditChange} />
                                    <input name="phone" value={editData.phone || ""} onChange={handleEditChange} />
                                    <input name="date" value={editData.date || ""} onChange={handleEditChange} />
                                    <input name="time" value={editData.time || ""} onChange={handleEditChange} />
                                    <input name="guests" type="number" value={editData.guests || ""} onChange={handleEditChange} />
                                    <button onClick={handleEditSave}>💾</button>
                                    <button onClick={() => setEditingId(null)}>❌</button>
                                </>
                            ) : (
                                <>
                                    <div><strong>Име:</strong> {res.name}</div>
                                    <div><strong>Телефон:</strong> {res.phone}</div>
                                    <div><strong>Дата:</strong> {res.date.split('T')[0]}</div>
                                    <div><strong>Час:</strong> {res.time}</div>
                                    <div><strong>Гости:</strong> {res.guests}</div>
                                    {isAdmin && (
                                        <div className="actions">
                                            <button onClick={() => handleEditClick(res)}>✏️</button>
                                            <button onClick={() => confirmDelete(res.id)}>❌</button>
                                        </div>
                                    )}
                                </>
                            )}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};