const mongoose =require("mongoose");
const {Schema}= mongoose;
const addToCartSchema= new mongoose.Schema(
    {
        id:Number,
        name:String,
        image:String,
        price:Number,
        qty:Number,
    },
    {
        collection:"add_to_cart",
    }
);

module.exports= mongoose.model("add_to_cart", addToCartSchema)