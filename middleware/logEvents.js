const { format } = require('date-fns');
const { v4: uuid} = require('uuid');
const path = require('path');
const fs= require('fs');
const fsPromise= require('fs').promises;

const logEvents = async (message, fileName)=>{
  const dateTime = `${format(new Date(), 'yyyy-MM-dd hh:mm:ss')}`;
  const logItem =`${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem)
  try{
     if(!fs.existsSync(path.join(__dirname,'..','logs'))){
       await fsPromise.mkdir(path.join(__dirname,'..','logs'))
     }
     await fsPromise.appendFile(path.join(__dirname,'..','logs',fileName),logItem);
  }catch(err){
    console.error(err);
  }
}

const logger = (req, res, next)=>{
  logEvents(`${req.method}\t ${req.headers.origin}\t${req.path}`, 'reqLog.txt');
  next();
}

module.exports= {logEvents, logger};