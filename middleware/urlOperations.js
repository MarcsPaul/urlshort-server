const elasticsearchService = require("../elasticsearchServices/elasticsearchServices");
const shortid = require('shortid');
const constants = require('../utils/constants');

module.exports.getExpandedUrl = async(shortenedUrl) => {
    try {
        console.log(shortenedUrl)
        let urlSections = shortenedUrl.split("/")
        let urlID = urlSections[1]
        let getExpandedUrlQuery = {
            "query": {
                "term": {
                    "urlId.keyword": {
                        "value": urlID
                    }
                }
            }
        }
        console.log(getExpandedUrlQuery)
        let esResponse = await elasticsearchService.query(constants.URLS_INDEX, constants.ELASTICSEARCH_DOC_TYPE_FEILD, getExpandedUrlQuery);
        let esResponseBody = esResponse.body
        let expandedUrlData = esResponseBody.hits.hits[0]
        console.log(JSON.stringify(expandedUrlData, null, 2))
        let urldata = expandedUrlData[constants.ELASTICSEARCH_SOURCE_FEILD];
        return urldata.expandedUrl;
    } catch (error) {
        throw error;
    }
};

module.exports.generateShortUrl = async expandedUrl => {
    try {
        const urlCode = shortid.generate();
        let shortenedUrl = constants.DOMAIN_NAME + urlCode
        let esBody = {
            index: constants.URLS_INDEX,
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
        let getAllUrlQuery = {
                "query": {
                    "match_all": {}
                }
            }
            // console.log(getAllUrlQuery)
        let esResponse = await elasticsearchService.query(constants.URLS_INDEX, constants.ELASTICSEARCH_DOC_TYPE_FEILD, getAllUrlQuery);
        let esResponseBody = esResponse.body
        let allUrlsEsDocsList = esResponseBody.hits.hits
        console.log(JSON.stringify(allUrlsEsDocsList, null, 2))
        let listOfAllUrlData = []
        allUrlsEsDocsList.map(function(individualUrlEsDoc) {
                let individualUrlEsDocSource = individualUrlEsDoc[constants.ELASTICSEARCH_SOURCE_FEILD]
                let singleUrlData = {
                        urlId: individualUrlEsDocSource.urlId,
                        creationDate: individualUrlEsDocSource.creationDate,
                        shortenedUrl: individualUrlEsDocSource.shortenedUrl,
                        expandedUrl: individualUrlEsDocSource.expandedUrl
                    }
                    // console.log(singleUrlData)
                listOfAllUrlData.push(singleUrlData);
            })
            // console.log(listOfAllUrlData)
        return listOfAllUrlData;
    } catch (error) {
        throw error;
    }
};

module.exports.deleteUrlRecord = async(urlId) => {
    try {
        console.log(urlId)
        let deleteUrlQuery = {
            "query": {
                "term": {
                    "urlId.keyword": {
                        "value": urlId
                    }
                }
            }
        }
        console.log(deleteUrlQuery)
        let esResponse = await elasticsearchService.deleteByQuery(constants.URLS_INDEX, constants.ELASTICSEARCH_DOC_TYPE_FEILD, deleteUrlQuery);
        console.log(JSON.stringify(esResponse, null, 2))
            // return urldata.expandedUrl;
    } catch (error) {
        throw error;
    }
};