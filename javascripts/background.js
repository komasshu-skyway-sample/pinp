var id;

var createPinP = function(info, tab) {
  var op;
  console.log("createPinP : ", info, tab);
  if(info.checked) {
    // start PinP
    op = "start";
  } else {
    // stop PinP
    op = "stop";
  }
  chrome.tabs.sendMessage(tab.id, {"op": op}, function(resp) {
    console.log(resp);
  });
}

var contexts = ["page","selection","link","editable","image","video", "audio"];

id = chrome.contextMenus.create({
  "title": "Display Picture in Picture", 
  "type": "checkbox",
  "contexts": contexts,
  "checked": false,
  "onclick": createPinP
});

console.log("contextMenus create", id);
