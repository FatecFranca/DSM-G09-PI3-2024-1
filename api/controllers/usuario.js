const { hashPassword } = require('./utils');
const {
    getUserByID,
    upsertUser,
} = require('../database/usuario');

async function createUser(req, res) {
    const user = req.body;

    try {
        
        const hashedPassword = await hashPassword(user.senha);
        user.senha = hashedPassword;

        const result = await upsertUser(user);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
}

async function getUserById(req, res) {
    const userID = req.params.userID;

    if (!userID) {
        return res.status(400).json({ error: 'ID do usuário não fornecido' });
    }

    try {
        const user = await getUserByID(userID);
        if (!user || user.deleted) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
}

async function updateUser(req, res) {
    const userID = req.params.userID;

    if (!userID) {
        return res.status(400).json({ error: 'ID do usuário não fornecido' });
    }

    const updatedUser = req.body;

    try {
        let existingUser = await getUserByID(userID);
        if (!existingUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        if (req.method === 'DELETE') {
            existingUser.deleted = true;
        } else {
            existingUser.nome = updatedUser.nome;
            existingUser.data_nascimento = updatedUser.data_nascimento;
            existingUser.municipio = updatedUser.municipio;
            existingUser.uf = updatedUser.uf;
            existingUser.telefone = updatedUser.telefone;
            existingUser.bio = updatedUser.bio;
        }

        const result = await upsertUser(existingUser);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
}

module.exports = {
    createUser,
    getUserById,
    updateUser,
};
