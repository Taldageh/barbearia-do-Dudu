import * as fs from 'fs';
import * as path from 'path';

// 1. Defina a estrutura dos dados (tipo)
type Pessoa = {
  nome: string;
  idade: number;
  email: string;
};

// 2. Array com os dados diretamente no código
const pessoas: Pessoa[] = [
  { nome: 'Maria', idade: 30, email: 'maria@email.com' },
  { nome: 'João', idade: 25, email: 'joao@email.com' },
  { nome: 'Ana', idade: 28, email: 'ana@email.com' }
];

// 3. Gera os cabeçalhos automaticamente a partir das chaves do objeto
const cabecalhos = Object.keys(pessoas[0]);

// 4. Gera as linhas do CSV
const linhas = [
  cabecalhos.join(','), // cabeçalho
  ...pessoas.map(p => `${p.nome},${p.idade},${p.email}`)
];

// 5. Junta tudo em uma única string com quebras de linha
const conteudoCSV = linhas.join('\n');

// 6. Define o caminho onde o arquivo será salvo
const caminhoArquivo = path.join(__dirname, 'dados.csv');

// 7. Escreve o arquivo no disco
fs.writeFileSync(caminhoArquivo, conteudoCSV, 'utf-8');

console.log('✅ Arquivo CSV gerado com sucesso em:', caminhoArquivo);