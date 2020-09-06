var express = require('express');
const responseHandler = require("./packResponse")
const constants = require("./constants")
const bodyParser = require("body-parser");
const authHandler = require("./middleware/authHandler")
const urlOperations = require("./middleware/urlOperations")
var app = express();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.post('/login', jsonParser, async function(req, res) {

    try {
        let username = req.body.username;
        let password = req.body.password;
        console.log(username)
        console.log(password)

        let loggedInUser = await authHandler.login(username, password)
        if (username == loggedInUser) {
            res.send(responseHandler.success("Login Success !", req.body.username));
        }
    } catch (error) {
        console.log(error)
        res.send(responseHandler.error("Login Failure !", error));
    }

});
app.post('/getUrlData', jsonParser, async function(req, res) {
    let urlData = await urlOperations.getAllUrls()
    res.send(responseHandler.success("getAllUrls Success !", urlData));
});
app.get('/getAllUrls', jsonParser, async function(req, res) {
    let urlData = await urlOperations.getAllUrls()
    res.send(responseHandler.success("getAllUrls Success !", urlData));
});
app.post('/generateShortUrl', jsonParser, async function(req, res) {
    let shortUrl = await urlOperations.generateShortUrl(req.body.expandedUrl)
    res.send(responseHandler.success("generateShortUrl Success !", { shortenedUrl: shortUrl }));
});
app.post('/generateExpandedUrl', jsonParser, async function(req, res) {

    try {
        let shortenedUrl = req.body.shortenedUrl;
        let expandedUrl = await urlOperations.generateExpandedUrl(shortenedUrl)
        res.send(responseHandler.success("Login Success !", expandedUrl));
    } catch (error) {
        console.log(error)
        res.send(responseHandler.error("Login Failure !", error));
    }



    if (req.body.shortenedUrl == "regex101.com")

        res.send(responseHandler.success("generateExpandedUrl Success !", "google.com"));
});
app.delete('/deleteUrl/:urlId', async function(req, res) {

    await urlOperations.deleteUrlRecord(req.params.urlId)



    urlDeleteResponse = {
        deletedUrlId: req.params.urlId,
        deletedUrl: {
            urlId: 0,
            creationDate: "2020-09-05T14:15:34.171Z",
            shortenedUrl: "google.com",
            expandedUrl: "google.com"
        }
    }
    res.send(responseHandler.success("deleteUrl Success !", urlDeleteResponse));
});

// app.listen(3000);

var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});