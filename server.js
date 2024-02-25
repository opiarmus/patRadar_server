const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();
require('dotenv').config();

server.use(bodyParser.json());
server.use(cors());

const connectionString =
    `mongodb+srv://patstein:${process.env.MONGO_DB_PW}@patradar.cnfbnq1.mongodb.net/?retryWrites=true&w=majority&appName=patRadar`;

server.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}]`);
    next();
});

// GET /technologies - returns all technologies in array
server.get('/technologies', async (req, res) => {
    const client = await mongoClient.connect(connectionString);
    const db = client.db('patRadar');
    const collection = db.collection('technologies');
    const result = await collection.find({}).toArray();
    res.send(result);
});

// GET /technologies/{id} - returns technology with this id if it exists, otherwise fail message
server.get('/technologies/:id', async (req, res) => {
    const client = await mongoClient.connect(connectionString);
    const db = client.db('patRadar');
    const collection = db.collection('technologies');
    const result = await collection.findOne({ _id: objectId(req.params.id) });
    if (result) {
        res.send(result);
    } else {
        res.status(404);
    }
    res.end();
});

// POST /technologies - saves new technology to array
server.post('/technologies', async (req, res) => {
    const client = await mongoClient.connect(connectionString);
    const db = client.db('patRadar');
    const collection = db.collection('technologies');
    // Convert date strings to Date objects before inserting into MongoDB
    const technology = { ...req.body, createdAt: new Date(req.body.createdAt) };
    await collection.insertOne(technology);
    res.status(201);
    res.end();
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

