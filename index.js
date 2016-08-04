    // Load the http module to create an http server.
    var http = require('http');
    // var servoModule = require('./servo-controller');
    var cameraModule = require('./camera-controller');
    var feedLimit = 10;
    var dailyFeedLog = [];

    // // HTTP Request routing library
    var router = require('tiny-router'),
        // Use fs for static files
        fs = require('fs'),
        // Use tessel for changing the LEDs
        // tessel = require('tessel'),

        LedMap = [false, false, false, false];

    // for (var i = 0; i < tessel.led.length; i++) {
    //     tessel.led[i].off();
    // }

    // The router should use our static folder for client HTML/JS
    router
        .use('static', {
            path: './static'
        })
        // Use the onboard file system (as opposed to microsd)
        .use('fs', fs)
        // Listen on port 8080
        .listen(8080);
        console.log('server running on port 8080');

    // When the router gets an HTTP request at /leds/[NUMBER]
    // router.get("/leds/{led}", function(req, res) {
    //     console.log('which led?', req.body.led)
    //         // Grab the LED being toggled
    //     var index = req.body.led;
    //     // Toggle the LED
    //     tessel.led[index].toggle();
    //     LedMap[index] = !LedMap[index];
    //     console.log(LedMap);
    //     // Send a response
    //     res.send(200);
    // });

    router.get("/feed",function(req, res){

        console.log('Test test kiddie feed route',cameraModule);

        cameraModule.capture().then(function(data){
            console.log('Received camera feed', data);
        })
        //Check if we are over feed limit
        //move servo to feed
        // on success, take a picture and go through picture flow.
        // on failure, do something
        
    });

    function showIndex(request, response) {
        response.writeHead(200, {
            "Content-Type": "text/html"
        });

        fs.readFile(__dirname + '/static/index.html', function(err, content) {
            if (err) {
                throw err;
            }

            response.end(content);
        });
    }

    router.get("/", function(req, res) {
        showIndex(req, res);
    })