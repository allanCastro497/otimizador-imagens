const express = require('express')
const router = express.Router()
const fs = require('fs')
const tinify = require('tinify')
tinify.key = '6SspjL8wdml95kmkwMdfXwcNFhk93WRL'

router.get('/otimiza', (req, res) => {
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
	}
	let lista = listarArquivos('uploads')
	lista.forEach(img => {
		console.log(img)
		const source = tinify.fromFile(img);
		source.toFile(img);
	})

	res.redirect('/')
})

module.exports = router