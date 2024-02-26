const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_DB_CS);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /technologies", () => {
    it("should return all techs", async () => {
        const res = await request(app).get("/technologies");
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        expect(res.body.length).toBeGreaterThan(0);
    });
});


