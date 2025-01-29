require('dotenv').config()
const mongoose = require("mongoose")
const connectToMongo=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      // Your logic after successful connection
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
      // Handle the error appropriately
    });
}
mongoose.set('strictQuery', false);
module.exports= connectToMongo;