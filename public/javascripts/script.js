//Deal with the different tasks
serverRequest("/fetchDB", (res) => {
    data = res.data;
    myData.addData(data);
});

serverRequest("/getLocation", (res) =>{
    let coords = res;
    locationMarker.setLatLng(L.latLng(coords.lat, coords.lng));
});

socketConnection('http://ec2-18-205-17-12.compute-1.amazonaws.com:8080', (data)=>{
    console.log(data);
});
