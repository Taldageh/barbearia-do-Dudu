"use strict"; 
// Habilita o modo estrito do JavaScript para evitar erros comuns

Object.defineProperty(exports, "__esModule", { value: true });
// Marca o módulo como ES Module para interoperabilidade

var fs = require("fs");
// Importa o módulo 'fs' para manipular o sistema de arquivos

var path = require("path");
// Importa o módulo 'path' para manipular caminhos de arquivos

var readlineSync = require("readline-sync");
// Importa o módulo 'readline-sync' para entrada síncrona no terminal

// Define o caminho do arquivo onde os agendamentos serão armazenados
var arquivoAgendamentos = path.join(__dirname, 'agendamentos.json');

// Função que carrega os agendamentos do arquivo JSON
function carregarAgendamentos() {
    // Verifica se o arquivo existe
    if (!fs.existsSync(arquivoAgendamentos)) {
        // Se não existir, retorna um array vazio (nenhum agendamento ainda)
        return [];
    }
    // Lê o conteúdo do arquivo como string
    var dados = fs.readFileSync(arquivoAgendamentos, 'utf-8');
    // Converte a string JSON para objeto JavaScript e retorna
    return JSON.parse(dados);
}

// Função que salva os agendamentos no arquivo JSON
function salvarAgendamentos(agendamentos) {
    // Converte o array de agendamentos para JSON formatado e escreve no arquivo
    fs.writeFileSync(arquivoAgendamentos, JSON.stringify(agendamentos, null, 2));
}

// Função que verifica se o horário solicitado está disponível
function horarioDisponivel(agendamentos, horario) {
    // Retorna verdadeiro se nenhum agendamento já tiver o mesmo horário
    return !agendamentos.some(function (a) { return a.horario === horario; });
}

// Função que valida se o horário está no formato correto HH:mm (ex: 14:30)
function horarioValido(horario) {
    // Expressão regular para validar formato de hora entre 00:00 e 23:59
    var regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(horario); // Retorna verdadeiro se combinar com o padrão
}

// Função principal que executa o programa
function main() {
    // Carrega os agendamentos já existentes
    var agendamentos = carregarAgendamentos();

    // Pergunta o nome do usuário
    var nome = readlineSync.question('Digite seu nome: ');

    var horario;

    // Loop infinito para garantir que o usuário informe um horário válido e disponível
    while (true) {
        // Pergunta o horário desejado
        horario = readlineSync.question('Digite a hora desejada (ex: 14:00): ');

        // Verifica se o horário é válido
        if (!horarioValido(horario)) {
            console.log('⛔ Horário inválido! Use o formato HH:mm, por exemplo 14:30.');
            continue; // Volta ao início do loop para tentar novamente
        }

        // Verifica se o horário está disponível
        if (!horarioDisponivel(agendamentos, horario)) {
            console.log(`⚠️  Horário ${horario} não está disponível. Tente outro.`);
            continue; // Tenta novamente
        }

        // Se chegou aqui, o horário é válido e está disponível, sai do loop
        break;
    }

    // Adiciona o novo agendamento no array
    agendamentos.push({ nome: nome, horario: horario });

    // Salva o array atualizado no arquivo JSON
    salvarAgendamentos(agendamentos);

    // Confirmação para o usuário
    console.log(`✅ Agendamento confirmado para ${nome} às ${horario}`);
}

// Chama a função principal para rodar o programa
main();
