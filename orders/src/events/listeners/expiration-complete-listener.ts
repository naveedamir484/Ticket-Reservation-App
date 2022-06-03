import { Listener } from "@node_ms/common";
import {Message} from 'node-nats-streaming';
import { ExpirationCompleteEvent,Subjects, OrderStatus } from "@node_ms/common";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/orders";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { natsWrapper } from "../../nats-wrapper";


export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{

     queueGroupName=queueGroupName;
     subject: Subjects.ExpirationComplete=Subjects.ExpirationComplete;


     async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
          
          const order =await Order.findById(data.orderId).populate('ticket');

          if(!order)throw new Error('Order Not found');
          if(order.status=== OrderStatus.Complete)return msg.ack();

         order.set({status: OrderStatus.Cancelled});

         await order.save();

         // order is cancelled so we need publish another event

         await new OrderCancelledPublisher(natsWrapper.client).publish({
              id: order.id,
              version: order.version,
              ticket: {id: order.ticket.id}
         })

        msg.ack();
    
     }
}