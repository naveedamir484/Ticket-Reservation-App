import { useEffect,useState } from "react";
import userRequest from "../../hooks/user-request";
import Router from 'next/router';


const OrderShow =({order, currentUser})=>{

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

     if(timeLeft < 0)return <div> Order expired </div>

     return <div>
            <h2>Your Order will expire in {timeLeft} seconds</h2>
            <button onClick={doRequest} className="btn btn-success">Pay with Card</button>
            </div>

};

OrderShow.getInitialProps = async (context,client) => {
    
   const {orderId}= context.query;
   const {data}= await client.get(`/api/orders/${orderId}`);

   return {order: data};
}

export default OrderShow;