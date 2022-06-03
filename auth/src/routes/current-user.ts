import express from 'express';
import { currentUser } from '@node_ms/common';

const router = express.Router();

router.get('/api/users/currentuser',currentUser,(req,res)=>{
    
   // currentUser data is added to req. using middle-ware(currentUser) 
    res.send({currentUser: req.currentUser || null});

});

export {router as currentUserRouter};