const fetch = require('node-fetch');

module.exports = {
    name: 'stock',
    description: 'Search for a stocks quote',
    execute(message, args) {
        var url = 'https://financialmodelingprep.com/api/v3/quote/';

        if (args.length == 0) {
            message.author.send('Error requires stock symbol after command');
            return;
        }

        args.forEach(element => url += element.toUpperCase());

        fetch(url, {
            method: 'GET'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                if (json[0] == null) { message.reply('Could not find stock'); return;}
                message.channel.send({
                    embed: {
                        color: 0x0099ff,
                        title: json[0].name + ', ' + json[0].symbol + ', ' + json[0].exhange,
                        fields: [
                            {
                                name: 'Price',
                                value: json[0].price.toString(),
                                inline: true,
                            },
                            {
                                name: 'Change',
                                value: json[0].change.toString(),
                                inline: true,
                            },
                            {
                                name: 'Change Percentage',
                                value: json[0].changesPercentage.toString(),
                                inline: true,
                            },
                            {
                                name: 'Day Low',
                                value: json[0].dayLow.toString(),
                                inline: true,
                            },
                            {
                                name: 'Day High',
                                value: json[0].dayHigh.toString(),
                                inline: true,
                            },
                            {
                                name: 'Open',
                                value: json[0].open.toString(),
                                inline: true,
                            },
                            {
                                name: 'Year Low',
                                value: json[0].yearLow.toString(),
                                inline: true,
                            },
                            {
                                name: 'Year High',
                                value: json[0].yearHigh.toString(),
                                inline: true,
                            },
                            {
                                name: 'Previous Close',
                                value: json[0].previousClose.toString(),
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