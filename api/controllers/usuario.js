const Usuario = require('../models/usuario');


async function createUser(req, res) {
    const user = req.body;

    try {
        const newUser = new Usuario(user);
        const savedUser = await newUser.save();

        console.info('Usuário criado com sucesso!');
        res.status(201).json(savedUser);
    } catch (error) {
        if (error.name === 'ValidationError') {
            if (error.errors.cpf || error.errors.email) {
                console.error('Usuário com este Email ou CPF já existe');
                return res.status(422).json({ error: 'Usuário com este Email ou CPF já existe' });
            }
        }
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
        const user = await Usuario.findById(userID);
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
    const updatedData = req.body;

    if (!userID) {
        return res.status(400).json({ error: 'ID do usuário não fornecido' });
    }

    try {
        let existingUser = await Usuario.findById(userID);
        if (!existingUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        if (req.method === 'DELETE') {
            existingUser.deleted = true;
        } else {
            existingUser = Object.assign(existingUser, { ...updatedData });
        }

        const updatedUser = await existingUser.save();
        res.status(200).json(updatedUser);
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
