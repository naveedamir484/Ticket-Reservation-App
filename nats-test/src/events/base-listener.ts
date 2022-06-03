import {Message,Stan} from 'node-nats-streaming';
import {Subjects} from './subjects';

interface Event {
     subject: Subjects;
     data: any;
}

/// when ever we extend abstract class we needed to pass  T as an argument for Types
export abstract class Listener<T extends Event> {


     abstract subject : T['subject'];
     abstract queueGroupName: string;
     private client: Stan;
     protected ackWait = 5*1000;
     abstract onMessage(data: T['data'], msg: Message): void;

     constructor( client: Stan){

          this.client=client;
     }

     subscriptonOption(){
          return this.client
                 .subscriptionOptions()
                 .setDeliverAllAvailable()
                 .setManualAckMode(true)
                 .setAckWait(this.ackWait)
                 .setDurableName(this.queueGroupName);
     }

     listen(){

          const subscription= this.client.subscribe(
               this.subject,
               this.queueGroupName,
               this.subscriptonOption() );

          subscription.on('message',(msg: Message) =>{

                    console.log(`Message recieved: ${this.subject}/ ${this.queueGroupName}`); 
                    const parseData=this.parseMessage(msg);
                    this.onMessage(parseData,msg);
          
          }); 
     }

      parseMessage(msg: Message){
         const data= msg.getData();
         return typeof data==='string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
      }
}
