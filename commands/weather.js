/*const fetch = require('node-fetch');

module.exports = {
    name: 'weather',
    description: 'Get forecast of weather at a location',
    execute(message, args) {
        var url = 'https://www.metaweather.com/api/location/search/?query=';
        args.forEach(element => url += element + ' ');
        fetch(url, {
            method: 'GET'
        })
        .then(function (response) {
                return response.json();
        })
        .then(function (json) {
            if (json.length == 0) { message.reply('Could not find location'); return; }
            url = 'https://www.metaweather.com/api/location/';
            url += json[0].woeid;

            fetch(url, {
                method: 'GET'
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                message.channel.send({
                    embed: {
                        color: 0x0099ff,
                        title: 'Today',
                        thumbnail: {
                            url: 'https://www.metaweather.com/static/img/weather/png/64/' + json.consolidated_weather[0].weather_state_abbr + '.png',
                        },
                        fields: [
                            {
                                name: 'Weather',
                                value: json.consolidated_weather[0].weather_state_name,
                            },
                            {
                                name: 'Wind Speed',
                                value: Math.floor(json.consolidated_weather[0].wind_speed).toString(),
                                inline: true,
                            },
                            {
                                name: 'Wind Direction',
                                value: json.consolidated_weather[0].wind_direction_compass,
                                inline: true,
                            },
                            {
                                name: 'Humidity',
                                value: json.consolidated_weather[0].humidity,
                            },
                            {
                                name: 'Minimum Temperature',
                                value: Math.floor(json.consolidated_weather[0].min_temp).toString() + '°C',
                                inline: true,
                            },
                            {
                                name: 'Maximum Temperature',
                                value: Math.floor(json.consolidated_weather[0].max_temp).toString() + '°C',
                                inline: true,
                            },
                            {
                                name: 'Current Temperature',
                                value: Math.floor(json.consolidated_weather[0].the_temp).toString() + '°C',
                            },
                        ],
                        timestamp: new Date(),
                    },
                });

                message.channel.send({
                    embed: {
                        color: 0x0099ff,
                        title: 'Tommorrow',
                        thumbnail: {
                            url: 'https://www.metaweather.com/static/img/weather/png/64/' + json.consolidated_weather[1].weather_state_abbr + '.png',
                        },
                        fields: [
                            {
                                name: 'Weather',
                                value: json.consolidated_weather[1].weather_state_name,
                            },
                            {
                                name: 'Wind Speed',
                                value: Math.floor(json.consolidated_weather[1].wind_speed).toString(),
                                inline: true,
                            },
                            {
                                name: 'Wind Direction',
                                value: json.consolidated_weather[1].wind_direction_compass,
                                inline: true,
                            },
                            {
                                name: 'Humidity',
                                value: json.consolidated_weather[1].humidity,
                            },
                            {
                                name: 'Minimum Temperature',
                                value: Math.floor(json.consolidated_weather[1].min_temp).toString() + '°C',
                                inline: true,
                            },
                            {
                                name: 'Maximum Temperature',
                                value: Math.floor(json.consolidated_weather[1].max_temp).toString() + '°C',
                                inline: true,
                            },
                            {
                                name: 'Current Temperature',
                                value: Math.floor(json.consolidated_weather[1].the_temp).toString() + '°C',
                            },
                        ],
                        timestamp: new Date(),
                    },
                });
            });
        });
    },
};
*/