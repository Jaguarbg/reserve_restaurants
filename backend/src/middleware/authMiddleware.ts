import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret = 'secret_key'; // може да се изнесе в .env

interface JwtPayload {
    userId: number;
    isAdmin: boolean;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Липсва токен за достъп' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, jwtSecret) as JwtPayload;
        (req as any).user = payload; // добавяме user в req
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Невалиден токен' });
    }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;
    if (!user?.isAdmin) {
        return res.status(403).json({ error: 'Само администратор има достъп' });
    }
    next();
}
