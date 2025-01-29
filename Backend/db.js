require('dotenv').config()
const mongoose = require("mongoose")
// const mongoURI = 'mongodb+srv://FaizullahBalghari:Faiz2003@cluster0.ncezhh1.mongodb.net/shoeStore?retryWrites=true&w=majority'
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
// "mongodb+srv://<username>:<password>@cluster0.ncezhh1.mongodb.net/inotebookDB?retryWrites=true&w=majority"

