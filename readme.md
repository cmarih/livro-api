# Objetivo 📚
Com o auxilio do chat GPT, construiu-se uma API de cadastro de livros. Utilizando o Node.js e o framework mongoose para persistir dados no mongoDB, o framework express para desenvolver a API.

## Pré-requisitos:

- Node.js: preferencialmente na versão 20.x LTS, para garantir compatibilidade e suporte de longo prazo 
- Visual Studio Code
- Extensão do postman no VS Code para validação da API

## Dependências

No diretório da raiz da API, precisa instalar/iniciar as dependências abaixo:
- *npm init -y*

- *npm install express mongoose*

## Prompt:

Crie uma API RESTful em Node.js para um sistema de cadastro de livros. A API deve incluir as seguintes funcionalidades:

1. **Cadastro de livros**: Permita que os usuários cadastrem livros informando título, autor, editora, ano de publicação e número de páginas. **Todos os campos são obrigatórios.**
2. **Listagem de livros**: Implemente um endpoint para listar todos os livros cadastrados, retornando todas as informações dos livros.
3. **Consulta de livro por ID**: Crie um endpoint que permita consultar um livro específico usando seu ID.
4. **Remoção de livro**: Implemente um endpoint para deletar um livro do sistema utilizando seu ID.
5. **Banco de Dados**: Utilize o MongoDB como banco de dados.

**Requisitos técnicos:**

- Utilize Express.js para gerenciar as rotas da API.
- Use Mongoose para a modelagem dos dados e integração com o MongoDB.
- Inclua tratamento de erros e validações adequadas para todos os endpoints.
- Adicione comentários no código para explicar as principais partes da implementação.

# Cypress

- Instalar o Cypress como dependência de desenvolvimento no mesmo diretório do código fonte do projeto: 

```bash
npm i cypress -D
```

- Após a intalação, iniciar a interface do Cypress com o comando: 

```bash
npx cypress open
```

- Instalação da biblioteca do npm, para exibir os resultados das requisições da API no front-end (navegador do electron), importante para etapa de implementação dos testes automatizados. 
- Plugin Cypress pelo npm:[cypress-plugin-api](https://www.npmjs.com/package/cypress-plugin-api) 

- Para instalar como uma dependência de desenvolvimento: 

```bash
npm i cypress-plugin-api -D
```

Importe o plugin para seu *cypress/support/e2e.js*: 

```bash
import 'cypress-plugin-api' -D
```


- Instalação da biblioteca do **MongoDB**, para controle dos dados da API: [cypress-mongodb](https://www.npmjs.com/package/cypress-mongodb) 

- Para instalar como uma dependência de desenvolvimento: 

```bash
npm i cypress-mongodb -D
```

Nesse projeto foi implementado uma função dropCollection para tratar as massas de dados (Excluir-las e evitar sujeira na base de dados).

## Subindo a API 🚀

- Clonar o repositório e instalar as dependências: 
 ```bash
npm install
```

- Para executar a API execute: 
 ```bash
npm start
```
# Implementando o projeto 📚
Para implementar o projeto, foi mapeado possíveis cenários de testes para serem automatizados.

## **Cenário 1: Cadastro de livro com todos os campos válidos**
- ### Resultado:
  <img src="https://github.com/cmarih/livro-api/blob/master/testes-evidencias/cadastrar-livro.png" alt="Print teste cadastrar novo livro">

## **Cenário 2: Tentativa de cadastro com campos ausentes - Teste Negativo**
- ### Resultado:
  <img src="https://github.com/cmarih/livro-api/blob/master/testes-evidencias/campo-obrigatorio.png" alt="Print teste cadastrar sem campo obrigatorio">

## **Cenário 3: Tentativa de cadastro com campos duplicados - Teste Negativo**
- ### Resultado:
  <img src="https://github.com/cmarih/livro-api/blob/master/testes-evidencias/livro-duplicado.png" alt="Print teste cadastrar livro existente na base">

## **Cenário 4: Listar todos os livros cadastrados**
- ### Resultado:
  <img src="https://github.com/cmarih/livro-api/blob/master/testes-evidencias/todos-livros.png" alt="Print teste consulta lista de livros cadastrados">

## **Cenário 5: Consultar um livro existente pelo ID**
- ### Resultado:
  <img src="https://github.com/cmarih/livro-api/blob/master/testes-evidencias/livro_id.png" alt="Print teste consulta por Id do livro">

## **Cenário 6: Remover um livro existente pelo ID**

REMOVER PRINTS DE TELA E TRABALHAR EM CIMA DE RELATÓRIOS GERADOS PELO CYPRESS, COMO EVIDENCIA DE TESTE
- Implementar:
Cenário de exclusão de livros
gerar a massa de dados de forma automática
POSSIBILIDADE DE UTILIZAÇÃO DO METODO PUT/ATUALIZAÇÃO NA API

*Projeto feito assistindo as aulas do canal QA Papito:  [QA Papito Aula 1](https://www.youtube.com/watch?v=FI65wNBKQkE&ab_channel=QAPapito) & [QA Papito Aula 2](https://www.youtube.com/watch?v=JyDQTO-DXMQ&ab_channel=QAPapito)*