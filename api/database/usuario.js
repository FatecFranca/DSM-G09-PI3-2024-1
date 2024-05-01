const { ObjectID } = require('mongodb');
const User = require('../models/usuario');

async function upsertUser(user) {
    try {
        const existingUserEmail = await userCollection.findOne({ email: user.email });
        const existingUserCPF = await userCollection.findOne({ cpf: user.cpf });

        if (existingUserCPF || existingUserEmail) {
            const filter = { _id: existingUserCPF._id };
            const update = {
                $set: {
                    nome: user.nome,
                    cpf: user.cpf,
                    data_nascimento: user.data_nascimento,
                    municipio: user.municipio,
                    uf: user.uf,
                    telefone: user.telefone,
                    email: user.email,
                    senha: user.senha,
                    bio: user.bio,
                    deleted: user.deleted,
                },
            };
            const result = await userCollection.updateOne(filter, update);
            return result;
        } else {
            const result = await userCollection.insertOne(user);
            return result;
        }
    } catch (error) {
        console.error('Erro ao upsert usuário:', error);
        throw error;
    }
}

async function getUserByID(id) {
    try {
        const user = await userCollection.findOne({ _id: new ObjectID(id) });
        return user;
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 26) {
            return null;
        }
        console.error('Erro ao buscar usuário pelo ID:', error);
        throw error;
    }
}


module.exports = {
    upsertUser,
    getUserByID,
};
