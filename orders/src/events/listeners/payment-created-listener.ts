import { Subjects, Listener, PaymentCreatedEvent} from '@node_ms/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/orders';
import { OrderStatus } from '@node_ms/common';



export class PaymentCreatedListener extends Listener<PaymentCreatedEvent>{
     
     queueGroupName: string= queueGroupName;
     subject: Subjects.PaymentCreated= Subjects.PaymentCreated;
     

   async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
        
     const order= await Order.findById(data.orderId);

     if(!order) throw new Error('Order not found');

     order.set({status: OrderStatus.Complete});

     order.save();

     msg.ack();

   }

}
