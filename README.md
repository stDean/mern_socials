by Toba.

## SOCIOPEDIA - A social media app

# SUMMARY
This is a MERN social media type app built using React and Express.js for backend. The app allows users to sign up, log in, access protected routes(home page, profile page), and allows logged in users post content.

## Features
* User registration: Users can create an account by providing their email address and password.
* User login: Registered users can log in using their credentials and can also use Google login.
* Protected routes: Certain routes are accessible only to authenticated users. Unauthorized users will be redirected to the Not found page.
* Error handling: Appropriate error messages are displayed for invalid inputs or unsuccessful login attempts.
* Token-based authentication: User authentication is managed using JSON Web Tokens (JWT).

## Technologies Used
* React: A JavaScript library for building user interfaces.
* React Router Dom: A library for routing between pages.
* Redux Toolkit: A global state management library.
* Express.js: A web application framework for Node.js.
* MongoDB: A NoSQL database for storing user information.
* JSON Web Tokens (JWT): A method for securely transmitting information between parties as a JSON object.
* Material UI: A xss framework that provides react components.
* formik: A library for form handling.
* react-dropzone: A react library for file handling.