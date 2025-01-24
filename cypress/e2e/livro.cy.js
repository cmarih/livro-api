describe('/livros POST', () => {

  it('Cadastrar Novo Livro', () => {

    const livro = {
      "titulo": "Nánia",
      "autor": "Paulo Coelho",
      "editora": "HarperOne",
      "anoPublicacao": 1988,
      "numeroPaginas": 208
    };


    cy.getlivros().then((response) => {

      if (response.status == 404 || response.body.length === 0) { //Caso não encontre o livro

        //cadastrar livro
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

          cy.screenshot('Cadastrar-novo-livro')
          
      } else {
        //Verificar se o livro já consta na base
        const livroEncontrado = response.body.find(
          (livroExistente) => livroExistente.titulo.toLowerCase() === livro.titulo.toLowerCase()
        )

        if (livroEncontrado){
          //Se o livro tiver cadastro, informa mensagem de duplicidade
          cy.postLivro(livro).then((response) => {
            expect(response.status).to.eql(409)
            expect(response.body.erro).to.eql('Titulo do livro já consta cadastro em  nossa base!')
          })
          cy.screenshot('Livro-duplicado')
        } else {
          //cadastrar livro
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

        cy.screenshot('Cadastrar-novo-livro')
        }
      }
      
    })
      

          
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

    cy.screenshot('Campos-obrigatorios-ausentes')
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

        cy.screenshot('Listar-livros-cadastrados')
      })
  })
})

describe('/livrosId GET', () => {

  it('Deve retornar os detalhes de um determinado livro pelo ID', () => {

    const livroId = '6792f922d2f1d494e4dc7c5e';

    cy.getlivrosId(livroId).then(response => {
      // Verifica se o status é 404
      if (response.status === 404) {
        cy.log('Não há livros cadastrados na base.');

        cy.screenshot('Livro-sem-cadastro')

        return; // Interrompe o teste
      }

      expect(response.status).to.eql(200) // Valida que o status da resposta é 200
      expect(response.body).to.be.an('object') // Verifica se o corpo da resposta é um objeto


      expect(response.body._id).to.eql(livroId) // Valida se o ID do livro está correto

      // Exibindo os livros no console do Cypress
      cy.log(`Livro encontrado: ${JSON.stringify(response.body, null, 2)}`)

      cy.screenshot('Livro-busca-id')

    })
  })

})

describe('/deletelivroId DELETE', () => {

  
  it('Deve remover um livro especifico selecionado pelo titulo', () => {

    cy.getlivros().then((response) => { // Validar se existem livros na base
      expect(response.status).to.eq(200); // Verifica se a resposta foi bem-sucedida

      const livroTitulo = "Nánia" //Informa o titulo do livro

      // Verificar se existe livros na base
      if (response.body.length === 0) {
        cy.log('Não há registros de livros cadastrados na base.');

        cy.screenshot('Sem-livro-cadastrado')

        return;
      }
      
      // Filtrar o livro desejado pelo título
      const livroEncontrado = response.body.find(
        (livro) => livro.titulo?.toLowerCase().trim().includes(livroTitulo.toLowerCase().trim())
      )

      //Validar se o livro foi encontrado
      if (!livroEncontrado) {

        cy.log(`Livro "${livroTitulo}" não encontrado`)

        cy.screenshot('Titulo-livro-nao-encontrado')

      }  else {
        
      cy.deletelivroId(livroEncontrado._id).then((res) => { // excluir o livro
        // Validações da exclusão
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq('Livro removido com sucesso');
      })
        cy.screenshot('Livro-removido')
      }

    })
  })
})