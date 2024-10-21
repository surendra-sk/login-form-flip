const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config.js"); 
const { read } = require('fs');
const bodyParser=require('body-parser')
const app = express();
 
 
app.get("/products", async (req, res) => {
      const show = await collection.find({});
      // show.toString();
      res.send(show);
    });
    
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "/views"));
    
    app.use(bodyParser.json());

app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.render("signup");
// });
app.get("/signup", (req, res) => {
    res.render("signup");
});
// app.get("/login", (req, res) => {
//     res.render("login");
// });
// app.get("/", (req, res) => {
//     res.render("signup");
// });

 
app.post("/signup", async(req, res) => {
    const data = {
        name: req.body.myname,
        email: req.body.myemail,
        password: req.body.mypassword,
        confirmpassword: req.body.myconfirmpassword
    }



    //check to see if user is already exist or not
    const existinguser = await collection.findOne({ email: data.email });
    if (existinguser) {
        res.send("user is already registered .try again with differnt user email-id")
    } else {
        //hashing the passwords
        const saltround = 10;
        const hashedpassword = await bcrypt.hash(data.password, saltround);
        const hashedconfirmpassword = await bcrypt.hash(data.confirmpassword, saltround);
        data.password = hashedpassword;
        data.confirmpassword = hashedconfirmpassword;
        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.render("signup");
        
    }
})




//login user

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.myloginemail });
        if (!check) {
            res.send("user does not found!")
        }
        //compare the password
        const ispasswordmatch = await bcrypt.compare(req.body.myloginpass, check.password);
        
        // const isconfirmpasswordmatch = await bcrypt.compare(req.body.myconfirmpassword, check.confirmpassword);
        if (ispasswordmatch) {
            res.send("welcome");
        } else {
            res.send("wrong email and password")
        }
    } catch (error) {
        res.send("wrond email and password")
    }
});





// app.post("/signup", async(req, res) => {
//     const data = {
//         name: req.body.myemail,
//         password: req.body.mypassword
//     }
//     const userdata = await collection.insertMany(data);
//     console.log(userdata);
// })



























console.log(path.join(__dirname, "views", "signup"));


const port = 5502;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});


