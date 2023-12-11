import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true, select: false },
        sessionToken: { type: String, select: false },
    },
});

export const User = mongoose.model('User', userSchema);

//Actions:

export const getUsers = () => User.find({});
export const getUserByEmail = (email: string) => User.findOne({ email: email });
export const getUserBySessionToken = (sessionToken: string) =>
    User.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => User.findById(id);
export const createUser = (values: Record<string, any>) =>
    new User(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => User.findByIdAndDelete(id);
export const updateUserById = (id: string, values: Record<string, any>) =>
    User.findByIdAndUpdate(id, values);
