const express= require('express');
const router = express.Router();
const path= require('path');

// Define a GET route for the root URL '/' that sends a plain text response
router.get('/',(req, res)=>{
  res.send("Hello World!");
})
 
// Define a GET route for '/index.html' that sends the index.html file located in the 'views' folder
router.get('/index.html',(req, res)=>{
  res.sendFile(path.join(__dirname,'..','views','index.html'));
})

// Define a GET route for '/new-page.html' that sends the new-page.html file located in the 'views' folder
router.get('/new-page.html',(req, res)=>{
  res.sendFile(path.join(__dirname,'..','views','new-page.html'));
})

router.get('/old-page.html',(req,res)=>{
  res.redirect('new-page.html')
})

// First middleware logs the request then calls next(), second handler sends the final response.
router.get('/hello.html',(req, res, next)=>{
    console.log("Trying to load hello.html page");
    next(); // Call next() to pass control to the next middleware function
},(req,res)=>{
    res.send("Hi, Hello");
})

// Executes 'one' → 'two' → 'three' in sequence for the /chain route.
/**
 * 
one runs → logs "one", then calls next()
two runs → logs "two", then calls next()
three runs → logs "three", then sends 'Finished!'
 */
const one = (rq, res, next)=>{
  console.log("one");
  next();
}

const two = (rq, res, next)=>{
  console.log("two");
  next();
}

const three = (rq, res)=>{
  console.log("three");
  res.send('Finished!')
}

router.get('/chain',[one, two, three]);

module.exports= router;