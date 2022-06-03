import { OrderCancelledEvent, Subjects, Listener,OrderStatus } from "@node_ms/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Payment } from "../../modal/payment";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {

     subject: Subjects.OrderCancelled=Subjects.OrderCancelled;
     queueGroupName = queueGroupName;

     async onMessage(data: OrderCancelledEvent['data'] , msg: Message) {
          
              const payment= await Payment.findOne({
                    _id: data.id,
                    version: data.version - 1
              })

              if(!payment) throw new Error('payment not found in db');

              // updating the status of payment to OrderCancelled
              payment.set({status: OrderStatus.Cancelled});
              
              
              await payment.save();
              console.log('status of payment changed to CANCELLED Successfully...');
              msg.ack();


     }
}