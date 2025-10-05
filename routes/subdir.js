const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'))
})

router.get('/test', (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'))
})

module.exports= router