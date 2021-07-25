const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    } 
    res.send(categoryList);
})

router.get('/:id', async (req, res) =>{
    const category = await Category.findById(req.params.id);
 
     if(!category) {
         res.status(500).json({message :'the category given by ID is not finded'})
     } 
     res.send(category);
 })

 router.put('/:id',async (req,res)=>{
    let category = await Category.findByIdAndUpdate(req.params.id ,{
        name : req.body.name,
        icon : req.body.icon,
        color : req.body.color
    },
    {new :true})

        if(!category)
        return res.status(404).send('the category is indefinied §§')

        res.send(category)
})

router.post('/',async (req,res)=>{
    let category = new Category(
        {
            name : req.body.name,
            icon : req.body.icon,
            color : req.body.color
        })
        category = await category.save();

        if(!category)
        return res.status(404).send('the category is indefinied §§')

        res.send(category)
})

router.delete('/:id',async (req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category){
            return res.status(200).json({success:true ,message :'category is deleded'})
        }
        else{
            return res.status(404).json({success:false ,message :'category is not finded'})
        }
    }).catch((err)=>{
        return res.status(400).json({success :false , message :'something is wrong !!'})
    })
})

module.exports =router;