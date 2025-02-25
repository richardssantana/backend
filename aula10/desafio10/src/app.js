const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const ProductManager = require('./ProductManager');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const productManager = new ProductManager('./products.json');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});

app.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('addProduct', async (product) => {
        await productManager.addProduct(product);
        const products = await productManager.getProducts();
        io.emit('updateProducts', products);
    });

    socket.on('deleteProduct', async (pid) => {
        await productManager.deleteProduct(pid);
        const products = await productManager.getProducts();
        io.emit('updateProducts', products);
    });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});