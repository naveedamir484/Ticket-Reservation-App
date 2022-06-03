import { OrderStatus } from "@node_ms/common";
import mongoose from "mongoose";
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';

interface PaymentAttrs {
     id: string;
     version: number;
     userId: string;
     price: number;
     status: OrderStatus;
}

interface PaymentDoc extends  mongoose.Document {
     version: number;
     userId: string;
     price: number;
     status: OrderStatus;
}


interface PaymentModel extends mongoose.Model <PaymentDoc> {
     build(attrs: PaymentAttrs): PaymentDoc;

}

const paymentSchema =new mongoose.Schema({
     userId: {type: String,required:true},
     price: {type: Number, required: true},
     status: { type: String, required: true} },
     {
          toJSON:{
               transform(doc,ret){
                    ret.id=ret._id;
                    delete ret._id;
               }
          } });

paymentSchema.set('versionKey','version');
paymentSchema.plugin(updateIfCurrentPlugin);


paymentSchema.statics.build = (attrs: PaymentAttrs) => {
 
     return new Payment({
          _id: attrs.id,
          version: attrs.version,
          price: attrs.price,
          userId: attrs.userId,
          status: attrs.status
     })

}

const Payment = mongoose.model<PaymentDoc,PaymentModel>('Order', paymentSchema);

export {Payment}