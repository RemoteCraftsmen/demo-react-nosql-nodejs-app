# Todo App

Basic todo app written in Node.js and React

### Prerequisites

-   Node.js - v11.11.0
-   NPM - v6.7.0
-   Docker - v18.06.1 (optional)

## Installation

#### Clone the repository

`git clone git@github.com:RemoteCraftsmen/demo-react-nosql-nodejs-app.git`

#### Install dependencies

##### Backend

`cd backend` `npm install` `npm run start`

##### Frontend

`cd frontend` `npm install` `npm install -g serve` `npm run build` `serve -s build`

#### docker setup

`docker-compose up --build`

#### Copy the example env file and make the required configuration changes in the .env file (for both backend and frontend)

`cp .env.example .env`

### Database setup

`npm run db-setup`

### DEMO

Live demo available at https://demo-react-nosql-nodejs-app.rmtcfm.com/
