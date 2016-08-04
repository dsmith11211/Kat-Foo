var fs = require('fs');
// var tessel = require('tessel');
var av = require('tessel-av');
var camera = new av.Camera();
var timestamp;

function capture() {
    return new Promise(function(resolve, reject){

        //offline test
        setTimeout(function() {
            resolve({success:'yes'});
        }, 2000);

        // var capture = camera.capture();

        // capture.on('data', function(data) {
        //     timestamp = new Date();

        //     fs.writeFile(path.join(__dirname, 'captures/captured-via-data-event-' + timestamp + '.jpg'), data, function(err){
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(data);
        //         }
        //     });

        // });
    })
}


module.exports = {
    capture: capture
}

