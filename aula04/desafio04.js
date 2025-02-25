const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } else {
            this.products = [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }

    addProduct(product) {
        const newProduct = {
            id: this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1,
            ...product
        };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new Error('Product not found');
        }
        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
        this.saveProducts();
        return this.products[productIndex];
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new Error('Product not found');
        }
        this.products.splice(productIndex, 1);
        this.saveProducts();
    }
}

// Exemplo de uso:
const manager = new ProductManager('products.json');

// Adicionar um produto
manager.addProduct({
    title: 'Produto 1',
    description: 'Descrição do Produto 1',
    price: 100,
    thumbnail: 'caminho/da/imagem1.jpg',
    code: 'P001',
    stock: 10
});

// Obter todos os produtos
console.log(manager.getProducts());

// Obter um produto por ID
console.log(manager.getProductById(1));

// Atualizar um produto
manager.updateProduct(1, { price: 150 });

// Deletar um produto
manager.deleteProduct(1);