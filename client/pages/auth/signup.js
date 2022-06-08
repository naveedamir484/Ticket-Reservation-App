import { useState } from "react";
import Router from 'next/router';
import userRequest from "../../hooks/user-request";

export default () =>{

     const [email,setEmail]=useState('');
     const [password,setPassword]= useState('');
     const {doRequest,errors} = userRequest({
          url: '/api/users/signup',
          method: 'post',
          body: {email,password},
          onSuccess:() => Router.push('/')
     })

     const onSubmit = async (event) =>{
          event.preventDefault();
          await doRequest();
      };

      return (<form className="signinForm" onSubmit = {onSubmit}>
           <h1 className="heading">Create Account</h1>
           <div className='form-group'>
                <label> Email Address</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className='form-control'></input>
           </div>
           <div className='form-group'>
                <label> Enter Password</label>
                <input value={password} onChange={e=> setPassword(e.target.value)} type="password" className='form-control'></input>
           </div>

           {errors}
      
           <button className="btn btn-primary signInbtn">Lets Go</button>
          </form>);

}