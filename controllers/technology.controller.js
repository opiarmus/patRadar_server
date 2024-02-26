const Technology = require("../models/technology.model");

const getTechnologies = async (req, res) => {
    try {
        const techs = await Technology.find();
        res.status(200).json(techs);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getTechnology = async (req, res) => {
    try {
        const tech = await Technology.findById(req.params.id);
        res.status(200).json(tech);
    } catch (error) {
        res.status(500).json(error);
    }
};

const createTechnology = async (req, res) => {
    try {
        const tech = await Technology.create(req.body);
        res.status(201).json(tech);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateTechnology = async (req, res) => {
    try {
        const tech = await Technology.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(tech);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    getTechnologies,
    getTechnology,
    createTechnology,
    updateTechnology,
};