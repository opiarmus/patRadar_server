const express = require("express");

const {
    getTechnologies,
    getTechnology,
    createTechnology,
    updateTechnology,
} = require("../controllers/technology.controller");

const router = express.Router();

/* Creating the routes for the product controller. */
router.get("/technologies", getTechnologies);

router.get("/technologies/:id", getTechnology);

router.post("/technologies", createTechnology);

router.put("/technologies", updateTechnology);

module.exports = router;