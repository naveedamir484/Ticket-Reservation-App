import express, {Request,Response} from 'express';
import {body} from 'express-validator';
import { requireAuth, validateRequest,BadRequestError, NotFoundError, notAuthorisedError, OrderStatus } from '@node_ms/common';
import { OrderCancelledListener } from '../events/listeners/order-cancelled-listener';
import { Payment } from '../modal/payment';
import { stripe } from '../stripe';
import { PaymentCreatedPublisher } from '../events/pubisher/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router=express.Router();

router.post('/api/payments',requireAuth,[

     body('token').not().isEmpty(),
     body('orderId').not().isEmpty()

    ], validateRequest, async (req: Request, res: Response)=>{

            const {token,orderId}=req.body;

            const payment =await Payment.findById(orderId);

            console.log(payment);
            
            // checking the request.
            if(!payment)throw new NotFoundError();
            if(payment.userId!==req.currentUser!.id)throw new notAuthorisedError();
            if(payment.status===OrderStatus.Cancelled)throw new BadRequestError('Cannt pay for cancelled payment')

            // since payment is not acceptable in india using API .
            // await stripe.charges.create({
            //     currency:'usd',
            //     amount: payment.price,
            //     source: token
            // });


            // payment is done successfully now publish the event
            new PaymentCreatedPublisher(natsWrapper.client).publish({
                id: payment.id,
                orderId : orderId
            })

            res.send({success: true});

});

export {router as createChargeRouter};