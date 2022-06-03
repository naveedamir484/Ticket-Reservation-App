import { Publisher, Subjects, TicketUpdatedEvent } from "@node_ms/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {

     subject: Subjects.TicketUpdated= Subjects.TicketUpdated;
}