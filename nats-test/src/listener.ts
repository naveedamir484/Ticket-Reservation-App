import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

// random key helps in creating multiple instances of listener
const random_key= randomBytes(4).toString('hex');
const stan= nats.connect('ticketing',random_key,{ url: 'http://localhost:4222'});

stan.on('connect',()=>{

     console.log('Listener connected to NATS');

     stan.on('close',()=>{ 
          console.log('NATS connection closed');
          process.exit(); 
     });
     
     // crating the instance and then calling the  listen() fucnction
     new TicketCreatedListener(stan).listen();

});

// watching for terminate signals
process.on('SIGINT', ()=> stan.close());  // closing the client connection first;
process.on('SIGTERM', ()=> stan.close()); 




