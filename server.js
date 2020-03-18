const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const multer = require('multer');

fs = require('fs-extra')
app.use(bodyParser.urlencoded({extended: true}))

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

app.listen(3000, () => {
  console.log('listening on 3000')
})

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

// upload single file
app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)
})
