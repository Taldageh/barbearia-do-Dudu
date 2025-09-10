"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
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
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=gerarCsv.js.map