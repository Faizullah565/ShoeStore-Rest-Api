// routes/search.js
const express = require("express");
const router = express.Router();

// const { gql } = require("apollo-server-express");
// require("../modals/imageDetails");
// const Images = mongoose.model("ImageDetails")
const Images = require("../models/imageDetails"); // Make sure to define the Item model in this path

////////////////////////////////////////////////////////////
const multer = require('multer');
const { log } = require("console");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })
/////////////////////////////////////////////////////////
router.post("/upload-image", upload.single("image"), async (req, res) => {

  // console.log(req.body)
  const imageName = req.file.filename
  console.log(req.body.name)

  try {
    const result = await Images.create({
      image: imageName,
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

// const data = Array.from({ length: 100 }, (_, i) => `Box ${i + 1}`);

//get route

// const typeDefs = gql`
//   type ImageDetails {
//     image: String
//     name: String
//     price: Float
//     qty: Int
//     id: Int
//   }

//   type Query {
//     getImages(page: Int, itemsPerPage: Int): [ImageDetails]
//   }
// `;

// module.exports = typeDefs; 

router.get("/get-image", async (req, res) => {
  try {
    // res.status(200).json({ status: 'ok', data: Images });
    const data = await Images.find(); // Await the promise to resolve
    res.send({ status: "ok", data: data });
    //  console.log(data)
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
  // const page = parseInt(req.query.page) || 1;
  // console.log(page)
  //   const itemsPerPage = parseInt(req.query.itemsPerPage) || 12;

  //   try {
  //       const totalItems = await Images.countDocuments();
  //       const totalPages = Math.ceil(totalItems / itemsPerPage);

  //       const boxes = await Images.find()
  //           .skip((page - 1) * itemsPerPage)
  //           .limit(itemsPerPage);

  //       res.json({
  //           currentPage: page,
  //           itemsPerPage,
  //           totalPages,
  //           data: boxes,
  //       });
  //   } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ error: "Internal server error" });
  //   }
});

//////////////////////////////////////////////////////////////////
router.delete("/delete-shoe/:id", async (req, res) => {
  try {
    const shoeId = req.params.id;
    console.log(shoeId)
    const deletedShoe = await Images.findByIdAndDelete(shoeId);

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
