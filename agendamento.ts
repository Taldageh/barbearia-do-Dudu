import * as fs from 'fs';
// Importa o módulo 'fs' para manipular arquivos

import * as path from 'path';
// Importa o módulo 'path' para lidar com caminhos de arquivos

import * as readlineSync from 'readline-sync';
// Importa o módulo para ler entrada do usuário no terminal de forma síncrona

// Define um tipo para representar um agendamento
type Agendamento = {
  nome: string;     // Nome da pessoa que agendou
  horario: string;  // Horário no formato "HH:mm", ex: "14:00"
};

// Define o caminho do arquivo JSON que armazenará os agendamentos
const arquivoAgendamentos = path.join(__dirname, 'agendamentos.json');

// Função que carrega os agendamentos salvos no arquivo
function carregarAgendamentos(): Agendamento[] {
  // Se o arquivo não existir, retorna um array vazio (nenhum agendamento)
  if (!fs.existsSync(arquivoAgendamentos)) {
    return [];
  }
  // Lê o conteúdo do arquivo como string
  const dados = fs.readFileSync(arquivoAgendamentos, 'utf-8');
  // Converte a string JSON para array de agendamentos e retorna
  return JSON.parse(dados);
}

// Função que salva os agendamentos no arquivo JSON, sobrescrevendo o conteúdo
function salvarAgendamentos(agendamentos: Agendamento[]) {
  fs.writeFileSync(arquivoAgendamentos, JSON.stringify(agendamentos, null, 2));
  // JSON.stringify com null, 2 => formata o JSON com indentação para facilitar leitura
}

// Função que verifica se um horário está disponível (não agendado ainda)
function horarioDisponivel(agendamentos: Agendamento[], horario: string): boolean {
  // Retorna true se não existir nenhum agendamento com o mesmo horário
  return !agendamentos.some(a => a.horario === horario);
}

// Função que valida o formato do horário: deve ser HH:mm entre 00:00 e 23:59
function horarioValido(horario: string): boolean {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return regex.test(horario);
}

// Função principal que executa o fluxo do programa
function main() {
  // Carrega os agendamentos existentes
  const agendamentos = carregarAgendamentos();

  // Pergunta o nome do usuário
  const nome = readlineSync.question('Digite seu nome: ');

  let horario: string;
  // Loop para garantir que o horário digitado seja válido e esteja disponível
  while (true) {
    // Pergunta o horário desejado
    horario = readlineSync.question('Digite a hora desejada (ex: 14:00): ');

    // Verifica se o horário tem formato válido
    if (!horarioValido(horario)) {
      console.log('⛔ Horário inválido! Use o formato HH:mm, por exemplo 14:30.');
      continue; // volta ao começo do loop para tentar de novo
    }

    // Verifica se o horário já está ocupado
    if (!horarioDisponivel(agendamentos, horario)) {
      console.log(`⚠️  Horário ${horario} não está disponível. Tente outro.`);
      continue; // tenta novamente
    }

    // Horário válido e disponível, sai do loop
    break;
  }

  // Adiciona o novo agendamento na lista
  agendamentos.push({ nome, horario });

  // Salva a lista atualizada no arquivo JSON
  salvarAgendamentos(agendamentos);

  // Mensagem de confirmação
  console.log(`✅ Agendamento confirmado para ${nome} às ${horario}`);
}

// Chama a função principal para iniciar o programa
main();
