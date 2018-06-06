# Hanoi Waterbots Data Visualization Application
One of the tasks of this project was to visualize data that is collected through the device. This application allows us to
plot that data on a map.

We are using [Leaflet](https://leafletjs.com/) and [Leaflet DVF](https://github.com/humangeo/leaflet-dvf) for generating the map
and plotting data.

## Current Data Schematics for the database
```
data: [
            {
                lat: <LATITUDE>,
                lng: <LONGITUDE>,
                pH: <pH Value>,
                Temperature: <Temperature in degree celsius>,
                'Dissolved Oxygen': <Value in mg/L>,
                ORP: <Oxidation Reduction Potential in mV>,
                Conductivity: <Value in micro-Siemens/cm>,
            },
            ...
    ]
```

Have a look at [fetchDB.js](routes/fetchDB.js) to see usage

![Screenshot](https://preview.ibb.co/d29mL8/App_screenshot.png)
