# Crazepiano

## Introduction

WebDev2 -course project work. Collaborators:
- Esa Särkelä

## Running the application
Clone the repository to your local machine 
```
git clone https://course-gitlab.tuni.fi/compcs510-spring2024/crazepiano.git
```
Navigate to the root directory of the project
```
cd crazepiano
```
Build Docker images and start the containers
```
docker-compose up  
```
You can verify that the containers are running by using
```
docker-compose ps
```
## Accessing the application
Once the application is running, you can access it as follows:

**Server-a**: http://localhost:8080. The backend API used to place sandwich orders.

**Server-b**: Does not expose any ports to the host machine.

**Frontend**: http://localhost:5173. React application.

**RabbitMQ**: http://localhost:15672/. Message broker.

**MongoDB**: mongodb://root:password@mongo:27017/

## Build with
### Frontend
- React/Vite: frontend framework
### Backend
- Node.js: backend runtime
- Mongoose: ORM
- RabbitMQ: message broker
- Express: REST API framework
### Database
- TBD (Probably MongoDB)
