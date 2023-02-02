const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJSON = function(products){
	fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8');
};

const decimalComma = n => n.toString().replace('.', ",");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products.ejs', {
			products,
			toThousand,
		});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let productByID = products.find(producto => producto.id == req.params.id );
		let priceSale = productByID.price * (100 - productByID.discount) / 100;
		
		res.render('detail.ejs', {
			productByID,
			priceSale,
			toThousand,
			decimalComma,
		});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form.ejs');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let lastID = products[products.length - 1].id;
		let newProduct = {
			id: lastID + 1,
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			image: 'default-image.png',
		};
		products.push(newProduct);
		writeJSON(products);
		res.redirect('/products/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('product-edit-form.ejs');
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		/* 
			buscar elemento
			borrar elemento
			guardar db
		*/
	}
};

module.exports = controller;