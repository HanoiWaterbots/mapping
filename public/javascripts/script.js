let data = [
    {
        lat: 51.505,
        lng: -0.09,
        wt: 1
    },
    {
        lat: 52.505,
        lng: 1.09,
        wt: 2
    },
    {
        lat: 53.505,
        lng: 2.09,
        wt: 3
    }
];

let mymap = L.map('mapid').setView([51.505, -0.09], 15);
let marker = L.marker(mymap.getCenter());
let whiteToYellow = new L.HSLLuminosityFunction(new L.Point(0, 1), new L.Point(50, 0.5), {
    outputHue: 60
});

// We'll then vary the color from yellow to red from 50 to 100
let yellowToRed = new L.HSLHueFunction(new L.Point(50, 60), new L.Point(100, 0));

// Create a new PiecewiseFunction and use this as you would any other LinearFunction
let colorFunction = new L.PiecewiseFunction([whiteToYellow, yellowToRed]);

let flowLayer = new L.FlowLine(data, {
    recordsField: null,
    locationMode: L.LocationModes.LATLNG,
    latitudeField: 'lat',
    longitudeField: 'lng',
    gradient: true,
    tooltipOptions: {
        className: 'leaflet-div-icon'
    },
    layerOptions: {
        opacity: 0.9
    },
    displayOptions: {
        wt:{
            displayName: 'Weight',
            color: colorFunction,
            weight: new L.LinearFunction([0, 3], [15.02968, 20]),
        }
    },
});

//Add the basic layer to the map
function drawMap(){

    let baseLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiaGFub2l3YXRlcmJvdHMiLCJhIjoiY2poa3FqeDJjMGJodjM2cDYzY2hvMXd2dyJ9.9Zw-sF3e7HwpHFO3wfZrVQ'
    });

    baseLayer.addTo(mymap);

    //Add layer control
    let layerControl = L.control.layers({
        'Map': baseLayer
    });

    layerControl.addTo(mymap);
    mymap.addLayer(flowLayer);
    layerControl.addOverlay(flowLayer, "Data");
}

function drawLine(w) {
    data.push({
        lat: marker.getLatLng().lat,
        lng: marker.getLatLng().lng,
        wt: w
    });
    try{
        flowLayer.addData(data);
    }
    catch (e) {
        console.log(e);
    }
}

//Update location marker to the new location
function putLocation(lat, lng, weight){
    marker.setLatLng(L.latLng(lat,lng));
    drawLine(weight);
}

function getLocation(i){
    let coordinates = {
        lat: 0.00,
        lng: 0.00,
        wt: 1
    };
    coordinates.lat = 51.505 + i;
    coordinates.lng = -0.09 + i;
    coordinates.wt = 1+i;

    return coordinates;
}

function start(){
    drawMap();
    marker.addTo(mymap);
    let i = 0;
    /*
    setInterval(function (){
        let coords = getLocation(i);
        putLocation(coords.lat, coords.lng, coords.weight);
        i++;
    }, 10000);*/
}

start();
