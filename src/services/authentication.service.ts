import { createUser, getUserByEmail } from '../models/user';
import { authentication, random } from '../helpers';
import 'express-async-errors';
const registerUser = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
        const err: any = new Error('name, email and password are required');
        err.status = 400;
        throw err;
    }

    //check if user already exists
    let existingUser = await getUserByEmail(email);
    if (existingUser) {
        const err: any = new Error('user already exits');
        err.status = 400;
        throw err;
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

const loginUser = async (email: string, password: string) => {
    //check if any parameter is missing
    if (!email || !password) {
        const err: any = new Error('email and password are required');
        err.status = 400;
        throw err;
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
        const err: any = new Error('user not found');
        err.status = 404;
        throw err;
    }

    const expectedPassword = authentication(user.authentication.salt, password);

    if(expectedPassword !== user.authentication.password){
        const err: any = new Error('invalid password');
        err.status = 403;
        throw err;
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());
    
    await user.save();

    return user;
};
export { registerUser, loginUser };
