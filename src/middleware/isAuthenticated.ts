import { Request, Response, NextFunction } from 'express';
import { getUserBySessionToken } from '../models/user';
import { merge, get } from 'lodash';
import 'express-async-errors';

const isOwner = async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const userId = get(req, 'identity._id') as string;
    if (id !== userId.toString()) {
        const err: any = new Error('Unauthorized');
        err.status = 403;
        throw err;
    }
    return next();
}

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    const sessionToken = req.cookies.sessionToken;
    if (!sessionToken) {
        const err: any = new Error('Unauthenticated');
        err.status = 401;
        throw err;
    }
    const user = await getUserBySessionToken(sessionToken);
    if (!user) {
        const err: any = new Error('Unauthenticated');
        err.status = 401;
        throw err;
    }
    merge(req, { identity: user });
    return next();
};
export { isAuth ,isOwner};