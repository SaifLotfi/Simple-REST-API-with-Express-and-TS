import express from 'express'

const router = express.Router();

import authentication from './authentication';

export default ()=>{
    authentication(router);
    return router;
}