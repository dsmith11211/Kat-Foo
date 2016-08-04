var express = require('express');
var app = express();
var moment = require('moment');
var cameraModule = require('./camera-controller');
var servoModule = require('./servo-controller');

var feedLimit = 10;
var dailyFeedLog = [];

var feedLimitError = {
    disableButton: true,
    message: 'Sorry, too many feeds for today',
    feedLimit: 0
}

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/view'));

function resetFeedLimit() {
    feedLimit = 10;
}

function checkFeedLimit() {
    return feedLimit > 0;
}

function decrementFeedLimit() {
    if (checkFeedLimit()) {
        feedLimit--;
    }
}


//Reset the feed Limit at midnight
setTimeout(
    resetFeedLimit,
    moment("24:00:00", "hh:mm:ss").diff(moment(), 'milliseconds')
);

app.get('/', function(req, res) {
    res.render('index.html');
});

//This route is just to get a test image without an actual feed
app.get('/snapshot', function(req, res) {
    cameraModule.capture().then(function(data) {
        console.log('Received camera feed', data);
        res.status(200).send(data);
    }, function(err) {
        console.log('Error capturing video stream: ', err);
    });
});

app.get('/get-feed-count', function(req, res){
    if(checkFeedLimit()) {
        res.status(200).send({feedLimit : feedLimit});
    } else {
        res.status(500).send(feedLimitError);
    }
})

//The main route to check/update feed limit,feed and upload picture, send text.
app.get("/feed", function(req, res) {

    if (checkFeedLimit()) {

        servoModule.feed()
            .then(function(data) {
                decrementFeedLimit();
                console.log('Feeding complete: ', data, feedLimit);
            })
            .then(function(data) {

                cameraModule.capture().then(function(data) {
                    data.feedLimit = feedLimit;
                    console.log('Received camera feed', data);
                    res.status(200).send(data);
                }, function(err) {
                    console.log('Error capturing video stream: ', err);
                });

            }, function(err) {
                res.status(500).send(err);
                console.log('Feeding error: ', err);
            });

    } else {
        res.status(500).send(feedLimitError);
        console.log('Over the daily feed limit of: ', feedLimit);
    }

    //Check if we are over feed limit
    //move servo to feed
    // on success, take a picture and go through picture flow.
    // on success or failure, send a text. Post to instagram?
    // on failure, do something

});

app.listen(3000);
console.log('Listening on port 3000');