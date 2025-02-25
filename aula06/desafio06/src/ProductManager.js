const fs = require('fs').promises;

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getProducts() {
        const data = await fs.readFile(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    async getProductById(pid) {
        const products = await this.getProducts();
        return products.find(p => p.id === pid);
    }
}

module.exports = ProductManager;