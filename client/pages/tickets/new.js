import { useState } from "react";
import useRequest from '../../hooks/user-request';
import Router from 'next/router';

//////

const NewTicket = () =>{

     const [title,setTitle] = useState('');
     const [price, setPrice] =useState('');
     const {doRequest, errors}= useRequest({
          url: '/api/tickets',
          method: 'post',
          body: {title, price},
          onSuccess : ()=> Router.push('/')
     });

     const onBlur = () => {

          const value=parseFloat(price);
          if(isNaN(value)) return;
          setPrice(value.toFixed(2));
     };

     const onSubmit = (event) =>{
          event.preventDefault();
          doRequest();
     }

     
     return (<form className="signinForm" onSubmit = {onSubmit}>
     <h1 className="heading">Create a New Ticket</h1>
     <div className='form-group'>
          <label> Enter Title</label>
          <input value={title} onChange={ (e) => setTitle(e.target.value)}  className='form-control'></input>
     </div>
     <div className='form-group'>
          <label> Enter Price</label>
          <input  onBlur= { onBlur } value={price} onChange={ (e)=> setPrice(e.target.value)}  className='form-control'></input>
     </div>

     {errors}

     <button className="btn signInbtn">Submit</button>
    </form>);
}

export default NewTicket;