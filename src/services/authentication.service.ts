import { createUser, getUserByEmail } from '../models/user';
import { authentication, random } from '../helpers';
import 'express-async-errors';
const registerUser = async (name: string, email: string, password: string) => {

    if (!name || !email || !password) {
        const err: any = new Error('name, email and password are required');
        err.status = 400;
    }

    //check if user already exists
    let existingUser = await getUserByEmail(email);
    if (existingUser) {
        const err: any = new Error('user already exits');
        err.status = 400;
    }

    // create user
    const salt = random();
    const user = await createUser({
        name,
        email,
        authentication: {
            password: authentication(salt, password),
            salt,
        },
    });

    return user;
};

export {
    registerUser,
}