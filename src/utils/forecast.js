const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    console.log(latitude, longitude)
    const url = 'http://api.weatherstack.com/current?access_key=6e9a4efa30b1ae20f4259c231970c0eb&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions.join(".") + '. It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast