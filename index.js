var express = require('express');
const responseHandler = require("./packResponse")
const constants = require("./constants")
const bodyParser = require("body-parser");
var app = express();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.post('/login', jsonParser, function(req, res) {

    let username = req.body.username;
    let password = req.body.password;
    if (username == "username" && password == "password") {
        res.send(responseHandler.success("Login Success !", req.body.username));
    } else {

    }
});
app.post('/getUrlData', jsonParser, function(req, res) {
    let urlList = ["binarythread.com/jkdfunfkl"]
    let expandedUrl = ""

    // urlList.map(function(index, url) {
    //     if (url == req.body.shortUrl) {
    //         expandedUrl = "regex101.com"
    //     }
    // })

    res.send(responseHandler.success("getUrlData Success !", "regex101.com"));
});
app.get('/getAllUrls', jsonParser, function(req, res) {
    let urlList = ["google.com", "facebook.com", "github.com", "npmjs.com", "techcrunch.com", "tutorialspoint.com"]
    let urlData = []
    urlList.map(function(url, index) {
        let singleUrlData = {
            urlId: index,
            creationDate: new Date().toISOString(),
            shortenedUrl: url,
            expandedUrl: url
        }
        console.log(urlData)
        urlData.push(singleUrlData);
    })

    res.send(responseHandler.success("getAllUrls Success !", urlData));
});
app.post('/generateShortUrl', jsonParser, function(req, res) {

    if (req.body.expandedUrl == "google.com")

        res.send(responseHandler.success("generateShortUrl Success !", "regex101.com"));
});
app.post('/generateExpandedUrl', jsonParser, function(req, res) {

    if (req.body.shortenedUrl == "regex101.com")

        res.send(responseHandler.success("generateExpandedUrl Success !", "google.com"));
});
app.delete('/deleteUrl/:urlId', function(req, res) {

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

app.listen(3000);