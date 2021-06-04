const request = require("request");

const getGeoLocationData = (address, callback) => {
    // pk.eyJ1IjoiYXJkaXR6b25qYSIsImEiOiJja3Bjc21xNjQxZ3g1MnZubGU1ZWR0dDg1In0.UZLcTngUxCbyr4_FnHsGSw

    const latLangURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJkaXR6b25qYSIsImEiOiJja3Bjc21xNjQxZ3g1MnZubGU1ZWR0dDg1In0.UZLcTngUxCbyr4_FnHsGSw&limit=1`;
    const data = {}; 

    request({ url: latLangURL, json: true }, (error, response, body) => {
        // Checks for connection issues
        if (error) {
            console.log(`Error message: ${error}`);

            callback(`Error message: ${error}`);
        }

        // Checks for URL query issues
        if (body.message) {
            console.log("Invalid URL, please ensure all included values are correct!");

            callback("Invalid URL, please ensure all included values are correct!");
        }

        // Checks if the location value is valid 
        if (body.features && !body.features.length) {
            console.log("Please enter a valid location");

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

module.exports = { getGeoLocationData };