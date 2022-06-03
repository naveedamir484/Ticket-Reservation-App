import { Listener, OrderCreatedEvent,OrderStatus,Subjects } from "@node_ms/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import {Payment} from '../../modal/payment';


export class OrderCreatedListener extends Listener<OrderCreatedEvent>{

     subject: Subjects.OrderCreated=Subjects.OrderCreated;
     queueGroupName= queueGroupName;

     async onMessage(data: OrderCreatedEvent['data'], msg: Message){
          
          // whenorder is created so adding into payment
          const payment=Payment.build({
               id:data.id,
               price: data.ticket.price,
               status: data.status,
               userId: data.userId,
               version: data.version
          });

          await payment.save();

          console.log('payment is sucessfully saved...')


          msg.ack();

     }

}