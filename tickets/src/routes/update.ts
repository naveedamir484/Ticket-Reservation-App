import express, {Request, Response} from 'express';
import {Ticket} from '../models/tickets';
import { validateRequest, NotFoundError, BadRequestError } from '@node_ms/common';
import { requireAuth, notAuthorisedError } from '@node_ms/common';
import { body } from 'express-validator';
//  importing event pubisher.
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router =express.Router();

router.put('/api/tickets/:id',requireAuth,[
     
     body('title').not().isEmpty().withMessage('Title is required'),
     body('price').isFloat({gt:0}).withMessage('Price must be greater than zero')

     ],validateRequest,async (req: Request, res: Response) => {
     
     const idd=req.params.id;
     const ticket =await Ticket.findById(idd);

     if(ticket.orderId)throw new BadRequestError('ticket is reserved, cant update');
     
     if(!ticket){throw new NotFoundError();}
     if(ticket.userId !== req.currentUser!.id){throw new notAuthorisedError();}

     ticket.set({title: req.body.title, price: req.body.price});
     await ticket.save();

     // creating instance and publishing the event right after saving the document.
      new TicketUpdatedPublisher(natsWrapper.client).publish({
          id: ticket.id,
          version: ticket.version,
          title: ticket.title,
          price: ticket.price,
          userId: ticket.userId
       });

     res.send(ticket);
     
    
});

export {router as updateTicketRouter};