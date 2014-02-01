var $div = $("<div>")
  .attr("draggable", true)
  .css({
    "position": "absolute",
    "top": "10px",
    "left": "0",
    "z-index": 9999,
    "width": "160px",
    "height": "120px",
    "border": "1px dashed #ccc"
  })
  .PinP()
  .draggable()
  .resizable()
  .appendTo("body");

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch(request.op) {
    case "start":
      $div.trigger("start");
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
