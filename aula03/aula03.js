// Definindo a função de multiplicação que retorna uma promessa
function multiplicar(a, b) {
    return new Promise((resolve, reject) => {
        // Verifica se algum dos fatores é negativo
        if (a < 0 || b < 0) {
            // Se for negativo, rejeita a promessa com uma mensagem de erro
            reject("A calculadora não aceita valores negativos.");
        } else {
            // Calcula o produto
            const produto = a * b;
            // Verifica se o produto é negativo
            if (produto < 0) {
                // Se o produto for negativo, rejeita a promessa
                reject("A calculadora só pode retornar valores positivos.");
            } else {
                // Se tudo estiver certo, resolve a promessa com o produto
                resolve(produto);
            }
        }
    });
}

// Definindo a função de divisão que retorna uma promessa
function dividir(a, b) {
    return new Promise((resolve, reject) => {
        // Verifica se o divisor é zero
        if (b === 0) {
            // Se for zero, rejeita a promessa com uma mensagem de erro
            reject("Não é possível dividir por zero.");
        } else {
            // Calcula a divisão
            const resultado = a / b;
            // Resolve a promessa com o resultado
            resolve(resultado);
        }
    });
}

// Definindo uma função assíncrona para realizar os cálculos
async function calculos() {
    try {
        // Usando await para esperar o resultado da multiplicação
        const resultadoMultiplicacao = await multiplicar(5, 4);
        // Exibe o resultado da multiplicação
        console.log("Resultado da multiplicação:", resultadoMultiplicacao);

        // Usando await para esperar o resultado da divisão
        const resultadoDivisao = await dividir(10, 2);
        // Exibe o resultado da divisão
        console.log("Resultado da divisão:", resultadoDivisao);

        // Testando um caso de erro na multiplicação
        const resultadoErro = await multiplicar(-5, 4);
        // Esta linha não será executada porque o erro será capturado
        console.log("Resultado da multiplicação com erro:", resultadoErro);
    } catch (erro) {
        // Capturando e exibindo qualquer erro que ocorra
        console.log("Erro:", erro);
    }
}

// Chamando a função assíncrona para executar os cálculos
calculos();