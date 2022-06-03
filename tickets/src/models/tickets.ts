import mongoose from 'mongoose';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current'; 


// An interface that describes the properties 
// that are required to create a new ticket
interface TicketAttrs{   
     title: string ;
     price: number;
     userId: string;
}

// An interface that describes that properties 
// that a Ticket Document has
interface TicketDoc extends mongoose.Document {
     title: string ;
     price: number;
     userId: string; 
     version: number;
     orderId?: string; // either string or undefined -> optional
}


// An interface that describes the properties
// that a Ticket Model has
interface TickerModel extends mongoose.Model<any> {
     build(attrs: TicketAttrs): TicketDoc;
}


/////////////////////////////////////////////////////////////////////////////////////////////////

// defining the structure or schema of Ticket collection 
const ticketschema = new mongoose.Schema(
     {title : {type : String, required : true}, 
      price : { type : Number, required: true},
      userId: {type: String, required : true},
      orderId: {type: String}
     }, 
     {toJSON: { transform(doc,ret){  //  just formating the data during view / not deleting.
            ret.id=ret._id;
            delete ret._id;
     } }} );  

// seting up version 
ticketschema.set('versionKey','version');
ticketschema.plugin(updateIfCurrentPlugin);

ticketschema.statics.build = (attrs: TicketAttrs) =>{
     return new Ticket(attrs);
}

// creating the model of user schema
const Ticket=mongoose.model<TicketDoc,TickerModel>('Ticket',ticketschema);

export {Ticket};