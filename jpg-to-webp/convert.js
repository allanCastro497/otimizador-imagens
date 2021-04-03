const express = require('express')
const router = express.Router()
// const webp = require('webp-converter')
const sharp = require('sharp')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

// webp.grant_permission()

//configurando multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads-conversion/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

router.get('/converter', (req, res) => {
    res.render('converter/index')
})
router.post('/converter/upload-conversion', upload.array('img'), (req, res) => {
    res.redirect('/converter/upload')
})
router.get('/converter/upload', (req, res) => {
    res.render('converter/upload-webp')
})
router.get('/convert-webp', (req, res) => {
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
				arq.push(listaArq[i])
			}
		}
		return arq
	}
	let lista = listarArquivos('uploads-conversion')
    lista.forEach(arqNome => {
        let nome = path.parse(arqNome).name
        console.log(nome)

        sharp('uploads-conversion/' + nome + '.jpg')
            .rotate()
            .toFile('uploads-conversion/webp/' + nome + '.webp')
            .then( data => console.log(data))
            .catch( err => console.log(err));

        // const result = webp.cwebp(nome + '.jpg', nome + '.webp', '-q 80')
        // result.then((response) => {
        //     console.log(response);
        // });
    })
    console.log(lista)

    res.redirect('/converter')
})

module.exports = router