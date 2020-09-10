const client = require('./elasticsearchClient');


module.exports.index = async args => {
    try {
        args.refresh = true;
        args.type = '_doc';
        let response = await client.index(args);
        return response;
    } catch (error) {
        throw error;
    }
};
module.exports.indexExists = async args => {
    try {
        let indexName = args.indexName;
        let response = await client.indices.exists({
            index: indexName
        });
        return response;
    } catch (error) {
        throw error;
    }
};
module.exports.update = async(index, id, body) => {
    try {
        let response = await client.update({
            index,
            type: '_doc',
            id,
            body
        });

        return response;
    } catch (error) {
        throw error;
    }
};
module.exports.updateByQuery = async(index, type = '_doc', body) => {
    try {
        let response = await client.updateByQuery({
            index,
            type,
            body
        });

        return response;
    } catch (error) {
        throw error;
    }
};
module.exports.deleteByQuery = async(index, type = '_doc', body) => {
    try {
        let response = await client.deleteByQuery({
            index,
            type,
            body
        });

        return response;
    } catch (error) {
        throw error;
    }
};
module.exports.query = async(index, type = '_doc', body) => {
    try {
        let response = await client.search({
            index,
            type,
            body
        });

        return response;
    } catch (error) {
        throw error;
    }
};