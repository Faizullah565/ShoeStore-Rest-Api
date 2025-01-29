//mongoDB connection import
const connectToMongo = require("./db")

//call to mongoDB
connectToMongo();
//import express
const express = require('express');
//create express app
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require("cors");
app.use(cors());
const port = process.env.PORT;
// importing schema
require("./models/imageDetails");
const Images = mongoose.model("ImageDetails")
require("./models/addToCartModal");
const AddToCart = mongoose.model("add_to_cart")
app.get('/', (req, res) => {
  res.send('Hello World!')
  //   res.send('Hello World!')
})

////////////////////////////////////////////////
// Import routes
app.use('/api/auth', require('./routes/auth'));

const searchRouter = require("./routes/Search");
// Use the search router for `/search` endpoint
app.use("/api/Search", searchRouter);

////////////////////////////////////////////////
//use the Cart router endpoint
const cartRouter = require("./routes/cart")
app.use("/api/cart", cartRouter)

////////////////////////////////////////////////
//use the Cart router endpoint
const addShoeRouter = require("./routes/AddShoe")
app.use("/api/AddShoe", addShoeRouter)
////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
