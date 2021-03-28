const express = require('express')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const optimal = require('./otimiza/optimal')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const storage = multer.diskStorage({
	destination:  function (req, file, cb) {
		cb(null, "uploads/")
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname)
	}
})

const upload = multer({storage})
app.get('/', (req, res) => {
	res.render('index')
})

app.post('/upload', upload.array('img'), (req, res) => {
	res.render('upload')

})

app.use('/', optimal)


app.listen(3000, () => console.log('Servidor rodando...'))