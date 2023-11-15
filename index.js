
const express=require("express");
const mongoose=require("mongoose");
const SellerRoute=require("./controller/SellerRouter");
const BuyerRoute=require("./controller/BuyerRouter");
const bodyParser=require("body-parser");
const cors = require('cors');
const app=express();
const multer=require('multer');
const path=require("path");

const upload=multer({dest:"uploads/"});
mongoose.set("strictQuery",true);
mongoose.connect("mongodb+srv://dineshdhulipalla07:Dhulipalla123@cluster0.h01thvz.mongodb.net/sellerdb");
var db=mongoose.connection;
db.on("open",()=>console.log("connected to DB"));
db.on("error",()=>console.log("Error occured"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/SellerRoute",SellerRoute);
app.listen(4000,()=>{
    console.log("server started ");
})

app.use("/BuyerRoute",BuyerRoute);

