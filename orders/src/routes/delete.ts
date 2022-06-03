import express, {Request, Response} from 'express';
import { notAuthorisedError, NotFoundError } from '@node_ms/common';
import { Order } from '../models/orders';
import { OrderStatus } from '@node_ms/common';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';

const router =express.Router();

router.delete('/api/orders/:orderId',async (req: Request, res: Response) => {
     
     const {orderId}=req.params;

     const order= await Order.findById(orderId).populate('ticket');

     if(!order)throw new NotFoundError();
     if(order.userId !== req.currentUser!.id)throw new notAuthorisedError();
     
     order.status = OrderStatus.Cancelled;
     await order.save();

     // punlishing an event saying this was cancelled;
     new OrderCancelledPublisher(natsWrapper.client).publish({
          id: order.id,
          version: order.ticket.version,
          ticket: {id: order.ticket.id}
     });
     
     // sending status to client side 
     res.status(204).send(order);
    
});

export {router as deleteOrderRouter};