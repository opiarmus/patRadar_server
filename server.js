const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId
const bodyParser = require('body-parser');
const server = express();
require('dotenv').config();

server.use(bodyParser.json());

const connectionString = ''; // connection string to mongodb with password not visible!

server.use((req, res, next) => {
    console.log('TS:', new Date().toISOString());
    next();
});

server.use((req, res, next) => {
    console.log(`process.env.USER_ID: ${process.env.USER_ID}`);
    next();
});

server.use('/request-type', (req, res, next) => {
    console.log('Request type: ', req.method);
    next();
});

server.get('/request-type', (req, res) => {
    res.send(req.method.toString());
})

server.get('/', (req, res) => {
    res.send('Successful response.');
});

server.listen(9999, () => {
    console.log('patRadar server is listening on port 9999...');
});

// useless comment

