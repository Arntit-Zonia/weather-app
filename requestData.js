const request = require("request");

const getTemperature  = (location, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=45ee8c7f72cb0559e8512198e9458efe&query=${encodeURIComponent(location)}&unit=m`;

    request({ url, json: true }, (error, response, body) => {
        const { error: bodyError, location: {name}, current: {temperature, feelslike} } = body;
        const { statusCode } = response;

        if (error) callback(`Error message: ${error}`);

        if (bodyError) callback("Could not find location!");

        if (statusCode == 200 && !bodyError) {
            // console.log(`The current temperature in ${body.location.name} is ${body.current.temperature} and it feels like it's ${body.current.feelslike}`);

            callback("", `The current temperature in ${name} is ${temperature} and it feels like it's ${feelslike}`);
        }
    });
}

const getGeoLocationData = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJkaXR6b25qYSIsImEiOiJja3Bjc21xNjQxZ3g1MnZubGU1ZWR0dDg1In0.UZLcTngUxCbyr4_FnHsGSw&limit=1`;

    request({ url, json: true }, (error, response, body) => {
        const { message: bodyError, features } = body;
        const { statusCode } = response;

        // Checks for connection issues
        if (error) {
            callback(`Error message: ${error}`);
        }

        // Checks for URL query issues
        if (bodyError) {
            callback("Invalid URL, please ensure all included values are correct!");
        }

        // Checks if the location value is valid 
        if (features && !features.length) {
            callback("Please enter a valid location");
        }
        
        if (statusCode == 200 && features.length) {
            const { place_name: location, center} = features[0];
            const [latitude, longitude ] = center;
            const [query] = body.query;

            // console.log(`Location: ${body.features[0].place_name}, Latitude: ${body.features[0].center[1]} Longitude: ${body.features[0].center[0]}`);

            const data = {
                query,
                location,
                latitude,
                longitude
            }; 

            callback("", data);
        }    
    });
}

module.exports = { 
    getGeoLocationData,
    getTemperature
};