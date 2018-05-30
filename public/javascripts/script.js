//Color function
let whiteToYellow = new L.HSLLuminosityFunction(new L.Point(0, 1), new L.Point(50, 0.5), {
    outputHue: 60
});
// We'll then vary the color from yellow to red from 50 to 100
let yellowToRed = new L.HSLHueFunction(new L.Point(50, 60), new L.Point(100, 0));
// Create a new PiecewiseFunction and use this as you would any other LinearFunction
let colorFunction = new L.PiecewiseFunction([whiteToYellow, yellowToRed]);

let options = {
    recordsField: null,
    locationMode: L.LocationModes.LATLNG,
    latitudeField: 'lat',
    longitudeField: 'lng',
    layerOptions: {
        opacity: 1.0
    },
    displayOptions: {
        wt:{
            displayName: 'Weight',
            color: colorFunction,
        }
    },
};


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

let data = {};

//Map construction
let map = L.map('mapid').setView([21.045567, 105.842898], 12);
let locationMarker = L.marker(map.getCenter());
let myData = new L.FlowLine(data, options);
locationMarker.addTo(map);

serverRequest('/fetchConfig/mapKey', constructMap);

function constructMap(res) {
    //Layers of the map
    let baseLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: res.key,
    });

    let style1 = 'https://api.mapbox.com/styles/v1/hanoiwaterbots/cjhp5zh4l0eh92rs6m5sbts1z/tiles/256/{z}/{x}/{y}?access_token=' + res.key;
    let baseLayer1 = L.tileLayer(style1);

//Create layer controller
    let layerControl = L.control.layers({
        'Realistic': baseLayer,
        'Paper': baseLayer1
    });

    layerControl.addTo(map);
//Add the layer to the map
    baseLayer.addTo(map);
    myData.addTo(map);
    layerControl.addOverlay(myData, "Data");
}

//Deal with the different tasks
serverRequest("/fetchDB", (res) => {
    data = res.data;
    myData.addData(data);
});

serverRequest("/getLocation", (res) =>{
    let coords = res;
    locationMarker.setLatLng(L.latLng(coords.lat, coords.lng));
});
