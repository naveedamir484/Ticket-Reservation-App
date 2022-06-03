import mongoose from 'mongoose';
import {Password} from '../services/password';

// An interface that describes the properties 
// that are required to create a new User
interface userAttrs{   
     email: string ;
     password : string;
}

// An interface that descrives that properties
// that a User Model has
interface UserModel extends mongoose.Model<any> {
     build(attrs: userAttrs): UserDoc;
}

// An interface that describes that properties 
// that a User Document has
interface UserDoc extends mongoose.Document {
      email :string ;
      password: string;
}

/////////////////////////////////////////////////////////////////////////////////////////////////

// defining the structure or schema of User collection 
const userschema = new mongoose.Schema(
     {email : {type : String, required : true}, password : { type : String, required: true}}, 
     {toJSON: { transform(doc,ret){  //  just formating the data during view / not deleting.
            ret.id=ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
     } }} );

// middle ware function in mongoose trigger during saving the documents.
userschema.pre('save',async function(done){

     if(this.isModified('password')){ 
          const hashed =await Password.toHash(this.get('password'));
          this.set('password',hashed);
     }
     done();
});

userschema.statics.build = (attrs: userAttrs) =>{
     return new User(attrs);
}

// creating the model of user schema
const User=mongoose.model<UserDoc,UserModel>('User',userschema);

export {User};