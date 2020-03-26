const fetch = require('node-fetch');

module.exports = {
    name: 'catfact',
    description: 'Get a random cat fact',
    execute(message, args) {
        var url = 'https://cat-fact.herokuapp.com/facts/random';

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
                    title: 'Random Cat Fact',
                    fields: [
                        {
                            name: 'Cat Fact',
                            value: json.text,

                        },
                    ],
                    timestamp: new Date(),
                },
            });
        });
    },
};