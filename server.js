const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();
require('dotenv').config();

server.use(bodyParser.json());
server.use(cors());

const connectionString = process.env.MONGO_DB_CS;

server.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}]`);
    next();
});

/**
 * Retrieves all technologies in an array.
 *
 * @route GET /technologies
 * @returns {Array} An array containing all technologies.
 * @throws {Error} If there's an issue retrieving the technologies.
 */
server.get('/technologies', async (req, res) => {
    const client = await mongoClient.connect(connectionString);
    const db = client.db('patRadar');
    const collection = db.collection('technologies');
    const result = await collection.find({}).toArray();
    res.send(result);
});

/**
 * Retrieves a single technology by ID.
 *
 * @route GET /technologies/{id}
 * @param {string} id - The ID of the technology to retrieve.
 * @returns {Object} The technology object corresponding to the provided ID.
 * @throws {Error} If the technology with the provided ID does not exist.
 */
server.get('/technologies/:id', async (req, res) => {
    const client = await mongoClient.connect(connectionString);
    const db = client.db('patRadar');
    const collection = db.collection('technologies');
    const result = await collection.findOne({ _id: new objectId(req.params.id) });
    if (result) {
        res.send(result);
    } else {
        res.status(404);
    }
    res.end();
});

/**
 * Creates a new technology.
 *
 * @route POST /technologies
 * @param {Object} technology - The technology object to be created.
 * @returns {Object} An object containing the ID of the newly created technology.
 * @throws {Error} If there's an issue creating the technology.
 */
server.post('/technologies', async (req, res) => {
    const client = await mongoClient.connect(connectionString);
    const db = client.db('patRadar');
    const collection = db.collection('technologies');
    // Convert date strings to Date objects before inserting into MongoDB
    const technology = { ...req.body, createdAt: new Date(req.body.createdAt) };
    const result = await collection.insertOne(technology);
    res.status(201).json({ _id: result.insertedId });
    res.end();
});

/**
 * Edits an existing technology.
 *
 * @route PUT /technologies
 * @param {Object} technology - The updated technology object.
 * @returns {Object} An object containing the ID of the updated technology.
 * @throws {Error} If the technology with the provided ID does not exist or there's an issue updating it.
 */
server.put('/technologies', async (req, res) => {
    const client = await mongoClient.connect(connectionString);
    const db = client.db('patRadar');
    const collection = db.collection('technologies');
    // Convert date strings to Date objects before inserting into MongoDB
    let technology = {
        ...req.body,
        createdAt: new Date(req.body.createdAt)
    };
    if (req.body.publishedAt) {
        technology = {
            ...technology,
            publishedAt: new Date(req.body.publishedAt)
        }
    }
    technology.ring = parseInt(technology.ring);
    technology.category = parseInt(technology.category);
    // remove the _id because this can't be overwritten
    const { _id, ...saveTech } = technology;
    const result = await collection.updateOne(
        { _id: new objectId(technology._id) },
        { $set: saveTech }
    );
    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Technology not found' });
    }

    // Add an entry to the changes collection
    const changesCollection = db.collection('technologyChanges');
    await changesCollection.insertOne({
        technologyId: technology._id,
        updatedAt: new Date(),
        ring: technology.ring,
        updatedBy: technology.creatorId // TODO: insert the correct user that did the update
    });

    res.status(200).json({ _id: result.upsertedId});
    res.end();
});

server.get('/request-type', (req, res) => {
    res.send(req.method.toString());
})

server.get('/', (req, res) => {
    res.send('Successful response.');
});

server.listen(9998, () => {
    console.log('patRadar server is listening on port 9998...');
});

