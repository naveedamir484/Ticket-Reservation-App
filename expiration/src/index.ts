
import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';



// we cant put await on top level so here we are using fucntion 
// and putting await inside of it.
const start = async ()=>{
    
    // making sure key is defined in ticket .yaml file.
    if(!process.env.NATS_CLIENT_ID)throw new Error('NATS_CLIENT_ID must be defined.');
    if(!process.env.NATS_CLUSTER_ID)throw new Error('NATS_CLUSTER_ID must be defined.');
    if(!process.env.NATS_URL)throw new Error('NATS_URL must be defined.');

     
    // connecting with database and NATS inside try catch block   fdfsd
    try{

        await natsWrapper.connect(  process.env.NATS_CLUSTER_ID,
                                    process.env.NATS_CLIENT_ID,
                                    process.env.NATS_URL);

            ///// to close the connection safely 
            natsWrapper.client.on('close',()=>{
            console.log('NATS connection closed....');
            process.exit();  })
      
            process.on('SIGINT',()=>  natsWrapper.client.close());
            process.on('SIGTERM', ()=>  natsWrapper.client.close());

            new OrderCreatedListener(natsWrapper.client).listen();

    
     }
    catch (err){ console.log(err); console.log('cant connect to database...')}

};

start();

