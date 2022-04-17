
const express = require('express')
const app = express()
const multer = require('multer');
const fs = require('fs');
const res = require('express/lib/response');
const { diskStorage } = require('multer');

app.set('view engine', 'ejs')
app.set('views', 'views')


const fileStorage = diskStorage({
  destination: (req, res, cb) => {
    cb(null, './uploads')
  },
  filename: (req, res, cb) => {
    cb(null, Date.now() + "-" + res.originalname)
  }

});

const upload = multer({ storage: fileStorage })

app.get('/form', (req, res) => {
  res.render('form')
})

app.post('/single', upload.single('file'), (req, res) => {
  console.log(req.file)
  res.send("File uploaded")
})


app.get('/multi', (req, res) => {
  res.render('mForm')
})
app.post('/multiple', upload.array('docs', 3), (req, res) => {

  console.log(req.files)
  res.send("Multiple file added successfully")
})



const port = (process.env.PORT || 1000);
app.listen(port, () => {
  console.log(`Server is listening on PORT ${port}... `)
})