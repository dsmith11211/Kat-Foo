var $ = jQuery = require('jquery/dist/jquery');
require('bootstrap-less');
require('../view/styles/index.less');

var $catSpinner = jQuery('.cat-icon');
var $feedCount = jQuery('.feed-count');
var $errorDisplay = jQuery('.error-message');
var $feedBtn = jQuery('.feed_cta');

$( document ).ready(function() {
    
  $.get('/get-feed-count', function(data) {
        if(data.feedLimit) {
            $feedCount.text(data.feedLimit);
        }
  });

});

function resetErrorState() {
    $feedBtn.text('Noms').removeAttr('disabled');
    $errorDisplay.text('').hide();
}

$feedBtn.click(function() {
    resetErrorState();
    $catSpinner.addClass('spin');
    $.ajax({
        type: "GET",
        url: '/feed',
        success: function(data) {
            $catSpinner.removeClass('spin');
            $feedCount.text(data.feedLimit);
        },
        error: function(err) {
            $catSpinner.removeClass('spin');
            if(err.responseJSON.disableButton) {
                $feedBtn.attr('disabled','disabled');
                $feedBtn.text('Out of feeds');
                $errorDisplay.text(err.responseJSON.message);
            } else {
                $errorDisplay.text('Something Went Wrong =(');
            }
            $errorDisplay.fadeIn('fast');
        }
    });
});