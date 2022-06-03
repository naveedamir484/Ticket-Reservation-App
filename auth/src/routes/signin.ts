import express,{Request,Response} from 'express';
import {body} from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '@node_ms/common';
import { User } from '../modals/user';
import { BadRequestError } from '@node_ms/common';
import { Password } from '../services/password';


const router= express.Router();

router.post('/api/users/signin',[
         // checking and validating the email and password 
         body('email').isEmail().withMessage('Email must be valid'),
         body('password').trim().notEmpty().withMessage('Please enter the password aswell')

         ],validateRequest,async (req: Request,res: Response)=>{
     
         const {email,password} =req.body;

         // checking the user in database , throw error if user doesnt exist.
         const existingUser=await User.findOne({email});
         if(!existingUser) throw new BadRequestError('User not Found..')    
         else console.log('Email exist -> Checking Password...');
         
         // comparing or checking the passwords. if false throw error .
         const passwordsMatch =await Password.compare(existingUser.password,password);
         if(!passwordsMatch) throw new BadRequestError('Incorrect Password...');
         else console.log('Password Matched -> Signing IN succesfully...');


         // Generate Jason web token // it encrypt the object using Key and then convert in base64.
         // during encryption its add one more field "Issued At Time IAT".
         const userjwt=jwt.sign({ id: existingUser.id, email: existingUser.email},process.env.JWT_KEY!);
         // Store it on session object
         req.session={ jwt: userjwt};
         // and further sending status code along with user detail.
         res.status(200).send(existingUser);
     


});

export {router as signinRouter};