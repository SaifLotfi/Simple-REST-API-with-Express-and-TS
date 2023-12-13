import 'express-async-errors';
import { deleteUserById, updateUserById } from '../models/user';
const deleteUserService = async(id:string)=>{
    const deletedUser = await deleteUserById(id);
    if (!deletedUser) {
        const err: any = new Error('user not found');
        err.status = 404;
        throw err;
    }
    return deletedUser;
}
type userData = {
    name?:string,
    email?:string,
}
const updateUserService = async(userId:string,userData:userData)=>{
    if(!userData.name && !userData.email){
        const err: any = new Error('No Data Sent');
        err.status = 400;
        throw err;
    }
    const updatedUser = await updateUserById(userId,userData);
    if (!updatedUser) {
        const err: any = new Error('user not found');
        err.status = 404;
        throw err;
    }
    return updatedUser;
}

export {deleteUserService,updateUserService}