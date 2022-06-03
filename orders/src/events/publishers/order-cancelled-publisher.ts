import { Subjects,Publisher, OrderCancelledEvent } from "@node_ms/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    
     subject: Subjects.OrderCancelled =Subjects.OrderCancelled
  
}