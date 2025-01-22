# Exemplos de cenários de testes que podem ser considerados para Automação

## **Cenário 1: Cadastro de livro com todos os campos válidos**
- ### Comando costumizado:
```javascript
Cypress.Commands.add('postLivro', (livro) => {
    cy.api({
        url: 'http://localhost:5000/api/livros',
        method: 'POST',
        body: livro,
        failOnStatusCode: false
    }).then(response => {
        return response
    })
})
```
- ### Teste:
```javascript

it.only('Cadastrar Novo Livro', () => {

    const livro = {
      "titulo": "Nárnia 1",
      "autor": "Nanda Gonçalves",
      "editora": "Martin Claret",
      "anoPublicacao": 1347,
      "numeroPaginas": 406
    };

    cy.postLivro(livro)
      .then(response => {
        expect(response.status).to.eql(201)

        expect(response.body.titulo).to.eql(livro.titulo)
        expect(response.body.autor).to.eql(livro.autor)
        expect(response.body.editora).to.eql(livro.editora)
        expect(response.body.anoPublicacao).to.eql(livro.anoPublicacao)
        expect(response.body.numeroPaginas).to.eql(livro.numeroPaginas)
        expect(response.body._id).to.not.be.empty
      })

  })

```
- ### Resultado:
  <img src="testes-evidencias/cadastrar-livro.png" alt="Print teste cadastrar novo livro">
## **Cenário 2: Tentativa de cadastro com campos ausentes - Teste Negativo**
- ### Teste:
```javascript
it('Não permitir cadastrar livro com campos ausentes', () => {

    const livro = {
      "titulo": "O Alquimista"
    };

    cy.postLivro(livro)
      .then(response => {
        expect(response.status).to.eql(400)
        expect(response.body.erro).to.eql('Todos os campos são obrigatórios')
      })
  })
``` 
- ### Resultado:
  <img src="/livro-api/testes-evidencias/campo-obrigatorio.png" alt="Print teste cadastrar sem campo obrigatorio">

## **Cenário 3: Tentativa de cadastro com campos duplicados - Teste Negativo**

- ### Teste:
```javascript
it('Não cadastrar livro duplicado', () => {

    const livro = {
      "titulo": "O Alquimista",
      "autor": "Paulo Coelho",
      "editora": "HarperOne",
      "anoPublicacao": 1988,
      "numeroPaginas": 208
    };

    cy.postLivro(livro)
      .then(response => {
        expect(response.status).to.eql(201)

      })

    cy.postLivro(livro)
      .then(response => {
        expect(response.status).to.eql(409)
        expect(response.body.erro).to.eql('Titulo do livro já consta cadastro em  nossa base!')
      })
  })
```

- ### Resultado:
  <img src="testes-evidencias/livro-duplicado.png" alt="Print teste cadastrar livro existente na base">

## **Cenário 4: Listar todos os livros cadastrados**
- ### Comando costumizado:
```javascript
Cypress.Commands.add('getlivros', () => {
    cy.api({
        url: 'http://localhost:5000/api/livros',
        method: 'GET',
        failOnStatusCode: false
    }).then(response => {
        return response
    })
})
```
- ### Teste:
```javascript
describe('/livros GET', () => {
  it.only('deve listar todos os livros cadastrados', () => {

    cy.getlivros()
      .then(response => {
        expect(response.status).to.eql(200)
        expect(response.body).to.be.an('array');

        // Exibindo os livros no console do Cypress
        response.body.forEach((livro, index) => {
          console.log(`Livro ${index + 1}:`, livro);
          cy.log(`Livro ${index + 1}: ${JSON.stringify(livro)}`);
        })

      })
  })
})
```
- ### Resultado:
  <img src="testes-evidencias/todos-livros.png" alt="Print teste consulta lista de livros cadastrados">

## **Cenário 5: Consultar um livro existente pelo ID**
- ### Comando costumizado:
```javascript
Cypress.Commands.add('getlivrosId', (id) => {
    cy.api({
        url: `http://localhost:5000/api/livros/${id}`,
        method: 'GET',
        failOnStatusCode: false
    }).then(response => {
              
        return response
    })
})
```
- ### Teste:
```javascript
describe('/livrosId GET', () => {

  it.only('Deve retornar os detalhes de um determiado livro pelo ID', () => {

    const livroId = '67904448f447521c76b936ba';

    cy.getlivrosId(livroId).then(response => {
        expect(response.status).to.eql(200) // Valida que o status da resposta é 200
        expect(response.body).to.be.an('object') // Verifica se o corpo da resposta é um objeto
        

        expect(response.body._id).to.eql(livroId) // Valida se o ID do livro está correto

        // Exibindo os livros no console do Cypress
        cy.log(`Livro encontrado: ${JSON.stringify(response.body, null, 2)}`)

      })
  })
})

```
- ### Resultado:
  <img src="testes-evidencias/livro_id.png" alt="Print teste consulta por Id do livro">

## **Cenário 6: Remover um livro existente pelo ID**