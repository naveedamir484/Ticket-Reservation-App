import { Subjects,Publisher, ExpirationCompleteEvent } from "@node_ms/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {

     subject: Subjects.ExpirationComplete= Subjects.ExpirationComplete;
}