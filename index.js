require('dotenv').config() // loading env variables from .env file to process.env

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

//Seprating External and Internal Imports
const config = require("./config")
const routes = require("./routes")

const PORT = process.env.PORT || 3000
const app = express();
process.on("unhandledRejection", exitHandler);

app.use(bodyParser.json())

//Routes Handler
app.use("/categories", routes.categoryRoutes);
app.use("/products", routes.productRoutes)


//Starting the Server and DataBase connection
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    mongoose.connect(process.env.MONGODB_URL, config.mongooseOptions).then(() => {
        console.log("Connected to Db")
    }).catch((err) => {
        console.log("Db Connection Failed");
        exitHandler(err);
    })
})

function exitHandler(err) {
    console.log(err);
    if (server) {
        server.close();
    }
    process.exit(1);
}
