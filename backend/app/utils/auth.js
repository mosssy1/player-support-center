// utils/auth.js

import jwt from "jsonwebtoken"

export const generateToken = (userId, role) => {
    const payload = { userId, role };
    const secretKey = 'your-secret-key'; // Замените на свой секретный ключ
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secretKey, options);
};

export const verifyToken = (token) => {
    const secretKey = 'your-secret-key'; // Замените на свой секретный ключ

    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};
