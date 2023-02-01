const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let productsVisited = products.filter(producto => producto.category === 'visited')
		let productsInSale = products.filter(producto => producto.category === 'in-sale')
		//atrib render de metodo res, acepta 1 string y 1 objeto
		res.render('index.ejs', {
			productsVisited,
			productsInSale,
			toThousand
		})
	},
	search: (req, res) => {
		res.render('results.ejs')
	},
};

module.exports = controller;
