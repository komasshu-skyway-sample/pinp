
var createPinP = function(info, tab) {
  console.log("createPinP : ", info, tab);
}

var contexts = ["page","selection","link","editable","image","video", "audio"];

var id = chrome.contextMenus.create({
  "title": "Picture in Picture", "contexts": contexts, "onclick": createPinP
});

console.log("contextMenus create", id);
