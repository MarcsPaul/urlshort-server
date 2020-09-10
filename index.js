var express = require('express');
const responseHandler = require("./utils/responseHandler")
const constants = require("./utils/constants")
const authHandler = require("./middleware/userOperations")
const urlOperations = require("./middleware/urlOperations")
var cors = require('cors')
var app = express();
app.use(express.json());
app.use(cors())

app.post('/login', async function(req, res) {

    try {
        let usernameFromLoginRequest = req.body.username;
        let passwordFromLoginRequest = req.body.password;
        console.log(usernameFromLoginRequest + ":" + passwordFromLoginRequest)
        let loggedInUser = await authHandler.login(usernameFromLoginRequest, passwordFromLoginRequest)
        res.send(responseHandler.success(constants.LOGIN_SUCCESS, loggedInUser));
    } catch (error) {
        console.log(error)
        res.send(responseHandler.error(constants.LOGIN_FAILURE, error));
    }

});
app.post('/createuser', async function(req, res) {

    try {
        let usernameFromSignUpRequest = req.body.username;
        let passwordFromSignUpRequest = req.body.password;
        console.log(usernameFromSignUpRequest + ":" + passwordFromSignUpRequest)
        let newUserData = await authHandler.createuser(usernameFromSignUpRequest, passwordFromSignUpRequest)
        res.send(responseHandler.success(constants.SIGNUP_SUCCESS, newUserData));
    } catch (error) {
        console.log(error)
        res.send(responseHandler.error(constants.SIGNUP_FAILURE, error));
    }

});
app.get('/getAllUrls', async function(req, res) {
    try {
        let listOfAllUrlData = await urlOperations.getAllUrls()
        res.send(responseHandler.success(constants.GET_ALL_URLS_SUCCESS, listOfAllUrlData));
    } catch (error) {
        console.log(error)
        res.send(responseHandler.error(constants.GET_ALL_URLS_FAILURE, error));
    }
});
app.post('/generateShortUrl', async function(req, res) {
    try {
        let generatedShortUrl = await urlOperations.generateShortUrl(req.body.expandedUrl)
        let generatedShortUrlData = { shortenedUrl: generatedShortUrl }
        res.send(responseHandler.success(constants.GENERATE_SHORT_URL_SUCCESS, generatedShortUrlData));
    } catch (error) {
        console.log(error)
        res.send(responseHandler.error(constants.GENERATE_SHORT_URL_FAILURE, error));
    }
});
app.post('/getExpandedUrl', async function(req, res) {
    try {
        let generatedExpandedUrl = await urlOperations.getExpandedUrl(req.body.shortenedUrl)
        let generatedExpandedUrlData = { expandedUrl: generatedExpandedUrl }
        res.send(responseHandler.success(constants.GENERATE_EXPANDED_URL_SUCCESS, generatedExpandedUrlData));
    } catch (error) {
        console.log(error)
        res.send(responseHandler.error(constants.GENERATE_EXPANDED_URL_FAILURE, error));
    }
});
app.delete('/deleteUrl/:urlId', async function(req, res) {
    try {
        let urlIdFromRequest = req.params.urlId
        await urlOperations.deleteUrlRecord(urlIdFromRequest)
        urlDeleteResponse = {
            deletedUrlId: urlIdFromRequest
        }
        res.send(responseHandler.success(constants.DELETE_URL_SUCCESS, urlDeleteResponse));
    } catch (error) {
        console.log(error)
        res.send(responseHandler.error(constants.DELETE_URL_FAILURE, error));
    }
});


var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});