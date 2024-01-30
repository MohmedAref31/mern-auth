# MERN-AUTH
## A full stack project for authentication system icluding sign in, sign up, sign out  and update


## Features

- sign up with email or google account. 
- sign in with email or google acount.
- use Oauth in google authentication.
- use firebase storage in storing images.
- user can update his info and his profile image.
- user can delete his account.
- user can sign out.



This text you see here is *actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results in the right.

## Frontend Tech
- Reactjs with Vite
- redux and redux-toolkit 
- react-router
- taillwind css
## Backend Tech
- nodejs 
- expressjs 
- bcryptjs
- jsonwebtoken
- express-async-handler
- mongodb and mongoose
- nodemon
## Installation

MERN-AUTH requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd Mern-auth
for client
cd client 
npm i
npm run dev
for server
cd server 
npm i 
node server.js
```

For production environments...
```sh
client 
add .env file in client/ directory 

VITE_FIREBASE_API_KEY = your firebase key

server 
add .env file in server/ directory 

# Database connection
DB_URI = your mongo uri

# Define mode 
MODE = dev

#JWT 
JWT_SECERT = your seceret key 

# expiry options 
EXPIRES_IN  = 1h
```










