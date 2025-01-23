describe('/livros POST', () => {

  /*before(() => {
    cy.dropCollection('livros', { database: 'test', failSilently: 'true' }).then(result => {
      cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
    });
  })*/

  it('Cadastrar Novo Livro', () => {

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
})

describe('/livros GET', () => {
  it('deve listar todos os livros cadastrados', () => {

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

describe('/livrosId GET', () => {

  it('Deve retornar os detalhes de um determiado livro pelo ID', () => {

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

