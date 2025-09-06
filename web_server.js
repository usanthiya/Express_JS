const express = require('express');
const app = express();
const path = require('path');
const PORT = 3500;

// Define a GET route for the root URL '/' that sends a plain text response
app.get('/',(req, res)=>{
  res.send("Hello World!");
})

// Define a GET route for '/index.html' that sends the index.html file located in the 'views' folder
app.get('/index.html',(req, res)=>{
  res.sendFile(path.join(__dirname,'views','index.html'));
})

// Define a GET route for '/new-page.html' that sends the new-page.html file located in the 'views' folder
app.get('/new-page.html',(req, res)=>{
  res.sendFile(path.join(__dirname,'views','new-page.html'));
})

app.get('/old-page.html',(req,res)=>{
  res.redirect('new-page.html')
})

// First middleware logs the request then calls next(), second handler sends the final response.
app.get('/hello.html',(req, res, next)=>{
    console.log("Trying to load hello.html page");
    next();
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

app.get('/chain',[one, two, three]);

app.use((req,res)=>{
  res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})

// Start the server
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})