//Data for the application
let data = {};
let socket = io.connect('http://ec2-18-205-17-12.compute-1.amazonaws.com:8080');

//Color function
let whiteToYellow = new L.HSLLuminosityFunction(new L.Point(0, 1), new L.Point(50, 0.5), {
    outputHue: 60
});
// We'll then vary the color from yellow to red from 50 to 100
let yellowToRed = new L.HSLHueFunction(new L.Point(50, 60), new L.Point(100, 0));
// Create a new PiecewiseFunction and use this as you would any other LinearFunction
let colorFunction = new L.PiecewiseFunction([whiteToYellow, yellowToRed]);

/**
 * Layer options for the Data Layer
 * @type {{recordsField: null, locationMode: L.LocationModes.LATLNG, latitudeField: string, longitudeField: string, layerOptions: {opacity: number}, displayOptions: {pH: {displayName: string, color: *, displayText: function(*): string}}}}
 */
let options = {
    recordsField: null,
    locationMode: L.LocationModes.LATLNG,
    latitudeField: 'lat',
    longitudeField: 'lng',
    layerOptions: {
        opacity: 1.0
    },
    displayOptions: {
        pH:{
            displayName: 'pH',
            color: colorFunction,
            displayText: function (value) {
                return value.toFixed(2);
            }
        }
    },
};

/**
 * Layer options for the Bar Chart Layer
 * @returns {*} Bar Chart Layer object
 */
let createBarChartLayer = function () {
    let barChartOptions = {
        recordsField: null,
        locationMode: L.LocationModes.LATLNG,
        latitudeField: 'lat',
        longitudeField: 'lng',
        layerOptions: {
            opacity: 1.0
        },
        chartOptions:{
            'pH': {
                fillColor: '#E65100',
                minValue: 0,
                maxValue: 14,
                maxHeight: 20,
                displayText: function (value) {
                    return value.toFixed(2);
                }
            },
            'Temperature': {
                fillColor: '#1B5E20',
                minValue: 0,
                maxValue: 20,
                maxHeight: 20,
                displayText: function (value) {
                    return (value.toFixed(2) + " \xB0C");
                }
            },
            'DO': {
                fillColor: '#EEFF41',
                minValue: 0,
                maxValue: 20,
                maxHeight: 20,
                displayName: 'Dissolved Oxygen',
                displayText: function (value) {
                    return (value.toFixed(2) + "mg/L");
                }
            },
            'ORP': {
                fillColor: '#311B92',
                minValue: 0,
                maxValue: 20,
                maxHeight: 20,
                displayText: function (value) {
                    return (value.toFixed(2) + "mV");
                }
            },
            'Conductivity' : {
                fillColor: '#FFD600',
                minValue: 0,
                maxValue: 20,
                maxHeight: 20,
                displayText: function (value) {
                    return (value.toFixed(2) + " \u03BCS/cm");
                }
            }
        }
    };

    return new L.BarChartDataLayer(data, barChartOptions);
};

//Basic global definitions for our application
let map = L.map('map').setView([21.045567, 105.842898], 12);                        //Map object
let locationMarker = L.marker(map.getCenter());                                     //Location marker object
let dataLine = new L.FlowLine(data, options);                                       //Data line layer object
let dataLayer1 = createBarChartLayer();                                             //First Data Layer object

//Send a server request to fetch the map key from the server
serverRequest('/fetchConfig/mapKey', constructMap);

/**
 * This function is called when the above server request to fetch the map key is completed
 * @param res The map key object
 */
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


    //addTo(map) lets us define what all we want to display by default when the map loads
    //Add the layer control tool to the map
    layerControl.addTo(map);
    //Add the base layer that consists of the map
    baseLayer.addTo(map);
    //Add the layer that contains the data line to the map
    //dataLine.addTo(map);
    dataLayer1.addTo(map);

    //.addOverlay allows us to add all the layers to the map in the background. We can see them in the layer toolbox
    //layerControl.addOverlay(dataLine, "Data");
    layerControl.addOverlay(dataLayer1, "Histograms");
    layerControl.addOverlay(locationMarker, "Location");

    //This calls the function in script.js to start making all the requests to the server
    startRequests();
}
