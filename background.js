chrome.runtime.onMessage.addListener(msgObj => {
    const actionMessage = msgObj?.morty?.action;
    switch (actionMessage) {
        case 'copy-localStorage':
            sendMessage('copy-localStorage-reply', localStorage);
            break;
        case 'copy-sessionStorage':
            sendMessage('copy-sessionStorage-reply', sessionStorage);
            break;
        case 'paste-localStorage':
            chrome.storage.local.get(['localStorageClipboard'], (data) => {
                Object.entries(data?.localStorageClipboard).forEach(e => {
                    localStorage.setItem(e[0], e[1]);
                });
            });
            break;
        case 'paste-sessionStorage':
            chrome.storage.local.get(['sessionStorageClipboard'], (data) => {
                Object.entries(data?.sessionStorageClipboard).forEach(e => {
                    sessionStorage.setItem(e[0], e[1]);
                });
            });
            break;
    }
});

const sendMessage = (action, message) => {
    chrome.runtime.sendMessage({ morty: { action: action, actionReply: message }});
};
