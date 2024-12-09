// routes/search.js
const express = require("express");
const router = express.Router();
const Images = require("../modals/imageDetails"); // Make sure to define the Item model in this path

// Search route - GET /search?q=<query>
router.get("/search", async (req, res) => {
  const query = req.query.q;
  console.log(query)

  console.log(Images);
  try {
    const items = await Images.find({
      name: { $regex: query, $options: "i" }, // Case-insensitive search
    });
    console.log(items)    
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

module.exports = router;
