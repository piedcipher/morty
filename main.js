document.querySelector('#copy-localStorage').onclick = () => {
    sendMessage('copy-localStorage');
};

document.querySelector('#copy-sessionStorage').onclick = () => {
    sendMessage('copy-sessionStorage');
};

document.querySelector('#paste-localStorage').onclick = () => {
    sendMessage('paste-localStorage');
};

document.querySelector('#paste-sessionStorage').onclick = () => {
    sendMessage('paste-sessionStorage');
};

const sendMessage = (message) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { morty: { action: message }});
    });
};

chrome.runtime.onMessage.addListener(msgObj => {
    const actionMessage = msgObj?.morty?.action;
    switch (actionMessage) {
        case 'copy-localStorage-reply':
            if (msgObj?.morty?.actionReply) {
                chrome.storage.local.set({
                    'localStorageClipboard': msgObj.morty.actionReply,
                });
            }
            break;
        case 'copy-sessionStorage-reply':
            if (msgObj?.morty?.actionReply) {
                chrome.storage.local.set({
                    'sessionStorageClipboard': msgObj.morty.actionReply,
                });
            }
            break;
        case 'paste-localStorage-reply':
            break;
        case 'paste-sessionStorage-reply':
            break;
    }
});

document.querySelector('#view-clipboard').onclick = () => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('clipboard.html'));
    }
}
