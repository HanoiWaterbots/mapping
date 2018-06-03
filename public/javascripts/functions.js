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

let socketConnection = function (url, callback) {
    socket.on('updateData', function (data) {
        callback(data);
    });
};
