import express, {Request, Response} from 'express';
import { NotFoundError, requireAuth } from '@node_ms/common';
import { Order } from '../models/orders';

const router =express.Router();

router.get('/api/orders',requireAuth,async (req: Request, res: Response) => {
     
     const Orders= await Order.find({userId: req.currentUser!.id}).populate('ticket');

     res.send(Orders);
    
});

export {router as getAllOrderRouter};