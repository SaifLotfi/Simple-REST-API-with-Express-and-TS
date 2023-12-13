import express from 'express'

const router = express.Router();

import authentication from './authentication';
import users from './users';

export default ()=>{
    authentication(router);
    users(router);
    return router;
}