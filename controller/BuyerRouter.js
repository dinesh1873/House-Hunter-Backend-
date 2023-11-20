const express = require("express");
const mongoose = require("mongoose");
const BuyerSchema = require('../model/BuyerSchema');
const BuyerRoute = express.Router();

BuyerRoute.post("/create-user",(req,res)=>{
    BuyerSchema.create(req.body,(err,data)=>{
        if(err){
            return err;
        }else{
            return res.json(data);
        }
    })
})
BuyerRoute.post("/search", (req, res) => {
    const { email, password } = req.body;
    BuyerSchema.findOne({ email: email, password: password }, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (!data) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(data);
    });
});
BuyerRoute.put("/update",(req,res)=>{
    const {email,password}=req.body;
    BuyerSchema.findOneAndUpdate(
        { email: email }, 
        { password: password }, 
        { new: true }, 
        (err, data) => {
            if(err){
                return res.status(500).json({ error: err.message });
            } else if(!data){
                return res.json("Email not Found");
            }
            return res.json("Your Password Updated Successfully");
        }
    );
});

module.exports = BuyerRoute;