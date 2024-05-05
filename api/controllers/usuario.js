const { hashPassword } = require('./utils');
const { ObjectId } = require('mongodb');
const Usuario = require('../models/usuario');
const {
    exists,
    retrieve,
    upsert
} = require('../database/general');

const USER_COLLECTION = Usuario;


async function createUser(req, res) {
    const user = req.body;

    try {

        const existingEmail = await exists(USER_COLLECTION, "email", user.email)
        const existingCpf = await exists(USER_COLLECTION, "cpf", user.cpf)

        if (existingEmail || existingCpf) {
            console.error('Usuário com este Email ou CPF já existe');
            res.status(422).json({ error: 'Usuário com este Email ou CPF já existe' });
        } else {

            const hashedPassword = await hashPassword(user.senha);
            user.senha = hashedPassword;

            const result = await upsert(USER_COLLECTION, user);
            res.status(201).json(result);
        }
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
        const user = await retrieve(USER_COLLECTION, "_id",new ObjectId(userID));
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
        let existingUser = await retrieve(USER_COLLECTION, "_id", new ObjectId(userID));
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

        const result = await upsert(USER_COLLECTION, existingUser);
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
