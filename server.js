const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear o corpo da requisição como JSON
app.use(express.json());

// Lista de usuários na memória
let users = [];

// Rota GET /users → Retorna a lista de usuários cadastrados
app.get('/users', (req, res) => {
    res.json(users);
});

// Rota POST /users → Adiciona um novo usuário
app.post('/users', (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ message: "Nome e e-mail são obrigatórios" });
    }

    const newUser = {
        id: users.length + 1,
        nome,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// Rota PUT /users/:id → Atualiza os dados de um usuário pelo ID
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { nome, email } = req.body;

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Atualizando o usuário
    users[userIndex] = { id: userId, nome, email };
    res.json(users[userIndex]);
});

// Rota DELETE /users/:id → Remove um usuário pelo ID
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Remover o usuário
    users.splice(userIndex, 1);
    res.status(204).end(); // No content, apenas remove o usuário
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
