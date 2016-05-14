# React starter kit
Create a new Webpack/Redux/React/Express app for Brand New Congress! This starter kit features:
* React for frontend development
* Redux for frontend data management
* React-router for clientside routing
* Express for the server
* Webpack for development server + hot reloading clientside stuff
* Nodemon for hot reloading backend code
* Rollbar for production error handling
* Minilog for client and server logging
* Node-foreman for running both the Webpack server and Express server
* Automatic asset versioning for cache busting in production
* A sane default setup for exception and error handling
* Works out of the box with Heroku

# Usage
1. Clone this starter kit
1. Run `npm install`
1. Check that the correct value for `_rollbarConfig` -> `accessToken` is set in `src/frontend/index/index.mustache`. The default one is the one used by Brand New Congress apps.
1. Run `npm run dev`
1. Navigate to `http://localhost:3000` to see your app in action.
1. Start making changes by working in the `src/frontend` and `src/backend` directories!
1. Deploy your app to Heroku. Make sure to set the correct environment variables there based on what exists in .env locally!
