# Docker Multi-Container Application

## Overview

This project demonstrates how to containerize and deploy a multi-container web application using Docker and Docker Compose.

The application consists of:

- Frontend – Nginx + HTML/JavaScript
- Backend – Node.js + Express
- Database – PostgreSQL
- Docker Volume – Persistent PostgreSQL storage
- Custom Docker Network – Communication between containers
- Docker Hub – Container image repository

## Project Architecture

docker-practical-assignment/
│
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── index.html
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── docker-compose.yml
├── README.md
│
├── screenshots/
│   ├── docker-build.png
│   ├── running-containers.png
│   ├── application.png
│   ├── communication.png
│   └── docker-hub.png
│
└── report/
    └── Docker_Practical_Report.pdf

### 1. Prerequisites

The following software is required:

Windows
Docker Desktop
Git
GitHub account
Docker Hub account

**Verify Docker installation:**

docker --version

Verify Docker Compose:

docker compose version

## 2. Frontend

The frontend uses Nginx to serve a simple HTML application.

Frontend Dockerfile
FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

Frontend Application

The HTML application provides a button to test communication with the backend and database.

The frontend communicates with the backend through the Nginx reverse proxy.

## 3. Backend

The backend is developed using Node.js and Express.

Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY server.js .

EXPOSE 3000

CMD ["npm", "start"]

The backend provides API endpoints to verify application and database connectivity.

## 4. Database

PostgreSQL is used as the database.

The PostgreSQL Docker image is:

postgres:16-alpine

The database is configured with:

Database: myapp
User: postgres
Password: postgres

For a production application, database credentials should be stored securely using environment variables or Docker secrets rather than being committed to source control.

## 5. Docker Compose

Docker Compose is used to deploy the complete multi-container application.

The application contains three services:

frontend
backend
database
Start the Application

Run:

docker compose up -d --build

This command:

Builds the frontend image
Builds the backend image
Pulls the PostgreSQL image
Creates the Docker network
Creates the PostgreSQL volume
Starts all containers

## 6. Verify Running Containers

Run:

docker compose ps

Or:

docker ps

The following containers should be running:

docker-frontend
docker-backend
docker-database

## 7. Access the Application

Open the following URL in a browser:

http://localhost:8084

The frontend application will be displayed.

Click:

Check Backend & Database

A successful response confirms communication between:

Frontend → Backend → PostgreSQL

## 8. Docker Network

A custom Docker bridge network is configured in Docker Compose.

Network:

app-network

The frontend, backend, and database containers are connected to this network.

Check Docker networks:

docker network ls

Inspect the network:

docker network inspect docker-practical-assignment_app-network

The containers should appear as members of the custom network.

## 9. Docker Volume

A persistent Docker volume is used for PostgreSQL data.

Volume:

postgres-data

The volume is mounted at:

/var/lib/postgresql/data

List Docker volumes:

docker volume ls

Inspect the volume:

docker volume inspect docker-practical-assignment_postgres-data

The volume ensures that PostgreSQL data can persist independently of the database container.

## 10. Docker Images

List Docker images:

docker images

The project builds custom images for:

Frontend
Backend

PostgreSQL uses the official Docker image:

postgres:16-alpine

## 11. Docker Hub

The custom Docker images can be pushed to Docker Hub.

Login:

docker login

Example frontend image tag:

docker tag docker-practical-assignment-frontend:latest ankumpetavimala/docker-frontend:1.0

Push the frontend image:

docker push ankumpetavimala/docker-frontend:1.0

Example backend image tag:

docker tag docker-practical-assignment-backend:latest ankumpetavimala/docker-backend:1.0

Push the backend image:

docker push ankumpetavimala/docker-backend:1.0

Docker Hub repository:

https://hub.docker.com/

## 12. Useful Docker Commands

Build and start containers
docker compose up -d --build
Check containers
docker compose ps
View logs
docker compose logs
View backend logs
docker compose logs backend
Stop containers
docker compose down
Rebuild containers
docker compose up -d --build
List images
docker images
List volumes
docker volume ls
List networks
docker network ls

## 13. Verification

The application was verified using the following checks:

Container Verification

All three containers are running:

Frontend
Backend
Database
Application Verification

The frontend is accessible through:

http://localhost:8084
Backend Verification

The frontend successfully sends an API request to the Node.js backend.

Database Verification

The backend successfully connects to PostgreSQL and returns the database response.

Network Verification

All services are connected to the custom Docker network:

app-network
Volume Verification

PostgreSQL uses the persistent volume:

postgres-data

## 14. Screenshots

The following screenshots are included as evidence of the implementation:

Running Containers

Shows the frontend, backend, and database containers running successfully.

screenshots/running-containers.png
Running Application

Shows the application running in the browser.

screenshots/application.png
Container Communication

Shows the custom Docker network and communication between services.

screenshots/communication.png
Docker Hub

Shows the Docker images pushed to Docker Hub.

screenshots/docker-hub.png
Docker Build

Shows successful Docker image creation.

screenshots/docker-build.png

## 15. Implementation Summary

This project demonstrates the deployment of a three-tier web application using Docker and Docker Compose.

The frontend was developed using HTML and Nginx. The backend was developed using Node.js and Express, while PostgreSQL was used as the database.

Separate Dockerfiles were created for the frontend and backend. Docker Compose was used to build and deploy all three services together.

A custom Docker network was configured so that the frontend, backend, and database containers can communicate with each other. A persistent Docker volume was configured for PostgreSQL data.

The custom frontend and backend Docker images were also tagged and pushed to Docker Hub.

The complete application was tested by accessing the frontend through the browser and verifying successful communication between the frontend, backend, and database.
