import express from 'express';
import { ReservationController } from '../controllers/ReservationController';
import { CreateReservation } from '../common/ReservationInterfaces';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware';

const router = express.Router();
const controller = new ReservationController();

router.get('/', requireAuth, async (req, res) => {
    const controller = new ReservationController();
    const user = (req as any).user;

    try {
        let reservations;
        if (user?.isAdmin) {
            reservations = await controller.getAllReservations();
        } else {
            reservations = await controller.getReservationsByUserId(user.userId);
        }

        res.json(reservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Грешка при зареждане на резервации' });
    }
});

router.post('/', requireAuth, async (req, res) => {
    const user = (req as any).user;
    const data: CreateReservation = { ...req.body, user_id: user.userId };

    try {
        const newReservation = await controller.createReservation(data);
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(500).json({ error: 'Грешка при създаване на резервация' });
    }
});

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const data: CreateReservation = req.body;

    try {
        const updated = await controller.updateReservation(id, data);
        res.json(updated);
    } catch {
        res.status(500).json({ error: 'Грешка при обновяване' });
    }
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await controller.deleteReservation(id);
        res.status(204).send();
    } catch {
        res.status(500).json({ error: 'Грешка при изтриване' });
    }
});

export default router;
