const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager('./products.json');

app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    if (limit) {
        res.json(products.slice(0, parseInt(limit)));
    } else {
        res.json(products);
    }
});

app.get('/products/:pid', async (req, res) => {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});