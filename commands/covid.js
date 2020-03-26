const fetch = require('node-fetch');

module.exports = {
    name: 'covid',
    description: 'Returns information about covid',
    execute(message, args) {
        var url = 'https://covid2019-api.herokuapp.com/v2/';
        if (args.length == 0) {
            message.author.send('Error requires total or country name after command');
            return;
        }

        var countryName = '';

        if (args[0] == 'information')
            url += 'total';
        else {
            url += 'country/';            
            args.forEach(element => countryName += element.charAt(0).toUpperCase() + element.slice(1).toLowerCase());
        }

        switch (countryName) {
            case 'America':
            case 'UnitedStates':
                countryName = 'US';
                break;
            case 'SouthKorea':
                countryName = 'Korea, South';
                break;
            case 'UnitedArab':
                countryName = 'United Arab Emirates';
                break;
            case 'Tobago':
            case 'Trinidad':
                countryName = 'Trinidad and Tobago';
                break;
            case 'Kinshasa':
                countryName = 'Congo (Kinshasa)';
                break;
            case 'TheBahamas':
            case 'Bahamas':
                countryName = 'Bahamas, The';
                break;
            case 'Brazzaville':
                countryName = 'Congo (Brazzaville)';
                break;
            case 'Barbuda':
            case 'Antigua':
                countryName = 'Antigua and Barbuda';
                break;
            case 'SaintVincent':
            case 'Grenadines':
                countryName = 'Saint Vincent and the Grenadines';
                break;
            case 'Congo':
                countryName = 'Republic of the Congo';
                break;
            case 'Gambia':
                countryName = 'Gambia';
                break;
            case 'Bosnia':
            case 'Herzegovina':
                countryName = 'Bosnia and Herzegovina';
                break;
        }

        url += countryName;

        fetch(url, {
            method: 'GET'
        })
        .then(function (response) {
            if (response.status == 404) {
                message.reply('Could not find country');
            }
            return response.json();
        })
        .then(function (json) {
            var title = 'Covid-19';
            if(args[0] != 'information')
                title = json.data.location;

            message.channel.send({
                embed: {
                    color: 0x0099ff,
                    title: title,
                    fields: [
                        {
                            name: 'Confirmed Cases',
                            value: json.data.confirmed,
                            inline: true,
                        },
                        {
                            name: 'Deaths',
                            value: json.data.deaths,
                            inline: true,
                        },
                        {
                            name: 'Recovered',
                            value: json.data.recovered,
                            inline: true,
                        },
                    ],
                    timestamp: new Date(),
                },
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    },
};