import { Publisher, OrderCreatedEvent,Subjects } from "@node_ms/common";

export class OrderCreatedPubisher extends Publisher<OrderCreatedEvent> {

     subject: Subjects.OrderCreated= Subjects.OrderCreated;
}