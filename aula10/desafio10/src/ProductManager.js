const fs = require('fs').promises;

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getProducts() {
        const data = await fs.readFile(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    async addProduct(product) {
        const products = await this.getProducts();
        products.push(product);
        await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
    }

    async deleteProduct(pid) {
        let products = await this.getProducts();
        products = products.filter(p => p.id !== pid);
        await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
    }
}

module.exports = ProductManager;