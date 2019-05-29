const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/7954aa35225dd672b09947619146c7cf/${latitude},${longitude}?units=si`;

    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('unable to connect to services', undefined);
        } else if(body.error) {
            callback('invalid location input', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary}. it is currently ${body.currently.temperature} degrees out. there is a ${body.currently.precipProbability}% chance of rain. humidity is ${body.currently.humidity} and wind speed is ${body.currently.windSpeed}`);
        }
    });
};

module.exports = forecast;