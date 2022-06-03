import useRequest from '../../hooks/user-request' ;
import Router from 'next/router';


const TicketShow =({tickets})=>{
    
     const {doRequest, errors} =useRequest({
          url: '/api/orders',
          method: 'post',
          body: {ticketId : tickets.id},
          onSuccess: (order) =>  Router.push('/orders/[orderId]',`/orders/${order.id}`)
         
     })
   

     return (<div> 
          <h1>{tickets.title}</h1>
          <h4> Price: {tickets.price}</h4> 
          {errors}
          <button onClick={doRequest} className="btn btn-primary">Purchase</button>
           </div>);

};


TicketShow.getInitialProps = async (context,client, currentUser) =>{

     const {ticketId}= context.query;
     const {data} =await client.get(`/api/tickets/${ticketId}`);

     console.log(data);
   
     return {tickets: data};
   
   
   };


export default TicketShow;