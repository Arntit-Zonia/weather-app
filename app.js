const request = require("request");

const getTemperature  = () => {
    // access_key=45ee8c7f72cb0559e8512198e9458efe
    // http://api.weatherstack.com/current?access_key=45ee8c7f72cb0559e8512198e9458efe&query=London

    let parsedData;

    const temperatureURL = "http://api.weatherstack.com/current?access_key=45ee8c7f72cb0559e8512198e9458efe&query=London&unit=m";

    request({ url: URL, json: true }, (error, response, body) => {
        if (error) console.log(`Error message: ${error}`);

        // console.log(`Status: ${response && response.statusCode}`);
        // console.log(`Body: ${body}`);

        if (response.statusCode == 200) {
            parsedData = body;
            // console.log(parsedData);

            console.log(`The current temperature in ${body.location.name} is ${body.current.temperature} and it feels like it's ${body.current.feelslike}`);
        } 
    });
}

const getGeoLocationData = () => {
    // pk.eyJ1IjoiYXJkaXR6b25qYSIsImEiOiJja3Bjc21xNjQxZ3g1MnZubGU1ZWR0dDg1In0.UZLcTngUxCbyr4_FnHsGSw

    const latLangURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/london.json?access_token=pk.eyJ1IjoiYXJkaXR6b25qYSIsImEiOiJja3Bjc21xNjQxZ3g1MnZubGU1ZWR0dDg1In0.UZLcTngUxCbyr4_FnHsGSw&limit=1";

    request({ url: latLangURL, json: true }, (error, response, body) => {
        // console.log(`Status: ${response && response.statusCode}`);
        // console.log(`Body: ${body}`);
        // console.log(response);
        
        // Checks for connection issues
        if (error) {
            console.log(`Error message: ${error}`);
        }

        // Checks for URL query issues
        if (body.message) {
            console.log("Invalid URL, please ensure all included values are correct!");
        }

        // Checks if the location value is valid 
        if (body.features && !body.features.length) {
            console.log("Please enter a valid location");
        }
        
        if (response.statusCode == 200 && body.features.length) {
            // parsedData = body;
            // console.log(parsedData);
    
            console.log(`Location: ${body.features[0].place_name}, Latitude: ${body.features[0].center[1]} Longitude: ${body.features[0].center[0]}`);
        }    
    });
}

function init() {
    // getTemperature();
    getGeoLocationData();
}

init();