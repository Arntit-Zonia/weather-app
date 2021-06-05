const request = require("request");

const getTemperature  = (location, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=45ee8c7f72cb0559e8512198e9458efe&query=${encodeURIComponent(location)}&unit=m`;

    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback(`Error message: ${error}`);
        }

        if (body.error) {
            callback("Could not find location!");
        }

        if (response.statusCode == 200 && !body.error) {
            // console.log(`The current temperature in ${body.location.name} is ${body.current.temperature} and it feels like it's ${body.current.feelslike}`);

            callback("", `The current temperature in ${body.location.name} is ${body.current.temperature} and it feels like it's ${body.current.feelslike}`);
        } 
    });
}

const getGeoLocationData = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJkaXR6b25qYSIsImEiOiJja3Bjc21xNjQxZ3g1MnZubGU1ZWR0dDg1In0.UZLcTngUxCbyr4_FnHsGSw&limit=1`;
    const data = {}; 

    request({ url, json: true }, (error, response, body) => {
        // Checks for connection issues
        if (error) {
            callback(`Error message: ${error}`);
        }

        // Checks for URL query issues
        if (body.message) {
            callback("Invalid URL, please ensure all included values are correct!");
        }

        // Checks if the location value is valid 
        if (body.features && !body.features.length) {
            callback("Please enter a valid location");
        }
        
        if (response.statusCode == 200 && body.features.length) {
            // console.log(`Location: ${body.features[0].place_name}, Latitude: ${body.features[0].center[1]} Longitude: ${body.features[0].center[0]}`);

            data.location = body.features[0].place_name;
            data.latitude = body.features[0].center[1];
            data.longitude = body.features[0].center[0];

            callback("", data);
        }    
    });
}

module.exports = { 
    getGeoLocationData,
    getTemperature
};