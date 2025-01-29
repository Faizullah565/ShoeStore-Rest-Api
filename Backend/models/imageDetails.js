const mongoose =require("mongoose");

const ImageDetailsSchema= new mongoose.Schema(
    {
        image:String,
        name:String,
        price:Number,
        qty:Number,
        id:Number
    },
    {
        collection:"ImageDetails",
    }
);

module.exports= mongoose.model("ImageDetails", ImageDetailsSchema)