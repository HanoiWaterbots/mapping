/**
 * Send a request to the server
 * @param url   The URL to which the request has to be sent
 * @param callback  The callback function that will be called after request completes
 */
let serverRequest = function (url, callback) {
    let xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    let data = {};

    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
            data = JSON.parse(xmlhttp.responseText);
            callback(data);
        }
    };
    try{
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
    catch (e) {
        console.log(e);
    }
};

/**
 * Make a socket connection to the server for real-time updates
 * @param callback  Function that executes after the connection is made
 */
let socketConnection = function (callback) {
    socket.on('updateData', function (data) {
        callback(data)
    });
};
