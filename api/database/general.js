

async function exists(collection, attribute, value) {
    try {
        console.info("Verificando se existe", collection.modelName, attribute = attribute, value = value)
        const query = {};
        query[attribute] = value;
        const result = await collection.findOne(query, { projection: { _id: 1 } });
        return Boolean(result);
    } catch (error) {
        console.error('Erro ao verificar se entidade existe', error);
        throw error;
    }
}

async function retrieve(collection, attribute, value) {
    try {
        console.info("Buscando um", collection.modelName, attribute, value)
        const query = {};
        query[attribute] = value;
        const result = await collection.findOne(query);
        return result
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 26) {
            return null;
        }
        console.error('Erro ao obter entidade', error);
        throw error;
    }
}

async function retrieveAll(collection, attribute = null, value = null) {
    try {
        console.info("Buscando vários", collection.modelName, attribute, value)
        let query = {}
        if (attribute && value) {
            query[attribute] = value;
        }
        const result = await collection.find(query).toArray();
        return result;
    } catch (error) {
        console.error('Erro ao obter documentos da coleção com filtro', error);
        throw error;
    }
}

async function upsert(collection, entity) {
    console.info("Criando/alterando", collection.modelName, entity)
    try {
        if (entity._id) {
            result = await collection.updateOne(
                { _id: entity._id },
                { $set: entity }
            )
        } else {
            result = await collection.insertOne(entity)
        }
        return result;
    } catch (error) {
        console.error('Erro ao criar/alterar:', error);
        throw error;
    }
}

module.exports = {
    exists,
    retrieve,
    upsert,
    retrieveAll
};
