const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express();

  fs = require('fs-extra')
  server.use(bodyParser.urlencoded({extended: true}))

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });

  var upload = multer({ storage: storage })

        // server.listen(3000, () => {
        //   console.log('listening on 3000')
        // })

  // server.get('/a', (req, res) => {
  //   return app.render(req, res, '/a', req.query)
  // })
  
  server.get('/', (req,res) => {
    //res.sendFile(__dirname + '/index.html');
    return app.render(req, res, '/index', req.query)
  });

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  // server.get('/',function(req,res){
  //   res.write(ReactDOMServer.renderToString(<myPage />))
  // });
  
  // upload single file
  server.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(file)
  });


  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })

});




