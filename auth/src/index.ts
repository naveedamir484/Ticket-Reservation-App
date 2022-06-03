import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import {currentUserRouter} from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from '@node_ms/common';
import { NotFoundError } from '@node_ms/common';

// act middle-ware
const app=express()
app.use(json());
app.use(cookieSession({
    signed : false, //remove encryption
    secure: true // cookies will be share with only secure https request not http.
}));
// allow the proxy beause of nginx
app.set('trust proxy',true);


// setting routes 
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter); 
app.use(signupRouter);


app.all('*', async (req,res)=>{
   throw new NotFoundError();
});


// applying error handler whenever throw new Error 
// this errorHandler will trigger and pass four argument.
app.use(errorHandler);


// we cant put await on top level so here we are using fucntion 
// and putting await inside of it.
const start = async ()=>{
    
    // making sure key is defined in auth.yaml file.
    if(!process.env.JWT_KEY)throw new Error('JWT_KEY msut be defined.');
    if(!process.env.MONGO_URI)throw new Error('AUTH_MONGO_URI must be defined.');
     
    try{
        await mongoose.connect(process.env.MONGO_URI,{ });
        console.log('connection established to auth MongoDB.....')
     }
    catch (err){ console.log(err); console.log('cant connect to database')}

    app.listen(3000,()=>{ console.log("listening on port 3000..." ); });
   
};

start();

