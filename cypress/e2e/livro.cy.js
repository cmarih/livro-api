describe('/livros POST', () => {
  
  it('Cadastrar Novo Livro', () => {

    const livro = {
      "titulo": "Lara Cross",
      "autor": "Paulo Co233elho",
      "editora": "Harper23423One",
      "anoPublicacao": 3488,
      "numeroPaginas": 238
    };

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Formata o timestamp

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

        cy.screenshot(`Cadastro/Cadastrar-novo-livro-${timestamp}+1`)

      } else {
        //Verificar se o livro já consta na base
        const livroEncontrado = response.body.find(
          (livroExistente) => livroExistente.titulo.toLowerCase() === livro.titulo.toLowerCase()
        )

        if (livroEncontrado) {
          //Se o livro tiver cadastro, informa mensagem de duplicidade
          cy.postLivro(livro).then((response) => {
            expect(response.status).to.eql(409)
            expect(response.body.erro).to.eql('Titulo do livro já consta cadastro em  nossa base!')
          })
          cy.screenshot(`Cadastro/Livro-duplicado-${timestamp}`)

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

          cy.screenshot(`Cadastro/Cadastrar-novo-livro-${timestamp}`)
        }
      }

    })



  })
})

it('Não permitir cadastrar livro com campos ausentes', () => {

  const livro = {
    "titulo": "O Alquimista"
  };

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Formata o timestamp

  cy.postLivro(livro)
    .then(response => {
      expect(response.status).to.eql(400)
      expect(response.body.erro).to.eql('Todos os campos são obrigatórios')
    })

  cy.screenshot(`Cadastro/Campos-obrigatorios-ausentes-${timestamp}`)
})

describe('/livros GET', () => {
  it('deve listar todos os livros cadastrados', () => {

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Formata o timestamp

    cy.getlivros()
      .then(response => {
        expect(response.status).to.eql(200)
        expect(response.body).to.be.an('array');

        // Exibindo os livros no console do Cypress
        response.body.forEach((livro, index) => {
          console.log(`Livro ${index + 1}:`, livro);
          cy.log(`Livro ${index + 1}: ${JSON.stringify(livro)}`);
        })

        cy.screenshot(`consulta/Listar-livros-cadastrados-${timestamp}`)
      })
  })
})

describe('/livrosId GET', () => {

  it('Deve retornar os detalhes de um determinado livro pelo ID', () => {

    const livroId = "6793b23e6ef3608664c203cb";

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Formata o timestamp

    cy.getlivrosId(livroId).then(response => {
      // Verifica se o status é 404
      if (response.status === 404 || response.body.length === 0) {
        cy.log('Não há livros cadastrados na base.');

        cy.screenshot(`Consulta/Livro-sem-cadastro-${timestamp}`)

        //return; // Interrompe o teste
      } else {
        expect(response.status).to.eql(200) // Valida que o status da resposta é 200
        expect(response.body).to.be.an('object') // Verifica se o corpo da resposta é um objeto


        expect(response.body._id).to.eql(livroId) // Valida se o ID do livro está correto

        // Exibindo os livros no console do Cypress
        cy.log(`Livro encontrado: ${JSON.stringify(response.body, null, 2)}`)

        cy.screenshot(`Consulta/Livro-busca-id-${timestamp}`)
      }

    })
  })

})

describe('/deletelivroId DELETE', () => {


  it('Deve remover um livro especifico selecionado pelo titulo', () => {

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Formata o timestamp

    cy.getlivros().then((response) => { // Validar se existem livros na base
      expect(response.status).to.eq(200); // Verifica se a resposta foi bem-sucedida

      const livroTitulo = "Lara Cross" //Informa o titulo do livro

      // Verificar se existe livros na base
      if (response.body.length === 0) {
        cy.log('Não há registros de livros cadastrados na base.');

        cy.screenshot(`Exclusão/Sem-livro-cadastrado-${timestamp}`)

        return;
      }

      // Filtrar o livro desejado pelo título
      const livroEncontrado = response.body.find(
        (livro) => livro.titulo?.toLowerCase().trim().includes(livroTitulo.toLowerCase().trim())
      )

      //Validar se o livro foi encontrado
      if (!livroEncontrado) {

        cy.log(`Livro "${livroTitulo}" não encontrado`)

        cy.screenshot(`Exclusão/Titulo-livro-nao-encontrado-${timestamp}`)

      } else {

        cy.deletelivroId(livroEncontrado._id).then((res) => { // excluir o livro
          // Validações da exclusão
          expect(res.status).to.eq(200);
          expect(res.body.message).to.eq('Livro removido com sucesso');
        })
        cy.screenshot(`Exclusão/Livro-removido-${timestamp}`)
      }

    })
  })
})