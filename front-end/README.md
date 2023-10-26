# Front End

## Description
This is the front end of the project. It is a web interface  developed using React and Vite as the frontend framework and leverages Bootstrap for the user interface design. 

## Installation
1. Run `npm install` in the front-end directory
2. Run `npm run dev` to start the app in development mode.

## React Client Application Routes
- Route `/`: display the client page
- Route `/officer`: display the officer page
- Route `/monitor`: display the monitor view page

## Main React Components
- `PageLayout`: contains all the possible layout, in particular:
      - `ClientLayout`: layout rendered for a customer to get a ticket for a specific servicy type
      - `OfficerLayout` : layout rendered for an officer to indicate to which counter he is assigned and when he finishes to serve a client
      - `MonitorLayout` : layout rendere by the monitor in the office where it is showned the queue

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
