//Deal with the different tasks
let startRequests = function(){
    /**
     * Send a server request to fetch data from the server
     */
    serverRequest("/fetchDB", (res) => {
        data = res;
        dataLine.addData(data);
        dataLayer1.addData(data);
    });

    /**
     * Send a request to the server to fetch current location
     */
    serverRequest("/getLocation", (res) =>{
        let coords = res;
        locationMarker.setLatLng(L.latLng(coords.lat, coords.lng));
    });

    /**
     * Request to create a socket connection
     */
    socketConnection((data)=>{
        dataLine.addData(data);
        dataLayer1.addData(data);
    });
};
