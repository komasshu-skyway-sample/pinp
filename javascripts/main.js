/* main.js */

(function(global){
  // constants
  var INIT = 0
    , PLAYING = 1
    , PAUSED = 2
    , WIDTH = 160  // width of PinP frame
    , HEIGHT = 120 // height of PinP frame
    , ASPECT = WIDTH / HEIGHT // aspect ratio of PinP frame
  var status = INIT // status for PinP
    , $div    // div node displays PinP

  function startPinP(){
    $div = $("<div>")
      .attr("draggable", true)
      .css({
        "position": "absolute",
        "top": "10px",
        "left": "0",
        "z-index": 9999,
        "border": "1px dashed #ccc"
      })
      .width(WIDTH)
      .height(HEIGHT)
      .PinP()
      .draggable()
      .resizable({aspectRatio: ASPECT})
      .appendTo("body");

    setEventHandler();
    
    status = PLAYING;
  }

  // eventHandler
  ////////////////////////////

  var setEventHandler = function(){
    // when double clicked PinP toggle video play/pause.
    $div.on("dblclick", function(ev) {
      switch(status) {
      case INIT:
        break;
      case PLAYING:
        $div.trigger("stop");
        status = PAUSED;
        break;
      case PAUSED:
        $div.trigger("start");
        status = PLAYING;
        break;
      default:
        break;
      }
    });
  }


  // Deffinitions for chrome Message Passing
  // from background pages
  ///////////////////////////
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      switch(request.op) {
      case "start":
        if(status === INIT) {
          startFlag = true;
          startPinP();
        } else if(status === PAUSED) {
          $div.trigger("start");
          status = PLAYING;
        }
        break;
      case "stop":
        if  (status === PLAYING) {
          $div.trigger("stop");
          status = PAUSED
        }
        break;
      default:
        break;
      }
      sendResponse("message received");
    }
  );
}(window));
