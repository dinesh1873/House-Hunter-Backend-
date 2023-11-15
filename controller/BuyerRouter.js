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

module.exports = BuyerRoute;