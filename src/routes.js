const express = require('express');
const Livro = require('./models');
const router = express.Router();

// Cadastro de livros
router.post('/livros', async (req, res) => {
    try {
        const { titulo, autor, editora, anoPublicacao, numeroPaginas } = req.body;

        // Verificação se todos os campos foram preenchidos
        if (!titulo || !autor || !editora || !anoPublicacao || !numeroPaginas) {
            return res.status(400)
            .json({ erro: 'Todos os campos são obrigatórios' });
        }

        const duplicado = await Livro.findOne({titulo: titulo})

        if (duplicado) {
            return res.status(409)
            .json({erro: 'Titulo do livro já consta cadastro em  nossa base!'})
        }


        const livro = new Livro({ titulo, autor, editora, anoPublicacao, numeroPaginas });
        await livro.save();
        res.status(201).json(livro);
    } catch (error) {
        res.status(500)
        .json({ error: 'Erro ao cadastrar livro' });
    }
});

// Listagem de livros
router.get('/livros', async (req, res) => {
    try {
        const livros = await Livro.find();

        if (!livros || livros.length === 0) {
            return res.status(200).json([]); // Retorna uma lista vazia se não houver livros
        }

        res.json(livros);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar livros' });
    }
});

// Consulta de livro por ID
router.get('/livros/:id', async (req, res) => {
    try {
        const livro = await Livro.findById(req.params.id);

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }

        res.json(livro);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar livro' });
    }
});

// Remoção de livro
router.delete('/livros/:id', async (req, res) => {
    try {
        const livro = await Livro.findByIdAndDelete(req.params.id);

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        } 
        res.json({ message: 'Livro removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar livro' });
    }
});

module.exports = router;