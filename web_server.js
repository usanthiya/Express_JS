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

// Start the server
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})