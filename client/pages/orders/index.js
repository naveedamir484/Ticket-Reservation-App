import { useState, useEffect } from "react";


const  OrderIndex =({orders})=>{


     const [typee, setTypee]=useState('all');
     const [gettimeleft, setTimeleft]=useState('');

//// for order all //////////////////////////////////////////////////////////////////

     let orders_all=orders.map(order => {
             
               let val=Math.round((new Date()-new Date(order.expiresAt))/(1000)+120);
               const classs= order.status=="completed"? "green" : "red";
               let timeleft='';

               if(val<=60 && val>=0)timeleft=Math.round(val)+' seconds';
               val=val/60;
               if(val<=60 && val>1)timeleft=Math.round(val)+' minutes';
               val=val/60;
               if(val<=60 && val>1)timeleft=Math.round(val)+' hours';
               val=val/24;  
               if(val<=60 && val>1)timeleft=Math.round(val)+' days';


          return <li key={order.id} className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                  <div className="fw-bold">{order.ticket.title} </div>
                  Price : {order.ticket.price} INR<br></br>
                  order Id : {order.id} <br></br>
                  <h6 className={classs}>Status : {order.status}</h6>
                  </div>
                
                  <span className="badge bg-secondary rounded-pill">{timeleft} ago</span>
                 </li>});

/// for completed order /////////////////////////////////////////////////////////////

let orders_completed=orders.filter(order => order.status==="completed").map(order => {
             
     let val=Math.round((new Date()-new Date(order.expiresAt))/(1000)+120);
     const classs= order.status=="completed"? "green" : "red";
     let timeleft='';

     if(val<=60 && val>=0)timeleft=Math.round(val)+' seconds';
     val=val/60;
     if(val<=60 && val>1)timeleft=Math.round(val)+' minutes';
     val=val/60;
     if(val<=60 && val>1)timeleft=Math.round(val)+' hours';
     val=val/24;  
     if(val<=60 && val>1)timeleft=Math.round(val)+' days';


return <li key={order.id} className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
        <div className="fw-bold">{order.ticket.title} </div>
        Price : {order.ticket.price} INR <br></br>
        order Id : {order.id} <br></br>
        <h6 className={classs}>Status : {order.status}</h6>
        </div>
      
        <span className="badge bg-secondary rounded-pill">{timeleft} ago</span>
       </li>});


/// for cancelled order //////////////////////////////////////////////////////////////


let orders_cancelled=orders.filter(order => order.status==="cancelled").map(order => {
             
     let val=Math.round((new Date()-new Date(order.expiresAt))/(1000)+120);
     const classs= order.status=="completed"? "green" : "red";
     let timeleft='';

     if(val<=60 && val>=0)timeleft=Math.round(val)+' seconds';
     val=val/60;
     if(val<=60 && val>1)timeleft=Math.round(val)+' minutes';
     val=val/60;
     if(val<=60 && val>1)timeleft=Math.round(val)+' hours';
     val=val/24;  
     if(val<=60 && val>1)timeleft=Math.round(val)+' days';


return <li key={order.id} className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
        <div className="fw-bold">{order.ticket.title} </div>
        Price : {order.ticket.price} INR <br></br>
        order Id : {order.id} <br></br>
        <h6 className={classs}>Status : {order.status}</h6>
        </div>
      
        <span className="badge bg-secondary rounded-pill">{timeleft} ago</span>
       </li>});


//// for order created /////////////////////////////////////////////////////////////////


let orders_created=orders.filter(order => order.status==="created").map(order => {
             
     let val=Math.round((new Date()-new Date(order.expiresAt))/(1000)+120);
     const classs= order.status=="completed"? "green" : "red";
     let timeleft='';

     if(val<=60 && val>=0)timeleft=Math.round(val)+' seconds';
     val=val/60;
     if(val<=60 && val>1)timeleft=Math.round(val)+' minutes';
     val=val/60;
     if(val<=60 && val>1)timeleft=Math.round(val)+' hours';
     val=val/24;  
     if(val<=60 && val>1)timeleft=Math.round(val)+' days';


return <li key={order.id} className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2  me-auto ">
        <div className="fw-bold">{order.ticket.title} </div>
        Price : {order.ticket.price} INR<br></br>
        order Id : {order.id} <br></br>
        <h6 className={classs}>Status : {order.status}</h6>
        </div>
      
        <span className="badge bg-secondary rounded-pill">{timeleft} ago</span>
       </li>});

//////////////////////////////////////////////////////////////////////////////////////
     const handle1 =()=>{setTypee('all');}
     const handle2 =()=>{setTypee('completed');}
     const handle3 =()=>{setTypee('cancelled');}
     const handle4 =()=>{setTypee('created');}

     
  


     return <div>
          <div className="btn-group checkbox" role="group" aria-label="Basic radio toggle button group">
          <div className="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button"  onClick={handle1} className="btn btn2 all " >All</button>
          <button type="button" onClick={handle2} className="btn btn2 all">Completed</button>
          <button type="button" onClick={handle3} className="btn btn2 all">Cancelled</button>
          <button type="button" onClick={handle4} className="btn btn2 all">Created</button>
          </div>
          </div>
          <ul className="list-group "> 
          {typee==='all' ? orders_all: null}
          {typee==='completed' ? orders_completed: null}
          {typee==='cancelled' ? orders_cancelled: null}
          {typee==='created' ? orders_created: null}
          </ul></div>;
}

OrderIndex.getInitialProps =async (context,client) =>{

     const{data}  = await client.get('/api/orders');

     return {orders: data};
}


export default OrderIndex;