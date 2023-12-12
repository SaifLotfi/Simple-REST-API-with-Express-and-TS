import { Request, Response, NextFunction } from 'express';
import { getUserBySessionToken } from 'models/user';
import { merge, get } from 'lodash';
import 'express-async-errors';
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
export { isAuth };