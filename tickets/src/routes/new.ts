import express, {Request,Response} from 'express';
import { requireAuth, validateRequest } from '@node_ms/common';
import {body} from 'express-validator'
import { Ticket } from '../models/tickets';
///
import { TicketCreatedPubisher } from '../events/publishers/ticket-created-publisher';
import {natsWrapper} from '../nats-wrapper';


const router= express.Router();

// requireAuth is here middleware.
router.post('/api/tickets',requireAuth,[
            
     body('title').not().isEmpty().withMessage('Title is required'),
     body('price').isFloat({gt:0}).withMessage('Price must be greater than 0')
       
    ],validateRequest, async (req: Request, res: Response) => {


     console.log('inside create new tickets');
     
     const {title,price}= req.body;
     // creating ticket document follwing with its schema and than save it.
     const ticket =Ticket.build({title,price,userId : req.currentUser!.id})
     await ticket.save();

     // creating instance and publishing the event right after saving the document.
     await new TicketCreatedPubisher(natsWrapper.client).publish({
          id: ticket.id,
          version: ticket.version,
          title: ticket.title,
          price: ticket.price,
          userId: ticket.userId
       })

     res.status(201).send(ticket);

     // res.status(200);
});

export {router as createTicketRouter} ;