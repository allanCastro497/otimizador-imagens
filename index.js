const express = require('express')
// const optimal = require('./optimal')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const tinify = require('tinify')
tinify.key = '6SspjL8wdml95kmkwMdfXwcNFhk93WRL'
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
app.get('/otimiza', (req, res) => {
	let lista = listarArquivos('uploads')
	function listarArquivos(dir, arq) {
		if (!arq) {
			arq = []
		}

		let listaArq = fs.readdirSync(dir)
		for(let i in listaArq) {
			let stat = fs.statSync(dir + '/' + listaArq[i])
			
			if(stat.isDirectory()) {
				listarArquivos(dir + '/' + listaArq[i], arq)
			} else {
				arq.push(dir + '/' + listaArq[i])
			}
		}
		return arq
		console.log(listaArq)
	}
	lista.forEach(img => {
		console.log(img)
		const source = tinify.fromFile(img);
		source.toFile(img);
	})

	res.redirect('/')
})



app.listen(3000, () => console.log('Servidor rodando...'))