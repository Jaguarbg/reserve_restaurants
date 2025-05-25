import express from 'express';
import cors from 'cors';
import authRoutes from './controllers/AuthController';
import reservationRoutes from './routes/ReservationRoutes';
import placesRoutes from './routes/PlacesRoutes';



const app = express();
const port = 3001; // директно зададен порт

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/places', placesRoutes);

app.get('/', (req, res) => {
    res.send('Back-end сървърът работи без .env!');
});

app.listen(port, () => {
    console.log(`Сървърът слуша на http://localhost:${port}`);
});
