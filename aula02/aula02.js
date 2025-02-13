// Definição da classe TicketManager, que gerencia eventos e participantes
class TicketManager {
    // Construtor da classe, inicializa as propriedades
    constructor(basePrice = 0.15) {
        // Array para armazenar os eventos
        this.events = [];
        // Preço base que será adicionado ao preço de cada evento
        this.basePrice = basePrice;
    }

    // Método para retornar a lista de eventos
    getEvents() {
        return this.events;
    }

    // Método para adicionar um novo evento
    addEvent({ nome, lugar, preco, capacidade = 50, data = new Date() }) {
        // Cria um objeto evento com as propriedades fornecidas
        const evento = {
            id: this.events.length + 1, // Gera um ID único para o evento
            nome, // Nome do evento
            lugar, // Local do evento
            preco: preco + this.basePrice, // Preço do evento com o acréscimo do preço base
            capacidade, // Capacidade máxima de participantes (valor padrão é 50)
            data, // Data do evento (valor padrão é a data atual)
            participants: [] // Lista de participantes (inicialmente vazia)
        };
        // Adiciona o evento ao array de eventos
        this.events.push(evento);
        // Retorna o evento criado
        return evento;
    }

    // Método para adicionar um usuário a um evento
    addUser(eventID, userID) {
        // Procura o evento com o ID correspondente
        const event = this.events.find(e => e.id === eventID);
        // Se o evento não for encontrado, lança um erro
        if (!event) {
            throw new Error("Evento não encontrado");
        }
        // Verifica se o usuário já está na lista de participantes
        if (event.participants.includes(userID)) {
            throw new Error("Usuário já cadastrado neste evento");
        }
        // Adiciona o usuário à lista de participantes do evento
        event.participants.push(userID);
        // Retorna true para indicar que o usuário foi adicionado com sucesso
        return true;
    }

    // Método para criar uma nova versão de um evento em uma nova cidade e data
    putEventoEnGira(eventID, novaCidade, novaData) {
        // Procura o índice do evento original no array de eventos
        const eventoOriginal = this.events.find(e => e.id === eventID);
        // Se o evento não for encontrado, lança um erro
        if (!eventoOriginal) {
            throw new Error("Evento não encontrado");
        }
        // Cria um novo evento com base no evento original
        const novoEvento = {
            ...eventoOriginal, // Copia todas as propriedades do evento original
            id: this.events.length + 1, // Gera um novo ID único
            lugar: novaCidade, // Define a nova cidade
            data: novaData, // Define a nova data
            participants: [] // Reinicia a lista de participantes
        };
        // Adiciona o novo evento ao array de eventos
        this.events.push(novoEvento);
        // Retorna o novo evento criado
        return novoEvento;
    }
}

// Cria uma instância do TicketManager
const manager = new TicketManager();

// Adiciona um novo evento chamado "Lollapalooza"
const evento = manager.addEvent({
    nome: "Lollapalooza",
    lugar: "São Paulo",
    preco: 50
});

// Adiciona um usuário com ID "user123" ao evento com ID 1
manager.addUser(1, "user123");

// Cria uma nova versão do evento com ID 1, mudando a cidade para "SP" e a data para 31/12/2024
const novoEvento = manager.putEventoEnGira(1, "SP", new Date("2024-12-31"));