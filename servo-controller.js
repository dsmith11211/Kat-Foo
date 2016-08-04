// var tessel = require('tessel');
// var servo = require('servo-pca9685').use(tessel.port['A']);


function feed() {
    return new Promise(function(resolve, reject){
        //offline test
        setTimeout(function() {
            resolve({success:'yes'});
        }, 2000);
    });
    // return new Promise(function(resolve, reject){
    //     servo.on('ready', function() {
    //         var position = 0;
    //         servo.move(1,1,function(err){
    //             if(err) {
    //                 reject(err);
    //             } else {
    //                 resolve({success: true});
    //             }
    //         })
    //     });
    // })
}

module.exports = {
    feed: feed
}
