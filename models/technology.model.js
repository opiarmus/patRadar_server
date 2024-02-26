const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        category: {
            type: Number,
        },
        classification: {
            type: String,
        },
        createdAt: {
            type: Date,
        },
        creatorId: {
            type: String,
        },
        creatorName: {
            type: String,
        },
        description: {
            type: String,
        },
        name: {
            type: String,
        },
        published: {
            type: Boolean,
        },
        publishedAt: {
            type: Date,
        },
        ring: {
            type: Number,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Technology", productSchema);