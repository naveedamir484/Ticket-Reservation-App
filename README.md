# Ticket-Reservation-App

"Microservices", a trending buzz word nowadays. Many organizations nowadays are migrating from monolithic application to micro-services based application.
In this project you gonna find out how multiple services run independently and leveraging patterns to enable scale, performance and resilience. Tough the project is having limited functionaity but its backend implementaion is very very huge.

# Use-case
This application has been divided into 7 different services. Each of the service has its own mongoDB database respectively. All these services are converted into Docker image and then pushed into kubernetes container and further the traffic is controlled using nginx. I have implemented messagaing queue system using NATS-streaming for inter communication within services.

* Auth -> Provide all authentication services like login,logout, sinup and creating cookies etc.
* Client -> Resposible for UI at client side.
* Common -> This directory hold all common modules and code used throughout all different services.
* Expiration -> Setup expiration time using MESSAGING QUEUE when an order is created.
* Order -> Provide all the service regarding order like create order,show orders,delete order etc.
* Payment -> For creating payment.
* Tickets -> For Creation of ticket along with UPDATION, DELETION etc. 

All the above listed services have their event listeners and publishers to INTER SERVICE COMMUNICATION.

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




