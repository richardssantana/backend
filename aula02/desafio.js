// Definição da classe ProductManager para gerenciar produtos
class ProductManager {
    // Construtor da classe, inicializa o array de produtos
    constructor() {
        this.products = []; // Array para armazenar os produtos
        this.nextId = 1; // Contador para gerar IDs únicos
    }

    // Método para adicionar um novo produto
    addProduct(title, description, price, thumbnail, code, stock) {
        // Valida se todos os campos foram fornecidos
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos os campos são obrigatórios.");
            return;
        }

        // Valida se o código do produto já existe
        if (this.products.some(product => product.code === code)) {
            console.error("Código do produto já existe.");
            return;
        }

        // Cria um novo produto com um ID único
        const product = {
            id: this.nextId++, // Atribui o ID e incrementa o contador
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        // Adiciona o produto ao array de produtos
        this.products.push(product);
        console.log("Produto adicionado com sucesso:", product);
    }

    // Método para obter todos os produtos
    getProducts() {
        return this.products;
    }

    // Método para buscar um produto pelo ID
    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error("Produto não encontrado.");
        }
    }
}

// Exemplo de uso da classe ProductManager
const manager = new ProductManager();

// Adicionando produtos
manager.addProduct("Produto 1", "Descrição do Produto 1", 100, "imagem1.jpg", "P001", 10);
manager.addProduct("Produto 2", "Descrição do Produto 2", 200, "imagem2.jpg", "P002", 20);

// Obtendo todos os produtos
console.log("Todos os produtos:", manager.getProducts());

// Buscando um produto pelo ID
console.log("Produto com ID 1:", manager.getProductById(1));
console.log("Produto com ID 3:", manager.getProductById(3)); // Este deve retornar "Produto não encontrado"