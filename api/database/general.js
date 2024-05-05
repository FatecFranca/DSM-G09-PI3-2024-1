

async function exists(collection, attribute, value) {
    try {
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

async function upsert(collection, entity) {
    console.log("gcofgr", entity)
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
    upsert
};
