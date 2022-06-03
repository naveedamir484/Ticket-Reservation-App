import mongoose, { Model } from 'mongoose';
import {Order} from './orders';
import {OrderStatus} from '@node_ms/common';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';

// An interface that describes the properties 
// that are required to create a new ticket
interface TicketAttrs{  
     id: string ;
     title: string ;
     price: number;
}

// An interface that describes that properties 
// that a Ticket Document has
export interface TicketDoc extends mongoose.Document {
     title: string ;
     price: number;
     version: number;
     isReserved(): Promise<boolean>  // adding function to document is Reserved.
}


// An interface that describes the properties
// that a Ticket Model  and adding function to a model
interface TickerModel extends mongoose.Model<TicketDoc> {
     build(attrs: TicketAttrs): TicketDoc;
     findByEvent(event: {id: string,version: number}): Promise< TicketDoc | null>;
}


/////////////////////////////////////////////////////////////////////////////////////////////////

// defining the structure or schema of Ticket collection 
const ticketschema = new mongoose.Schema(
     {
          title : {type : String, required : true}, 
          price : { type : Number, required: true},
     }, 
     {toJSON: { transform(doc,ret){  //  just formating the data during view / not deleting.
            ret.id=ret._id;
            delete ret._id;
            delete ret.__v;}}
     });

// adding version property 
ticketschema.set('versionKey','version');
ticketschema.plugin(updateIfCurrentPlugin);

// adding the build fucntion in Model
ticketschema.statics.build = (attrs: TicketAttrs) =>{
     return new Ticket({
            _id: attrs.id,
            title: attrs.title,
            price: attrs.price
     });};

// adding custome function in Model
ticketschema.statics.findByEvent = (event :{ id:string, version: number}) => {

     return Ticket.findOne({
          _id: event.id,
          version: event.version -1 
     })
}

// adding the isResolved() function in Document
ticketschema.methods.isReserved = async function(){
   
     const existingOrder= await Order.findOne({
          ticket : this,
          status : { $in: [OrderStatus.Created, OrderStatus.AwaitingPayment, OrderStatus.Complete]}
     });

     return !!existingOrder

}

// creating the model of user schema
const Ticket=mongoose.model<TicketDoc,TickerModel>('Ticket',ticketschema);

export {Ticket};