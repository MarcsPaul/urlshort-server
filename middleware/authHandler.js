const elasticsearchService = require("../services/elasticsearchServices/elasticsearchServices");
const { response } = require("express");

module.exports.createuser = async jobBody => {
    try {
        let esBody = {
            index: "auth",
            body: {
                username: "user@binarythread.com",
                password: "password"
            }
        }
        let esResponse = await elasticsearchService.index(esBody);
        console.log(JSON.stringify(esResponse, null, 2))
        return esResponse;
    } catch (error) {
        throw error;
    }
};


module.exports.login = async(username, password) => {
    try {
        console.log(username)
        let loginQuery = {
            "query": {
                "term": {
                    "username.keyword": {
                        "value": username
                    }
                }
            }
        }
        console.log(loginQuery)
        let esResponse = await elasticsearchService.query("auth", "_doc", loginQuery);
        console.log(JSON.stringify(esResponse.body.hits.hits[0], null, 2))
        let userdata = esResponse.body.hits.hits[0]["_source"];
        return userdata.username;
    } catch (error) {
        throw error;
    }
};