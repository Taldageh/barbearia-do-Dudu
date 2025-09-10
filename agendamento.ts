import * as fs from 'fs';
import * as path from 'path';
import * as readlineSync from 'readline-sync';

type Agendamento = {
  nome: string;
  horario: string; // Ex: "14:00"
};

const arquivoAgendamentos = path.join(__dirname, 'agendamentos.json');

function carregarAgendamentos(): Agendamento[] {
  if (!fs.existsSync(arquivoAgendamentos)) {
    return [];
  }
  const dados = fs.readFileSync(arquivoAgendamentos, 'utf-8');
  return JSON.parse(dados);
}

function salvarAgendamentos(agendamentos: Agendamento[]) {
  fs.writeFileSync(arquivoAgendamentos, JSON.stringify(agendamentos, null, 2));
}

function horarioDisponivel(agendamentos: Agendamento[], horario: string): boolean {
  return !agendamentos.some(a => a.horario === horario);
}

function horarioValido(horario: string): boolean {
  // Valida formato HH:mm (00:00 a 23:59)
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return regex.test(horario);
}

function main() {
  const agendamentos = carregarAgendamentos();

  const nome = readlineSync.question('Digite seu nome: ');

  let horario: string;
  while (true) {
    horario = readlineSync.question('Digite a hora desejada (ex: 14:00): ');

    if (!horarioValido(horario)) {
      console.log('⛔ Horário inválido! Use o formato HH:mm, por exemplo 14:30.');
      continue; // volta no início do while pra tentar de novo
    }

    if (!horarioDisponivel(agendamentos, horario)) {
      console.log(`⚠️  Horário ${horario} não está disponível. Tente outro.`);
      continue; // tenta novamente
    }

    break; // horário válido e disponível, sai do loop
  }

  agendamentos.push({ nome, horario });
  salvarAgendamentos(agendamentos);

  console.log(`✅ Agendamento confirmado para ${nome} às ${horario}`);
}

main();
