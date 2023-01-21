chrome.browserAction.onClicked.addListener(throwing);

function throwing(){
    chrome.tabs.query({currentWindow: true, active:true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "throw"});
    });
}
