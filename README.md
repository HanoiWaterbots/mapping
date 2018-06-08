# Hanoi Waterbots Data Visualization Application
One of the tasks of this project was to visualize data that is collected through the device. This application allows us to
plot that data on a map.

We are using [Leaflet](https://leafletjs.com/) and [Leaflet DVF](https://github.com/humangeo/leaflet-dvf) for generating the map
and plotting data.

## Current Data Schematics for the database
```
[
        {
            lat: {type: Number, required:true},
            lng: {type: Number, required:true},
            pH: {type: Number, enum: {$range: [0, 14, 0.01]}},     //restricting the range of the acceptable input
            Temperature: Number,
            DO: Number,
            ORP: Number,
            Conductivity: Number
        },
            ...
    ]
```

Have a look at [createSchema.js](models/createSchema.js) to see usage

![Screenshot](https://preview.ibb.co/d29mL8/App_screenshot.png)
