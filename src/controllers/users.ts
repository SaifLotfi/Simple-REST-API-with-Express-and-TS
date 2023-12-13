import express from 'express';
import 'express-async-errors';
import { getUsers, updateUserById,deleteUserById } from '../models/user';
import { deleteUserService, updateUserService } from '../services/users.service';
const getAllUsers = async (req: express.Request, res: express.Response) => {
    const users = await getUsers();
    res.status(200).json(users);
};

const deleteUser = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const deletedUser = await deleteUserService(id);
    res.status(201).json({msg:"user deleted successfully",user:deletedUser})
}

const updateUser = async (req: express.Request, res: express.Response) => {
    const userData = req.body;
    const id = req.params.id;
    const updatedUser = await updateUserService(id,userData);
    res.status(201).send(updatedUser);
}
export { getAllUsers,deleteUser,updateUser };
