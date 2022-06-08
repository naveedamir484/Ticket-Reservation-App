import Link from 'next/link';
import { useState, useEffect } from "react";

const LandingPage =( {tickets})=>{

  let ticketList_all;
  let ticketList_reserved;
  let ticketList_available;

  const [typee, setTypee]=useState('all');

  if(!(tickets.currentUser===null)){

    ticketList_available=  tickets.filter( ticket => !ticket.orderId).map(ticket => {
    return ( <tr key={ticket.id}>
           <td>{ticket.title}</td>
           <td>{ticket.price} </td> 
           <td>
              {ticket.orderId ? 
              <a className='view3'>  Reserved </a> :
              <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}><a className='view'> View Ticket </a></Link>
              }
            
          </td></tr>)
     });

     ticketList_reserved=  tickets.filter( ticket => ticket.orderId).map(ticket => {
      return ( <tr key={ticket.id}>
             <td>{ticket.title}</td>
             <td>{ticket.price}</td> 
             <td>
                {ticket.orderId ? 
                <a className='view3'>  Reserved </a> :
                <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}><a className='view'> View Ticket </a></Link>
                }
              
            </td></tr>)
       });


       ticketList_all=  tickets.map(ticket => {
        return ( <tr key={ticket.id}>
               <td>{ticket.title}</td>
               <td>{ticket.price}</td> 
               <td>
                  {ticket.orderId ? 
                  <a className='view3'>  Reserved </a> :
                  <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}><a className='view'> View Ticket </a></Link>
                  }
                
              </td></tr>)
         });

  }

   const handle1 =()=>{setTypee('all');}
   const handle2 =()=>{setTypee('available');}
   const handle3 =()=>{setTypee('reserved');}

  return  (<div >
          <div className="btn-group checkbox" role="group" aria-label="Basic radio toggle button group">
          <div className="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button"  onClick={handle1} className="btn btn2 all " >All</button>
          <button type="button" onClick={handle2} className="btn btn2 all">Available</button>
          <button type="button" onClick={handle3} className="btn btn2 all">Reserved</button>
          </div>
          </div>

            <div className="tablediv"> 
          <table  className="table table-secondary">
            <thead >
              <tr>
                <th>Title</th>
                <th>Price (INR)</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {typee==='all' ? ticketList_all: null}
              {typee==='available' ? ticketList_available : null}
              {typee==='reserved' ? ticketList_reserved : null}
            </tbody>
          </table>
          </div>
         </div>)
  
         
}

// getInitialProps is just for server side rendering process
LandingPage.getInitialProps = async (context,client, currentUser) =>{

  const {data} =await client.get('/api/tickets');

  return {tickets: data};


};

export default LandingPage;