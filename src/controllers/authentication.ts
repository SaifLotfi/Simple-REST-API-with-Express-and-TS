import express from 'express';
import 'express-async-errors';
import { registerUser, loginUser } from '../services/authentication.service';
const register = async (req: express.Request, res: express.Response) => {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    res.status(200).json(user).end();
};

const login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    res.cookie('sessionToken', user.authentication.sessionToken, {
        domain: process.env.HOST,
        path: '/',
    });

    res.status(200).json(user).end();
};

export { register ,login};
