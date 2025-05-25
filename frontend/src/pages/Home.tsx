import { useEffect, useState } from 'react';
import api from '../axios';
import '../styles/HomePage.scss';
import { useNavigate } from 'react-router-dom';

type Place = {
    id: number;
    name: string;
    city: string;
    address: string;
    phone?: string;
    working_hours?: string;
    image_url?: string;
};

export const Home = () =>{
    const [places, setPlaces] = useState<Place[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/places')
            .then(res => setPlaces(res.data))
            .catch(err => console.error('Error fetching places:', err));
    }, []);

    const filteredPlaces = places.filter(place => {
        const matchesName = place.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCity = cityFilter ? place.city === cityFilter : true;
        return matchesName && matchesCity;
    });

    return (
        <main>
            <section className="search-filter">
                <input
                    type="text"
                    placeholder="Търси по име..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <select className="cityFilter"
                        value={cityFilter}
                        onChange={e => setCityFilter(e.target.value)}
                >
                    <option value="">Всички градове</option>
                    <option value="София">София</option>
                    <option value="Варна">Варна</option>
                    <option value="Велико Търново">Велико Търново</option>
                </select>
            </section>

            <section className="restaurant-list" id="restaurantList">
                <h2>Избери ресторант</h2>
                {filteredPlaces.length === 0 && <p>Няма намерени ресторанти.</p>}
                {filteredPlaces.map(place => (
                    <div key={place.id} className="restaurant" data-name={place.name} data-city={place.city}>
                        <div className="restaurant-details">
                            <h3>{place.name}</h3>
                            <div className="restaurant-info">Адрес: {place.address}</div>
                            <div className="restaurant-info">Телефон: {place.phone || '-'}</div>
                            <div className="restaurant-info">Работно време: {place.working_hours || '-'}</div>
                            <button onClick={() => navigate(`/reservation?placeId=${place.id}`)}>
                                Резервирай
                            </button>
                        </div>
                        {place.image_url && <img src={place.image_url} alt={place.name} />}
                    </div>
                ))}
            </section>
        </main>
    );
};
