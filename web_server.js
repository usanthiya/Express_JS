const express = require('express');
const app = express();
const path = require('path');
const { logger }= require('./middleware/logEvents');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const root = require('./routes/root');
const subdir = require('./routes/subdir');
const PORT = 3500;

// Built in Middleware
// Parse form data → parse JSON body → serve static files from /public
/**
  - app.use(express.urlencoded({ extended: false }))
     Middleware that parses URL-encoded form data (like what comes from an HTML <form> with method="POST").
     option:
      extended: false → uses the Node.js built-in querystring library (simpler, doesn’t support nested objects).
      extended: true → uses the qs library (allows rich objects, like user[name]=Santhiya).
  - app.use(express.json())
     Middleware that parses incoming JSON request bodies.
  - app.use(express.static(path.join(__dirname, 'public')))
     Serves static files (HTML, CSS, JS, images, etc.) directly from the public folder.
     app.use(path, middleware) mounts that static file middleware on a URL path prefix.
     If you omit / or /subdir,like this 
       app.use(express.static(path.join(__dirname, 'public')));
       then it behaves the same as app.use('/', ...) — i.e., mounted at the root /.

 */
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use('/',express.static(path.join(__dirname, 'public')))
app.use('/subdir',express.static(path.join(__dirname, 'public')))

//Routing middleware
app.use('/', root)
app.use('/subdir',subdir);

// Custom middleware that logs request details with timestamp + UUID into logs/reqLog.txt
app.use(logger); 

// Third party middleware: ex: cors, morgan, Cookie-aparser, ..
//Allow all origin
// app.use(cors());

//or allow only specific origin
app.use(cors({
  origin: 'http://localhost:3500'
}))

/***
 *here only requests from the whitelist will work; all others will throw a CORS error.
 callback(error, allow) is used to:
   - callback(null, true) → allow the request.
   - callback(new Error('Not allowed by CORS')) → block the request.
 */
const whiteList = ['https://www.website.com', 'http://127.0.0.1:3500'];
const corsOptions ={
  origin: (origin, callback)=>{
    console.log("Request Origin:", origin);  
    if(whiteList.includes(origin)){
      callback(null, true)
    }else{
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}
// app.use(cors(corsOptions))

app.use((req,res)=>{
  res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})

app.use(errorHandler)

// Start the server
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})