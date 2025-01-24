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
## Implementando o projeto 📚
Para implementar o projeto, foi mapeado possíveis cenários de testes para serem automatizados. Para captura das evidências dos testes, usamos a biblioteca **mochawesome** junto com o **cy.screenshot** para capturar tela.

### **Cenário: Cadastro de livro com todos os campos válidos**
#### Critérios de Aceitação: 
- O sistema deve retornar o status 201 quando o cadastro for bem-sucedido. 
- Todos os campos obrigatórios devem estar presentes e válidos. 
- O livro deve ser salvo no banco de dados. 

### **Cenário: Tentativa de cadastro com campos duplicados - Teste Negativo**
#### Critérios de Aceitação: 
- O sistema deve retornar o status 409 quando o título do livro constar na base. 
- Deve exibir uma mensagem de erro clara informando que o livro já está cadastrado. 

### **Cenário: Tentativa de cadastro com campos ausentes - Teste Negativo**
#### Critérios de Aceitação: 
- O sistema deve retornar o status 400 quando houver campos obrigatórios ausentes. 
- Deve exibir uma mensagem de erro clara informando que todos os campos são obrigatórios. 


### **Cenário: Listar todos os livros cadastrados**
#### Critérios de Aceitação: 
- O sistema deve retornar o status 200 para a listagem bem-sucedida. 
- Deve retornar uma lista com os detalhes de todos os livros cadastrados. 
- Deve retornar uma lista 'vazia' caso não possua nenhum cadastro na base.

### **Cenário: Consultar um livro existente pelo ID**
#### Critérios de Aceitação: 
- O sistema deve retornar o status 200 para uma consulta bem-sucedida. 
- Deve retornar os detalhes do livro correspondente ao ID informado. 
- Deve retornar uma mensagem indicando, caso o ID não seja encontrado.

### **Cenário: Remover um livro existente pelo ID**
#### Critérios de Aceitação: 
- O sistema deve retornar o status 200 para a remoção bem-sucedida. 
- Deve retornar uma mensagem indicando que o livro foi removido com sucesso. 
- Deve retornar uma mensagem indicando, caso o livro não seja encontrado.

### ** [Relatório de teste:]()**

gerar a massa de dados de forma automática - Verificar

*Projeto feito assistindo as aulas do canal QA Papito:  [QA Papito Aula 1](https://www.youtube.com/watch?v=FI65wNBKQkE&ab_channel=QAPapito) & [QA Papito Aula 2](https://www.youtube.com/watch?v=JyDQTO-DXMQ&ab_channel=QAPapito)*