import useRequest from '../../hooks/user-request' ;
import Router from 'next/router';


const TicketShow =({tickets})=>{
    
     const {doRequest, errors} =useRequest({
          url: '/api/orders',
          method: 'post',
          body: {ticketId : tickets.id},
          onSuccess: (order) =>  Router.push('/orders/[orderId]',`/orders/${order.id}`)
         
     })
      
     console.log('tickets',tickets); 

     return <ul className="list-group addon"> 
            <li className="list-group-item addon2  d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto ">
                  <div className="fw-bold">{tickets.title} </div>
                  Price : {tickets.price} <br></br>
                  Ticket Id : {tickets.id} <br></br>
                  <h6 className="green">Status : Available</h6>
                  </div>
                   
                  <div className='purchase-margin'><a className='view2' onClick={doRequest} > Purchase  </a></div>
                   

                 </li>
            </ul>;


     // return (<div> 
     //      <h1>{tickets.title}</h1>
     //      <h4> Price: {tickets.price}</h4> 
     //      {errors}
     //      <button onClick={doRequest} className="btn btn-primary">Purchase</button>
     //       </div>);

};


TicketShow.getInitialProps = async (context,client, currentUser) =>{

     const {ticketId}= context.query;
     const {data} =await client.get(`/api/tickets/${ticketId}`);

     console.log(data);
   
     return {tickets: data};
   
   
   };


export default TicketShow;