import { Publisher, Subjects, TicketCreatedEvent } from "@node_ms/common";

export class TicketCreatedPubisher extends Publisher<TicketCreatedEvent> {

     subject: Subjects.TicketCreated= Subjects.TicketCreated;
}