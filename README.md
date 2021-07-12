<h1 align="center">Jualkarcis Restful API</h1>

Need tickets but got no time? Worry not, here you can buy ticket, and find new movies on theatres instantly! On Tickitz.com!

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)

[More about Express](https://en.wikipedia.org/wiki/Express.js)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3005/)
8. You can see all the end point [here](https://documenter.getpostman.com/view/14953068/Tzm6mG1h)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST=localhost // Database host
DB_USER=root // Database username
DB_PASS= // Database password
DB_NAME=revisi_jualkarcis // Database name
PORT=3005 // port
SMTP_EMAIL= // your email
SMTP_PASSWORD= // your email password
PRIVATE_KEY= // your private key for decode user token
```
