
import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@node_ms/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/tickets";
import { queueGroupName } from "./queue-group-names";

import { Publisher } from "@node_ms/common";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { natsWrapper } from "../../nats-wrapper";
import { TicketCreatedPubisher } from "../publishers/ticket-created-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{

     subject: Subjects.OrderCreated= Subjects.OrderCreated;
     queueGroupName = queueGroupName;

     async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
          
          // Find the ticket that the order is reserving. IF no ticket , throw  error 
          const ticket = await Ticket.findById(data.ticket.id);
          if(!ticket)throw new Error('Ticket not found');

          // Mark the ticket as being reserved by setting its orderId property 
          ticket.set({orderId : data.id})

          // Save the Ticket 
          await ticket.save();

          // again publishing the tiket for sync the changes in order database.
          await new TicketUpdatedPublisher(natsWrapper.client).publish({
               id: ticket.id,
               version: ticket.version,
               price: ticket.price,
               title : ticket.title,
               userId: ticket.userId,
               orderId: ticket.orderId,
               
          });
          
          // and now Ack the message
          msg.ack();
          

     }


}