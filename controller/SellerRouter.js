const express = require("express");
const mongoose = require("mongoose");
const SellerSchema = require('../model/SellerSchema');
const SellerRoute = express.Router();

const multer=require('multer');
const path=require('path');
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({
    storage:storage
})

SellerRoute.post("/add-property",upload.single('file'), (req, res) => {
    const { id, location, budget ,propertyType} = req.body;
    console.log(req.body);
    console.log(path.resolve(req.file.filename));
    const newProperty = { location: location, budget: budget,propertyType:propertyType,image:req.file.filename};

    SellerSchema.findOneAndUpdate(
        { _id: id },
        { $push: { property: newProperty } },
        { new: true },
        (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Internal Server Error" });
            } else if (!data) {
                return res.status(404).json({ error: "User not found" });
            } else {
                res.json(data);
            }
        }
    );
});
SellerRoute.post("/search", (req, res) => {
    const { email, password } = req.body;
    SellerSchema.findOne({ email: email, password: password }, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (!data) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(data);
    });
});
SellerRoute.get("/list-property/:id",(req,res)=>{
    SellerSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    });
});

SellerRoute.put("/delete-property/:userid/:propertyid",(req,res)=>{
    SellerSchema.findById(mongoose.Types.ObjectId(req.params.userid),(err,data)=>{
        if(err){
            return res.status(500).json({ error: err.message });
        } else {
            const propertyIndex = data.property.findIndex(prop => prop._id.toString() === req.params.propertyid);
            if (propertyIndex !== -1) {
                data.property.splice(propertyIndex, 1);
                data.save((error, updatedData) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                    } else {
                        res.json(updatedData);
                    }
                });
            } else {
                return res.status(404).json({ error: "Property not found" });
            }
        }
    });
})
SellerRoute.post("/emailcheck", (req, res) => {
    const { email} = req.body;
    SellerSchema.findOne({ email: email}, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (!data) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(data);
    });
});
SellerRoute.post("/create-user",(req,res)=>{
    SellerSchema.create(req.body,
        (err,data)=>{
            if(err){
                return err;
            }else{
                return res.json(data);
            }
        })
})
SellerRoute.put("/update",(req,res)=>{
    const {email,password}=req.body;
    SellerSchema.findOneAndUpdate(
        { email: email }, 
        { password: password }, 
        { new: true }, 
        (err, data) => {
            if(err){
                return res.status(500).json({ error: err.message });
            } else if(!data){
                return res.json("Email not Found");
            }
            return res.json(data);
        }
    );
});
SellerRoute.get("/",(req,res)=>{
   SellerSchema.find((err,data)=>{
    if(err){
        return err;
    }else{
        return res.json(data);
    }
   })
})
SellerRoute.post("/filter",(req,res)=>{
    SellerSchema.find({"property.location":req.body.location,"budget":{$gte:req.body.minbudget},"budget":{$lte:req.body.maxbudget}},(err,data)=>{
        if(err){
            return err;
        }else{
            return res.json(data);
        }
    })
})
module.exports = SellerRoute;
