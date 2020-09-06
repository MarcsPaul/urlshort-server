const elasticsearchService = require("../services/elasticsearchServices/elasticsearchServices");
const shortid = require('shortid');


// "urlId": 0,
// "creationDate": "2020-09-06T15:57:31.481Z",
// "shortenedUrl": "google.com",
// "expandedUrl": "google.com"



module.exports.generateExpandedUrl = async(shortenedUrl) => {
    try {
        console.log(shortenedUrl)
        let urlSections = shortenedUrl.split("/")
        let urlID = urlSections[1]
        let loginQuery = {
            "query": {
                "term": {
                    "urlId.keyword": {
                        "value": urlID
                    }
                }
            }
        }
        console.log(loginQuery)
        let esResponse = await elasticsearchService.query("urls", "_doc", loginQuery);
        console.log(JSON.stringify(esResponse.body.hits.hits[0], null, 2))
        let urldata = esResponse.body.hits.hits[0]["_source"];
        return urldata.expandedUrl;
    } catch (error) {
        throw error;
    }
};
module.exports.generateShortUrl = async expandedUrl => {
    try {
        const urlCode = shortid.generate();
        let shortenedUrl = "binarythread.com/" + urlCode
        let esBody = {
            index: "urls",
            body: {
                urlId: urlCode,
                expandedUrl: expandedUrl,
                shortenedUrl: shortenedUrl,
                creationDate: new Date().toISOString()
            }
        }
        console.log(JSON.stringify(esBody, null, 2))
        let esResponse = await elasticsearchService.index(esBody);
        console.log(JSON.stringify(esResponse, null, 2))
        console.log(JSON.stringify(shortenedUrl, null, 2))
        return shortenedUrl;
    } catch (error) {
        throw error;
    }
};

module.exports.getAllUrls = async() => {
    try {
        let loginQuery = {
            "query": {
                "match_all": {}
            }
        }
        console.log(loginQuery)
        let esResponse = await elasticsearchService.query("urls", "_doc", loginQuery);
        let allUrlsEsDocHitsList = esResponse.body.hits.hits
        console.log(JSON.stringify(allUrlsEsDocHitsList, null, 2))
        let urlData = []
        allUrlsEsDocHitsList.map(function(allUrlsEsDocHit, index) {
            let allUrlsEsDocHitSource = allUrlsEsDocHit["_source"]
            let singleUrlData = {
                    urlId: allUrlsEsDocHitSource.urlId,
                    creationDate: allUrlsEsDocHitSource.creationDate,
                    shortenedUrl: allUrlsEsDocHitSource.shortenedUrl,
                    expandedUrl: allUrlsEsDocHitSource.expandedUrl
                }
                // console.log(singleUrlData)
            urlData.push(singleUrlData);
        })
        console.log(urlData)

        return urlData;
    } catch (error) {
        throw error;
    }
};

module.exports.deleteUrlRecord = async(urlId) => {
    try {
        console.log(urlId)
        let loginQuery = {
            "query": {
                "term": {
                    "urlId.keyword": {
                        "value": urlId
                    }
                }
            }
        }
        console.log(loginQuery)
        let esResponse = await elasticsearchService.deleteByQuery("urls", "_doc", loginQuery);
        console.log(JSON.stringify(esResponse, null, 2))
            // return urldata.expandedUrl;
    } catch (error) {
        throw error;
    }
};