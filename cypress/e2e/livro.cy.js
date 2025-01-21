describe('/livros POST', () => {

  before(() => {
    cy.dropCollection('livros', { database: 'test', failSilently: 'true' }).then(result => {
      cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
    });
  })



  it('Cadastrar Novo Livro', () => {

    const livro = {
      "titulo": "O Morro dos Ventos Uivantes",
      "autor": "Emily Brontë",
      "editora": "Martin Claret",
      "anoPublicacao": 1847,
      "numeroPaginas": 416
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

