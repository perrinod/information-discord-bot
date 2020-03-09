const fetch = require('node-fetch');

module.exports = {
    name: 'anime',
    description: 'Search for an anime',
    execute(message, args) {
        var url = 'https://api.jikan.moe/v3/search/anime?q=';
        args.forEach(element => url += element);
        const limit = '&limit=1';
        url += limit;

        setTimeout(() => {
            fetch(url, {
                method: 'GET'
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    json.results[0].airing ? json.results[0].airing = 'Currently Airing' : json.results[0].airing = 'Finished Airing';
                    if (json.results[0].end_date == null) { json.results[0].end_date = '?'; }
                    message.channel.send({
                        embed: {
                            color: 0x0099ff,
                            title: json.results[0].title,
                            url: json.results[0].url,
                            image: {
                                url: json.results[0].image_url,
                            },
                            fields: [
                                {
                                    name: 'Airing',
                                    value: json.results[0].airing,
                                    inline: true,
                                },
                                {
                                    name: 'Episodes',
                                    value: json.results[0].episodes,
                                    inline: true,
                                },
                                {
                                    name: 'Score',
                                    value: json.results[0].score.toString(),
                                    inline: true,
                                },
                                {
                                    name: 'Synopsis',
                                    value: json.results[0].synopsis,
                                },
                                {
                                    name: 'Rated',
                                    value: json.results[0].rated,
                                    inline: true,
                                },
                                {
                                    name: 'Start Date',
                                    value: json.results[0].start_date,
                                    inline: true,
                                },
                                {
                                    name: 'End Date',
                                    value: json.results[0].end_date,
                                    inline: true,
                                },
                            ],
                            timestamp: new Date(),
                        },
                    });
                });
        }, 500);
    },
};