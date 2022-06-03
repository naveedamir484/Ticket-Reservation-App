import { Listener , OrderCancelledEvent, Subjects} from "@node_ms/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-names";
import { Ticket } from "../../models/tickets";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {

     subject: Subjects.OrderCancelled= Subjects.OrderCancelled;
     queueGroupName = queueGroupName;

     async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
         
          const ticket = await Ticket.findById(data.ticket.id);

          if(!ticket)throw new Error('Ticket not found');
          
          // removing orderId from mongodb database
          ticket.set({orderId: undefined}); 
          await ticket.save();

          // again publishing the tiket for sync the changes in order database.
          await new TicketUpdatedPublisher(natsWrapper.client).publish({
               id: ticket.id,
               version: ticket.version,
               price: ticket.price,
               title : ticket.title,
               userId: ticket.userId,  
          });
          
          // and now Ack the message
          msg.ack();


     }
}