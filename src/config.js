const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/login-tut");

connect.then(() => {
    console.log("database connected");

})
.catch((error) => {
   console.error("Error connecting to the database:", error);
});

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    }

});



const collection =  mongoose.model("signups", LoginSchema);
module.exports = collection;
