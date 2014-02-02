
(function(global){
  var startFlag = false // false if PinP doesn't start
    , $div    // div node displays PinP
    , WIDTH = 160  // width of PinP frame
    , HEIGHT = 120 // height of PinP frame
    , ASPECT = WIDTH / HEIGHT // aspect ratio of PinP frame

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
  }


  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      switch(request.op) {
      case "start":
        if(!startFlag) {
          startFlag = true;
          startPinP();
        } else {
          $div.trigger("start");
        }
        break;
      case "stop":
        $div.trigger("stop");
        break;
      default:
        break;
      }
      sendResponse("message received");
    }
  );
}(window));
