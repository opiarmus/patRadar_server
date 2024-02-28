const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 5000;

require("dotenv").config();

/* Connecting to the database and then starting the server. */
mongoose
    .connect(process.env.MONGO_DB_CS)
    .then(() => {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    })
    .catch((err) => {
        console.log(err);
    });