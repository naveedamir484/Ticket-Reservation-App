import express, {Request, Response} from 'express';
import {Ticket} from '../models/tickets';
import { NotFoundError } from '@node_ms/common';

const router =express.Router();

router.get('/api/tickets/:id',async (req: Request, res: Response) => {
     
     const idd=req.params.id;
     const ticket =await Ticket.findById(idd);

     if(!ticket){throw new NotFoundError();}

     res.send(ticket);
    
});

export {router as showTicketRouter};