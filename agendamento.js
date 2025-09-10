"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var readlineSync = require("readline-sync");
var arquivoAgendamentos = path.join(__dirname, 'agendamentos.json');
function carregarAgendamentos() {
    if (!fs.existsSync(arquivoAgendamentos)) {
        return [];
    }
    var dados = fs.readFileSync(arquivoAgendamentos, 'utf-8');
    return JSON.parse(dados);
}
function salvarAgendamentos(agendamentos) {
    fs.writeFileSync(arquivoAgendamentos, JSON.stringify(agendamentos, null, 2));
}
function horarioDisponivel(agendamentos, horario) {
    return !agendamentos.some(function (a) { return a.horario === horario; });
}
function horarioValido(horario) {
    // Valida formato HH:mm (00:00 a 23:59)
    var regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(horario);
}
function main() {
    var agendamentos = carregarAgendamentos();
    var nome = readlineSync.question('Digite seu nome: ');
    var horario;
    while (true) {
        horario = readlineSync.question('Digite a hora desejada (ex: 14:00): ');
        if (!horarioValido(horario)) {
            console.log('⛔ Horário inválido! Use o formato HH:mm, por exemplo 14:30.');
            continue; // volta no início do while pra tentar de novo
        }
        if (!horarioDisponivel(agendamentos, horario)) {
            console.log("\u26A0\uFE0F  Hor\u00E1rio ".concat(horario, " n\u00E3o est\u00E1 dispon\u00EDvel. Tente outro."));
            continue; // tenta novamente
        }
        break; // horário válido e disponível, sai do loop
    }
    agendamentos.push({ nome: nome, horario: horario });
    salvarAgendamentos(agendamentos);
    console.log("\u2705 Agendamento confirmado para ".concat(nome, " \u00E0s ").concat(horario));
}
main();
