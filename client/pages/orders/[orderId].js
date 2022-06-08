import { useEffect,useState } from "react";
import userRequest from "../../hooks/user-request";
import Router from 'next/router';


const OrderShow =({order, currentUser})=>{

     console.log('this is order looking for',order);

     const [timeLeft, setTimeLeft]=useState(0);

     const {doRequest, errors} = userRequest({
          url:'/api/payments',
          method: 'post',
          body:{orderId: order.id, token: "tok_visa"},
          onSuccess: ()=> Router.push('/orders'), 

     })

     useEffect( ()=>{

          const findTimeLeft =()=>{
               const msLeft=new Date(order.expiresAt)-new Date();
               setTimeLeft(Math.round(msLeft/1000));
          };

          findTimeLeft();
          const timerId= setInterval(findTimeLeft,1000);

          return ()=>{
               clearInterval(timerId);
          }

     },[]);

     if(timeLeft < 0) Router.push('/orders');

     return <div className="order">
            
            <div className="">
            <div className="addoncolor">
               <div className="fw-bold">{order.ticket.title} </div>
                    Price : {order.ticket.price} INR <br></br>
                    order Id : {order.id} <br></br>
               <h6 className="green">Status : {order.status}</h6>
           </div>
            </div>

            <h4 className="headingorder">Your Order will expire in {timeLeft} seconds</h4>
            <div className="progress">
            <div className="progress-bar " role="progressbar" style={{width: timeLeft*1.68+"%"}}  ></div>
            </div>
            <button onClick={doRequest} className="btn paybutton">Pay with Card</button>
            </div>

};

OrderShow.getInitialProps = async (context,client) => {
    
   const {orderId}= context.query;
   const {data}= await client.get(`/api/orders/${orderId}`);

   return {order: data};
}

export default OrderShow;