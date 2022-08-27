const renderClipboard = () => {
    chrome.storage.local.get(null, (items) => {
        const localStorageClipboard = document.querySelector('#localStorage-clipboard');
        if (items?.localStorageClipboard) {
            let tableData = '';
            tableData = '<br>' + '<div class="table-responsive"><table class="table table-sm">';
            tableData += '<thead><tr><th scope="col">Key</th><th scope="col">Value</th></tr></thead><tbody>';
            Object.entries(items?.localStorageClipboard).forEach(e => {
                tableData += `<tr><td>${e[0]}</td><td>${e[1]}</td></tr>`;
            });
            tableData += '</tbody></table></div>';
            localStorageClipboard.innerHTML = tableData;
        } else {
            localStorageClipboard.innerHTML = 'Nothing Here ...';
        }

        const sessionStorageClipboard = document.querySelector('#sessionStorage-clipboard');
        if (items?.sessionStorageClipboard) {
            let tableData2 = '';
            tableData2 = '<br>' + '<div class="table-responsive"><table class="table table-sm">';
            tableData2 += '<thead><tr><th scope="col">Key</th><th scope="col">Value</th></tr></thead><tbody>';
            Object.entries(items?.sessionStorageClipboard).forEach(e => {
                tableData2 += `<tr><td>${e[0]}</td><td>${e[1]}</td></tr>`;
            });
            tableData2 += '</tbody></table></div>';
            sessionStorageClipboard.innerHTML = tableData2;
        } else {
            sessionStorageClipboard.innerHTML = 'Nothing Here ...';
        }
    });
};

chrome.storage.onChanged.addListener((changes, namespace) => {
    renderClipboard();
});

renderClipboard();

document.querySelector('#clear-localStorage-clipboard').onclick = () => {
    chrome.storage.local.remove("localStorageClipboard");
};

document.querySelector('#clear-sessionStorage-clipboard').onclick = () => {
    chrome.storage.local.remove("sessionStorageClipboard");
};