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
  .draggable()
  .resizable()
  .hide()
  .appendTo("body");

var fShown = false
  , fVideo = false;

function startVideo() {
  fShown = true;

  if(fVideo) {
    $div.fadeIn();
  } else {
    $div.fadeIn();
    fVideo = true;

    var $video = $("<video>")
      .css({
        "width": "100%",
        "height": "100%"
      })
      .appendTo($div);

    navigator.webkitGetUserMedia({video: true, audio: false}, function(stream){
      var url = window.URL.createObjectURL(stream);
      $video.attr("src", url);
      $video[0].play();
    }, function(err){
      console.log(err);
    });
  }
}

function stopVideo() {
  fShown = false;
  $div.fadeOut();
}

$("<button>")
  .text("start PinP")
  .css({
    "position": "absolute",
    "top": "0",
    "left": "0",
    "z-index": 10000
  })
  .on("click", function(){
    if(fShown) {
      stopVideo();
      $(this).text("resume PinP");
    } else {
      startVideo();
      $(this).text("pause PinP");
    }
  })
  .appendTo("body");
