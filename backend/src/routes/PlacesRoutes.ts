import express from 'express';
import { PlacesController } from '../controllers/PlacesController';

const router = express.Router();
const controller = new PlacesController();

router.get('/', async (req, res) => {
    try {
        const places = await controller.getAllPlaces();
        res.json(places);
    } catch (err) {
        res.status(500).json({ error: 'Грешка при зареждане на заведенията' });
    }
});

export default router;
