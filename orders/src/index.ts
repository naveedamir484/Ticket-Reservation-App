import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { errorHandler } from '@node_ms/common';
import { NotFoundError } from '@node_ms/common';
import { currentUser } from '@node_ms/common';

import { getAllOrderRouter } from './routes/getall';
import { deleteOrderRouter } from './routes/delete';
import { showOrderRouter } from './routes/show';
import { newOrderRouter } from './routes/new';

import { natsWrapper } from './nats-wrapper';
import { TicketCreatedListener } from './events/listeners/ticket-created-listner';
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listner';
import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener';
import { PaymentCreatedListener } from './events/listeners/payment-created-listener';

// act middle-ware
const app=express()
app.use(json());
app.use(cookieSession({
    signed : false, //remove encryption
    secure: true // cookies will be share with only secure https request not http.
}));
// allow the proxy beause of nginx
app.set('trust proxy',true);
// adding 1st middle-ware for authentication.
// check authentication of all incomming requess. alway keep above setting routes.
app.use(currentUser);


// setting routes 
app.use(getAllOrderRouter);
app.use(deleteOrderRouter);
app.use(showOrderRouter);
app.use(newOrderRouter);



app.all('*', async (req,res)=>{
   throw new NotFoundError();
});


// applying error handler whenever throw new Error 
// this errorHandler will trigger and pass four argument.
app.use(errorHandler);


// we cant put await on top level so here we are using fucntion 
// and putting await inside of it.
const start = async ()=>{
    
    // making sure key is defined in ticket .yaml file.
    if(!process.env.JWT_KEY)throw new Error('JWT_KEY msut be defined.');
    if(!process.env.MONGO_URI)throw new Error('TICKET_MONGO_URI must be defined.');
    if(!process.env.NATS_CLIENT_ID)throw new Error('NATS_CLIENT_ID must be defined.');
    if(!process.env.NATS_CLUSTER_ID)throw new Error('NATS_CLUSTER_ID must be defined.');
    if(!process.env.NATS_URL)throw new Error('NATS_URL must be defined.');

     
    // connecting with database and NATS inside try catch block
    try{

        await natsWrapper.connect(  process.env.NATS_CLUSTER_ID,
                                    process.env.NATS_CLIENT_ID,
                                    process.env.NATS_URL);

            // to close the connection safely 
            natsWrapper.client.on('close',()=>{
            console.log('NATS connection closed....');
            process.exit();  })
      
            process.on('SIGINT',()=>  natsWrapper.client.close());
            process.on('SIGTERM', ()=>  natsWrapper.client.close());
            
            // creating instance and adding listeners below
            new TicketCreatedListener(natsWrapper.client).listen();
            new TicketUpdatedListener(natsWrapper.client).listen();
            new ExpirationCompleteListener(natsWrapper.client).listen();
            new PaymentCreatedListener(natsWrapper.client).listen(); 

        await mongoose.connect(process.env.MONGO_URI,{ });
        console.log('connection established to  orders  MongoDB.....')
     }
    catch (err){ console.log(err); console.log('cant connect to database')}
    
    // listening at port 3000
    app.listen(3000,()=>{ console.log("listening on port 3000..." ); });
   
};

start();

