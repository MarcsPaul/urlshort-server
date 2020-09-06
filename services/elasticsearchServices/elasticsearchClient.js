const { Client } = require('@elastic/elasticsearch')
const esClient = new Client({
    cloud: {
        id: 'urlshort:dXMtZWFzdC0xLmF3cy5mb3VuZC5pbyRjMWU3ZjNmOWUwYzY0ZDgzODIyZjM1ZTQyZGFkYjcwNSRmNDkxOWQwMTVkOGQ0NWRjYjc4MmNjMzJhOTA4NmI5ZA==',
    },
    auth: {
        username: 'elastic',
        password: 'IB0D1dP5j2BH1Z2tLEZ19bdt'
    }
})

module.exports = esClient;