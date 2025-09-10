"use strict";
// Modo estrito do JS

// As funções abaixo (__createBinding, __setModuleDefault, __importStar) são helpers gerados pelo compilador TypeScript
// para permitir a importação dos módulos com compatibilidade entre CommonJS e ES Modules.

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    // Função que cria uma ligação entre objetos para importar propriedades
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    // Fallback para ambientes sem Object.create
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));

var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    // Define a propriedade default de um módulo
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});

var __importStar = (this && this.__importStar) || (function () {
    // Função para importar tudo de um módulo
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) 
            if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();

Object.defineProperty(exports, "__esModule", { value: true });
// Marca o módulo como ES Module para interoperabilidade

// Importa os módulos 'fs' e 'path' usando a função __importStar
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));

// 2. Array com os dados diretamente no código
const pessoas = [
    { nome: 'Maria', idade: 30, email: 'maria@email.com' },
    { nome: 'João', idade: 25, email: 'joao@email.com' },
    { nome: 'Ana', idade: 28, email: 'ana@email.com' }
];

// 3. Gera os cabeçalhos automaticamente a partir das chaves do objeto
const cabecalhos = Object.keys(pessoas[0]); 
// Pega as chaves do primeiro objeto, ou seja: ['nome', 'idade', 'email']

// 4. Gera as linhas do CSV
const linhas = [
    cabecalhos.join(','), // Gera a primeira linha com os nomes dos campos separados por vírgula: "nome,idade,email"
    ...pessoas.map(p => `${p.nome},${p.idade},${p.email}`) 
    // Mapeia cada objeto para uma string CSV: "Maria,30,maria@email.com" etc.
];

// 5. Junta tudo em uma única string com quebras de linha
const conteudoCSV = linhas.join('\n'); 
// Junta o cabeçalho e as linhas de dados, separados por nova linha

// 6. Define o caminho onde o arquivo será salvo
const caminhoArquivo = path.join(__dirname, 'dados.csv');
// Gera o caminho completo para salvar o arquivo 'dados.csv' na mesma pasta do script

// 7. Escreve o arquivo no disco
fs.writeFileSync(caminhoArquivo, conteudoCSV, 'utf-8');
// Salva o conteúdo CSV no arquivo no disco, codificado em UTF-8

// Mensagem de sucesso
console.log('✅ Arquivo CSV gerado com sucesso em:', caminhoArquivo);

//# sourceMappingURL=gerarCsv.js.map
// Referência para o source map (usado para depuração)
