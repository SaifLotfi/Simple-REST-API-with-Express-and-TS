import express from 'express';
import 'express-async-errors';
import { registerUser } from 'services/authentication.service';
const register = async (req: express.Request, res: express.Response) => {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    res.status(200).json(user).end();
};

export { register };
