﻿const fetch = require('node-fetch');

module.exports = {
    name: 'show',
    description: 'Search for a tv show',
    execute(message, args) {
        var url = 'https://api.tvmaze.com/singlesearch/shows?q=';
        args.forEach(element => url += ' ' + element);

        setTimeout(() => {
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
                            title: json.name,
                            url: json.officialSite,
                            image: {
                                url: json.image.original,
                            },
                            fields: [
                                {
                                    name: 'Airing',
                                    value: json.status,
                                    inline: true,
                                },
                                {
                                    name: 'Country',
                                    value: json.network.country.name,
                                    inline: true,
                                },
                                {
                                    name: 'Score',
                                    value: json.rating.average.toString(),
                                    inline: true,
                                },
                                {
                                    name: 'Synopsis',
                                    value: json.summary.replace(/<p>|<\/p>|<b>|<\/b>|<i>|<\/i>/g,""),
                                },
                                {
                                    name: 'Network',
                                    value: json.network.name,
                                    inline: true,
                                },
                                {
                                    name: 'Premiered',
                                    value: json.premiered,
                                    inline: true,
                                },
                            ],
                            timestamp: new Date(),
                        },
                    });
                });
        }, 700);
    },
};