import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import { User } from '../modals/user';
import jwt from 'jsonwebtoken';
import { validateRequest } from '@node_ms/common';

// custome classes  help in handling the errors properly
import { BadRequestError } from '@node_ms/common';


const router= express.Router();

router.post('/api/users/signup',[
     // checking and validating the email and password 
     body('email').isEmail().withMessage('Email must be valid'),
     body('password').trim().isLength({min:4, max:20}).withMessage('password must be 4 to 20 char.')

     ],validateRequest,async (req : Request,res : Response)=>{

     const {email,password} =req.body;
     
     // checking the user in database , throw error if already registered.
     const existingUser=await User.findOne({email});
     if(existingUser) throw new BadRequestError('Email in already use')    
     else console.log('Email is not register -> Proceed to signup');
     
      // creating user document and then save it to the database.
      const user=User.build({email,password});
      await user.save();
      // Generate Jason web token // it encrypt the object using Key and then convert in base64.
      // during encryption its add one more field "Issued At Time IAT".
      const userjwt=jwt.sign({ id: user.id, email: user.email},process.env.JWT_KEY!);
      // Store it on session object
      req.session={ jwt: userjwt};
      // and further sending status code along with user detail.
      res.status(201).send(user);
     

});

export {router as signupRouter};