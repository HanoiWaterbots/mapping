//Deal with the different tasks
serverRequest("/fetchDB", (res) => {
    data = res.data;
    myData.addData(data);
});

serverRequest("/getLocation", (res) =>{
    let coords = res;
    locationMarker.setLatLng(L.latLng(coords.lat, coords.lng));
});

socketConnection((data)=>{
    console.log(data);
});
