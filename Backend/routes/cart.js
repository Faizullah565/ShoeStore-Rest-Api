// routes/search.js
const express = require("express");
const router = express.Router();

const AddToCart = require("../modals/addToCartModal"); // Make sure to define the Item model in this path

//////////////////////////////////////////////////////////////////
// Add to Cart
router.post("/add-to-cart", async (req, res) => {
    const result = await AddToCart.findOne({ "id": req.body.id });
    console.log(result)
    try {
      const result = await AddToCart.create({
        image: req.body.image,
        name: req.body.name,
        price: req.body.price,
        qty: req.body.qty,
        id: req.body.id
      })
      res.json(result)
      //  console.log(result)
      //  res.send(req.body)
    } catch (error) {
      res.json({ status: error })
  
    }
  })

  ////////////////////////////////////

router.get("/get-addToCartDatas", async (req, res) => {
    // console.log(req.body)
    try {
      // res.status(200).json({ status: 'ok', data: AddToCart });
      const data = await AddToCart.find(); // Await the promise to resolve
      res.send({ status: "ok", data: data });
      // console.log(data)
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  });
  /////////////////////////////////////
// Edit cart quantity route
router.put("/edit-cart/:id", async (req, res) => {
    try {
      const imageId = req.params.id;
      console.log(imageId)
      // const updateData = req.body; // Get data from the request body
      const updateData = await AddToCart.findById(imageId);
      updateData.qty = updateData.qty + 1
      const updatedImage = await AddToCart.findByIdAndUpdate(imageId, updateData, { new: true });
      if (!updatedImage) {
        return res.status(404).json({ status: "error", message: "Image not found" });
      }
      res.status(200).json({ status: "ok", data: updatedImage });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  });

  // Add cart quantity route
router.put("/add-quantity-cart/:id", async (req, res) => {
  try {
    const imageId = req.params.id;
    console.log(imageId)
    // const updateData = req.body; // Get data from the request body
    const updateData = await AddToCart.findById(imageId);
    updateData.qty = updateData.qty + 1
    const updatedImage = await AddToCart.findByIdAndUpdate(imageId, updateData, { new: true });
    if (!updatedImage) {
      return res.status(404).json({ status: "error", message: "Image not found" });
    }
    res.status(200).json({ status: "ok", data: updatedImage });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// minus cart quantity route
router.put("/minus-quantity-cart/:id", async (req, res) => {
  try {
    const imageId = req.params.id;
    console.log(imageId)
    // const updateData = req.body; // Get data from the request body
    const updateData = await AddToCart.findById(imageId);
    if(updateData.qty>1){
      updateData.qty = updateData.qty - 1;
    }
    const updatedImage = await AddToCart.findByIdAndUpdate(imageId, updateData, { new: true });
    if (!updatedImage) {
      return res.status(404).json({ status: "error", message: "Image not found" });
    }
    res.status(200).json({ status: "ok", data: updatedImage });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
  
  //////////////////////////////////////////////////////////////////
  router.delete('/delete-addToCart/:id', async (req, res) => {
    const shoeId = req.params.id;
    console.log(req.body)
    console.log(shoeId)
    try {
      const deletedShoe = await AddToCart.findByIdAndDelete(shoeId);
      // console.log(deletedShoe)
      if (!deletedShoe) {
        return res.status(404).json({ status: "error", message: "Image not found" });
      }
  
      res.status(200).json({ status: "ok", message: "Image deleted successfully" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  });

module.exports = router;
