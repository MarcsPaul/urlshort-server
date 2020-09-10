const elasticsearchService = require("../elasticsearchServices/elasticsearchServices");
const constants = require("../utils/constants")

module.exports.createuser = async(usernameFromSignUpRequest, passwordFromSignUpRequest) => {
    try {
        let userData = {
            username: usernameFromSignUpRequest,
            password: passwordFromSignUpRequest
        }
        let esBody = {
            index: constants.AUTH_INDEX,
            body: userData
        }
        let esResponse = await elasticsearchService.index(esBody);
        let responseBody = esResponse.body;
        console.log(JSON.stringify(responseBody, null, 2))
        if (responseBody.result == "created") {
            return userData; //userdata is returned because elasticsearch response dosent have useful data for the UI

        }
    } catch (error) {
        throw error;
    }
};

// sample resposne :
// {
//     "_index": constants.AUTH_INDEX,
//     "_type": constants.ELASTICSEARCH_DOC_TYPE_FEILD,
//     "_id": "Z3vReXQBXlYS4py1cJnn",
//     "_version": 1,
//     "result": "created",
//     "forced_refresh": true,
//     "_shards": {
//         "total": 2,
//         "successful": 2,
//         "failed": 0
//     },
//     "_seq_no": 16,
//     "_primary_term": 1
// }




module.exports.login = async(usernameFromLoginRequest, passwordFromLoginRequest) => {
    try {
        console.log(usernameFromLoginRequest)
        let loginQuery = {
            "query": {
                "term": {
                    "username.keyword": {
                        "value": usernameFromLoginRequest
                    }
                }
            }
        }
        console.log(JSON.stringify(loginQuery, null, 2))
        let esResponse = await elasticsearchService.query(constants.AUTH_INDEX, constants.ELASTICSEARCH_DOC_TYPE_FEILD, loginQuery);
        let responseBody = esResponse.body;
        console.log(JSON.stringify(responseBody.hits.hits[0], null, 2))
        if (responseBody.hits.hits.length == 1) {
            let userdata = responseBody.hits.hits[0][constants.ELASTICSEARCH_SOURCE_FEILD];
            if ((userdata.username == usernameFromLoginRequest) && (userdata.password == passwordFromLoginRequest)) {
                return userdata.username;
            } else {
                throw new Error("The username or password does not match. Login Failed !!");
            }
        } else {
            throw new Error("Found multiple or no users with this username. Login failed !! Please contact website admin.");
        }

    } catch (error) {
        throw error;
    }
};