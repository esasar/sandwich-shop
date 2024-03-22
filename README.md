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
Stop container
```
docker-compose down
```
Data saved to MongoDB is mounted to a local directory and persists between restarts.
## Accessing the application
Once the application is running, you can access it as follows:

**Server-a**: http://localhost:8080. The backend API used to place sandwich orders. Documentation available at the http://localhost:8080/docs endpoint

**Server-b**: Does not expose any ports to the host machine.

**Frontend**: http://localhost:5173. React application.

**RabbitMQ**: http://localhost:15672/. RabbitMQ message broker management plugin

**MongoDB**: Does not expose any ports to the host machine.

## Build with
### Frontend
- React: frontend framework
### Backend
- Node.js: backend runtime
- Mongoose: ORM
- RabbitMQ: AMPQ message broker
- Express: REST API framework
### Database
- MongoDB
### Containerization
- Docker
