const express = require("express");
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const fetchuser = require("../middleware/fetchuser")
const JWT_SECRET = process.env.JWT_SECRET;

//ROUTE 1: Create a user using: POST "/api/auth/createuser". Doesn't required Auth. No login required
router.post('/register', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a Valid email').isEmail(),
    body('password', 'Password must be at least 4 characters').isLength({ min: 4 }),
    body('role', 'Enter user role').isLength({min:4}),
    body('id', 'id must be at least 5 characters').isLength({ min: 5})
], async (req, res) => {
    let success=false;
    // If there are errors return Bad request and errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
        success=false;
        return res.status(400).json({success, error: error.array() });
    }
    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success=false;
            return res.status(400).json({success, error: "Sorry a user with this email already exist" })
        }
        // const salt = await bcrypt.genSalt(10);
        const salt = await bcrypt.genSalt(10); 
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            role: req.body.role,
            id: req.body.id,
        })
        console.log(req.body)

        const data = {
            user: {
                id: user.id,
            }
        }
        success=true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({success, authtoken })
    } catch (error) {
        success=false;
        console.log(error.message);
        res.status(500).send(success+ "Internal Server Error")
    }
})

//ROUTE 2: Authenticate a User using: POST "/api/auth/login" no login required. 
router.post('/login', [
    body('email', 'Enter a Valid email').isEmail(),
    body('password', 'Password can not be blanck').exists(),
], async (req, res) => {
    let success=false;
    // If there are errors return Bad request and errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    // Check User Existance
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success=false;
            return res.status(400).json({success, error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false;
            return res.status(400).json({success, error: "Please try to login with correct credentials" })
        }
        const data = {
            user: {
                id: user._id,
            }
        }
        // Set expiration time (e.g., 1 hour)
        // const expirationTimeInSeconds = 60 * 60;
        // { expiresIn: expirationTimeInSeconds }
        const authtoken = jwt.sign(data, JWT_SECRET, );
        success=true;
        res.json({success, authtoken, id: user.id})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE 3: Get logedin User Detail using: POST "/api/auth/getuser". login required. 
// router.post('/getuser', fetchuser, async (req, res) => {
//     try {
//         let userId = req.user.id;  //find user ID
//         const user = await User.findById(userId).select("-password") //"-password" means select all feald except password   
//         // console.log(userId) ;
//         res.send(user);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send("Internal Server Error")
//     }
// })
// module.exports = router

router.post('/getuser', async (req, res) => {
    try {
        const user = await User.find().select("-password") //"-password" means select all feald except password   
        // console.log(userId) ;
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router
