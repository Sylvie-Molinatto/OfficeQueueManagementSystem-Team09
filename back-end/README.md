# Back End
## Description
This is the back end of the project. It is a REST API that provides the data for the front end. It is written in Node.js using the Express framework.

## Installation
1. Install [Node.js](https://nodejs.org/en/download/)
2. Clone the repository
3. Run `npm install` in the back-end directory
4. Run `npm start` to start the server (the server will be running on port 3000 by default)

## Usage
TODO

## Project Structure
This service is divided into different directories and has one entry point: `server.js`.
### Routes
The routes are located in the `routes` directory. Each group of routes has its own file with all the defined routes for that group.
In these files, we should not find code that handle the request but only the definition of the routes (path, params, method of the controller to use, ...).
### Controllers
The controllers are responsible for handling the requests and responses. They are located in the `controllers` directory.
In this directory, each controller has its own file with all the methods that handle the requests for that controller.
### Middlewares
The middlewares are located in the `middlewares` directory. They are used to handle the requests before they are handled by the controllers.
### Validators
The validators are located in the `validators` directory. In this directory we have all the JSON schemas that are used to validate the requests
using the [ajv](https://ajv.js.org/) library.
### Services
The services are located in the `services` directory. They are used to handle the business logic of the application.
