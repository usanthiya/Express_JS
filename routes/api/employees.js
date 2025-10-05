const express = require('express');
const router = express.Router();

data={};
data.employees= require('../../data/employees.json');

router.route('/all').get((req,res)=>{
    res.json(data.employees)
})

router.route('/:id').get((req,res)=>{
    res.json({"id": req.params.id})
})

router.route('/create').post(async (req,res)=>{
    res.json({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName
    })
})

router.route('/update').put((req,res)=>{
    res.json({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName
    })
})

router.route('/delete').delete((req,res)=>{
    res.json({
        "id": req.body.id,
    })
})

module.exports= router;