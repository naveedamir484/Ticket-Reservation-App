import { Router } from 'next/router';
import {useEffect} from 'react';
import userRequest from '../../hooks/user-request';

export default()=>{
     const {doRequest} = userRequest({
          url: '/api/users/signout',
          method: 'post',
          body: {},
          onSuccess: ()=> Router.push('/')
     })
     
     useEffect(()=> {
          doRequest();
     }, []);

     return <div> <h1>Signing you out...</h1></div>
}