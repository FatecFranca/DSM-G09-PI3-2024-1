const { ObjectId } = require('mongodb');
const Register = require('../models/register');
const {
    retrieve,
    upsert,
    retrieveAll
} = require('../database/general');

const REGISTER_COLLECTION = Register;

async function createRegister(req, res) {
    const register = req.body;

    register.data_criacao = new Date();
    register.usuario = new ObjectId(register.usuario)

    try {
        const result = await upsert(REGISTER_COLLECTION, register);
        res.status(201).json(result);
    } catch (error) {

        console.error('Erro ao criar novo registro:', error);
        res.status(500).json({ error: 'Erro ao criar novo registro' });
    }
};

async function getRegisterById(req, res) {
    const registerID = req.params.registerID;

    if (!registerID) {
        return res.status(400).json({
            error: "ID do registro não fornecido"
        });
    }

    try {
        const register = await retrieve(REGISTER_COLLECTION, "_id", new ObjectId(registerID))
        if (!register) {
            return res.status(404).json({
                error: "Register não encontrado"
            });
        }
        return res.status(200).json(register);
    } catch (error) {

    }
}

async function updateRegister(req, res) {
    const registerID = req.params.registerID;

    if (!registerID) {
        return res.status(400).json({
            error: "ID do registro não fornecido"
        });
    }

    const updatedRegister = req.body;

    try {
        let existingRegister = await retrieve(REGISTER_COLLECTION, "_id", new ObjectId(registerID));
        if (!existingRegister) {
            return res.status(404).json({
                error: "Register não encontrado"
            });
        }
        if (req.method === 'DELETE') {
            existingRegister.deleted = true;
        } else {
            existingRegister.data_atualizacao = new Date();
            existingRegister.titulo = updatedRegister.titulo;
            existingRegister.descricao = updatedRegister.descricao;
            existingRegister.url_imagem = updatedRegister.url_imagem;
            existingRegister.local = updatedRegister.local;
            existingRegister.valor_gasto = updatedRegister.valor_gasto;
        }
        const result = await upsert(REGISTER_COLLECTION, existingRegister);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao atualizar registro:', error);
        res.status(500).json({ error: 'Erro ao atualizar registro' });
    }
};

async function getRegistersByUser(req, res) {
    const userID = req.params.userID;

    if (!userID) {
        return res.status(400).json({
            error: "ID do usuário não fornecido"
        });
    }
    try {
        const registers = await retrieveAll(REGISTER_COLLECTION, { usuario: new ObjectId(userID) });
        res.status(200).json(registers);
    } catch (error) {
        console.error('Erro ao buscar registros do usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar registros do usuário' });
    }
}

module.exports = {
    createRegister,
    getRegisterById,
    updateRegister,
    getRegistersByUser
}