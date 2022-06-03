import mongoose from 'mongoose';
import {OrderStatus} from '@node_ms/common'
import {TicketDoc} from './ticket'
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';

// An interface that describes the properties 
// that are required to create a new order
interface OrderAttrs{   
     userId: string;
     status: OrderStatus;  // status should be one of the from enum;
     expiresAt: Date;
     ticket: TicketDoc; // TicketDoc is interface aswell
}

// An interface that describes that properties 
// that a ORder Document has
interface OrderDoc extends mongoose.Document {
     userId: string;
     status: OrderStatus;  // status should be one of the from enum;
     expiresAt: Date;
     ticket: TicketDoc; // TicketDoc is interface aswell
     version: number;
}

// An interface that descrives that properties
// that a order Model has
interface OrderModel extends mongoose.Model<OrderDoc> {
     build(attrs: OrderAttrs): OrderDoc;
}



/////////////////////////////////////////////////////////////////////////////////////////////////

// defining the structure or schema of order collection 
const orderschema = new mongoose.Schema(
     {    
          userId : {type : String, required : true}, 
          status : { type : String, required: true,enum: Object.values(OrderStatus), default: OrderStatus.Created},
          expiresAt: { type: mongoose.Schema.Types.Date},
          ticket: {type: mongoose.Schema.Types.ObjectId, ref: 'Ticket'}
     
     }, 
     {toJSON: { transform(doc,ret){  //  just formating the data during view / not deleting.
            ret.id=ret._id;
            delete ret._id;
     } }} );

// adding build function along with logic to schema 
orderschema.statics.build = (attrs: OrderAttrs) =>{
     return new Order(attrs);
}

// adding version property;
orderschema.set('versionKey','version');
orderschema.plugin(updateIfCurrentPlugin);

// creating the model of user schema
const Order=mongoose.model<OrderDoc,OrderModel>('Order',orderschema);

export {Order};