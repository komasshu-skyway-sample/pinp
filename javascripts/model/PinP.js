/* PinP.js */
"use strict";


(function($){
  // Object definitions.
  //
  $.PinP = function(elem, option) {
    this.elem = elem;
    var defaults = {stream_option: {video: true, audio: false}};

    this.option = $.extend(defaults, option);
    this.createVideoNode(function(){
      this.setEventHandler();
    }.bind(this));
  }


  $.PinP.prototype.createVideoNode = function(successCallback, errorCallback){
    this.$video = $("<video>")
      .css({
        "width": "100%",
        "height": "100%"
      })
      .appendTo($(this.elem));

    navigator.webkitGetUserMedia(this.option.stream_option, function(stream){
      var url = window.URL.createObjectURL(stream);
      this.$video.attr("src", url);

      if(typeof(successCallback) === "function") {
        successCallback();
      }
    }.bind(this), function(err){
      if(typeof(errorCallback) === "function") {
        console.log(err);
      }
    });
  }

  $.PinP.prototype.setEventHandler = function(){
    $(this.elem).on("start", this.start.bind(this));
    $(this.elem).on("stop", this.pause.bind(this));
  }

  $.PinP.prototype.start = function(){
    this.$video.fadeIn();
    this.$video[0].play();
  }
  $.PinP.prototype.pause = function(){
    this.$video[0].pause()
    this.$video.fadeOut()
  }
  $.PinP.prototype.stop = function(){
  }

  // Set as jQuery plugin.
  $.fn.PinP = function(config) {
    return this.each(function(){
      new $.PinP( this, config );
    });
  };
}(jQuery));

