const { Client } = require('@elastic/elasticsearch')
const constants = require("../utils/constants")
const esClient = new Client({
    cloud: {
        id: constants.ES_CLOUD_ID,
    },
    auth: {
        username: constants.ES_CLOUD_USERNAME,
        password: constants.ES_CLOUD_PASSWORD
    }
})

module.exports = esClient;