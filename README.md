# Ticket-Reservation-App

"Microservices", a trending buzz word nowadays. Many organizations nowadays are migrating from monolithic application to micro-services based application.
In this project you gonna find out how multiple services run independently and leveraging patterns to enable scale, performance and resilience. Tough the project is having limited functionaity but its backend implementaion is very very huge.

# Use-case
This application has been divided into 6 different services. Each of the service has its own mongoDB database respectively. All these services are converted into Docker image and then pushed into kubernetes container and further the traffic is controlled using nginx. I have implemented messagaing queue system using NATS-streaming for inter communication within services. Below are the following services.

* Auth -> Provide all authentication services like login,logout, sinup and creating cookies etc.
* Client -> Resposible for UI at client side.
* Common -> This directory hold all common modules and code used throughout all different services.
* Expiration -> Setup expiration time using MESSAGING QUEUE when an order is created.
* Order -> Provide all the service regarding order like create order,show orders,delete order etc.
* Payment -> For creating payment and other functionality related to payments.
* Tickets -> For Creation of ticket along with UPDATION, DELETION etc. 

<h5>All the above listed services have their event listeners and publishers for INTER SERVICE COMMUNICATION </h5>
<h4> Below are the few screen shots of application </h4>

<hr></hr>
<p align="center"><kbd><img src="images/1.png" style="border-radius: 1rem " width="600" alt="accessibility text"></kbd></p>
<hr></hr>
<p align="center"><kbd><img src="images/2.png" style="border-radius: 1rem " width="600" alt="accessibility text"></kbd></p>
<hr></hr>
<p align="center"><kbd><img src="images/3.png" style="border-radius: 1rem " width="600" alt="accessibility text"></kbd></p>
<hr></hr>
<p align="center"><kbd><img src="images/4.png" style="border-radius: 1rem " width="600" alt="accessibility text"></kbd></p>
<hr></hr>
<p align="center"><kbd><img src="images/5.png" style="border-radius: 1rem " width="600" alt="accessibility text"></kbd></p>
<hr></hr>
<p align="center"><kbd><img src="images/6.png" style="border-radius: 1rem " width="600" alt="accessibility text"></kbd></p>
<hr></hr>


# Features
* Create User Account - I have implemented Email based Signup and Login.
* Only Authenticated user could access,create and buy tickets.
* After login User could create multiple tickets.
* User could buy any ticket, once payment is done, the ticket would be reserved.
* A ticket would be available to all authenticated users untill someone buys it.
* Avoid Concurrency - At a time only one user is allowed to buy a ticket.
* Create Order - Once user click on buy ticket, an order is generated with (Status : Created)
* Expiration system - On clicking Purchase order, from that moment expiration time started.
* Cancellation system - Once expiration time get over (default 60 seconds) order get cancelled.
* Reserved ticket - Once a user buy a ticket it reserved permanently.
* Once order get cancelled then ticket status changes from Reserved to Available
* Available ticket - Cancelled orders become Available again.
* User can keep track all orders with status (Created, Cancelled, Completed)


# Technology

Ticket Reservation project uses a number of open source projects to work properly:

* Nodejs - Application framework
* nginx - API Gateway (Load Balancer)
* Docker - Containerization platform
* Kubernetes - To create instance of docker image and run pods
* NATS-Streaming - Asynchronous Micro Services Messaging.
* React - HTML enhanced for web apps!
* Bootstrap - great UI boilerplate for modern web apps
* Type Script and Js - Programming Languages
* Git - Version control

# Development

Below are the steps to bring up the development environment and get started.

* Clone the project (https://github.com/naveedamir484/Ticket-Reservation-App)
* Install Git, Nodejs, skaffold, kubernetes and Docker
* Make changes in infra directory for particular service.
* Do NPM install for all services
* Execute "cd /ticketing/"
* To deploy run "skaffold dev"
* Access the Application at  "ticketing.dev"

# Feedback
Feel free to report issues and bugs. It will be helpful for further upgradation of this website.

# Developer
<li>This is open source and free to use for everyone.</li>
<li>Developed By: Naveed Aamir </li>
<li>Email: naveedamir484@gmail.com </li>
<li>Date: June 2022</li>
<li>Language: Java-script & TS</li>




