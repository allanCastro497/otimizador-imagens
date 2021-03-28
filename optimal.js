
const fs = require('fs')
const tinify = require('tinify')
tinify.key = '6SspjL8wdml95kmkwMdfXwcNFhk93WRL'

//percorre e lista os arquivos do diretorio
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

// let lista = listarArquivos('uploads/')
// console.log(lista)

// lista.forEach(img => {
// 	console.log(img)
// 	const source = tinify.fromFile(img);
// 	source.toFile(img);
// })


// const source = tinify.fromFile('public/img/antes.jpg');
// source.toFile('public/img/optimized.jpg');

module.exports = listarArquivos

