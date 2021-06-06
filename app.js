const requestResponseData = require("./requestData.js");

const decodedLocation = process.argv[2];

if (decodedLocation) {
    requestResponseData.getGeoLocationData(decodedLocation, (error, geoLocationData) => {
        if (error) return console.log(error);
    
        requestResponseData.getTemperature(decodedLocation, (error, temperatureData) => {
            if (error) return console.log("Error: ", error);
    
            console.log("Geolocation Data: ", geoLocationData);
            console.log("Temperature Data: ", temperatureData);
        });
    });
}

else {
    console.log("Please provide a location in the terminal!");
}