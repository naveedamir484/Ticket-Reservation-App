import Router from 'next/router';
import {useEffect} from 'react';
import userRequest from '../../hooks/user-request';

export default()=>{

     const {doRequest} = userRequest({
          url: '/api/users/signout',
          method: 'post',
          body: {},
          onSuccess: ()=>{ 
               console.log('inside on success function');
               Router.push('/auth/signin')
          }
     })
     
     useEffect(()=> {
          doRequest();
     }, []);
}