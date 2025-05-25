import express from 'express';
import { User } from '../models/UserModels';
import jwt from 'jsonwebtoken';

console.log('AuthController е зареден');

const router = express.Router();
const jwtSecret = 'secret_key'; // можеш да го сложиш в .env по-късно

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const existing = await User.findByIdentifier(username) || await User.findByIdentifier(email);
    if (existing) return res.status(400).json({ error: 'Потребителското име или имейл вече съществува.' });

    const user = new User(null, username, email, password, true, false);
    await user.save();

    res.status(201).json({ message: 'Регистрация успешна!' });
});

router.post('/login', async (req, res) => {
    const { identifier, password } = req.body;

    const user = await User.findByIdentifier(identifier);
    if (!user) return res.status(401).json({ error: 'Невалидни данни.' });

    const isValid = await User.validatePassword(user, password);
    if (!isValid) return res.status(401).json({ error: 'Невалидни данни.' });

    const token = jwt.sign(
        {
            userId: user.id,
            isAdmin: user.isAdmin
        },
        jwtSecret,
        { expiresIn: '1h' }
    );

    res.json({ token, username: user.username, isAdmin: user.isAdmin });
});

export default router;