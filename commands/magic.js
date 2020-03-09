const fetch = require('node-fetch');

module.exports = {
    name: 'magic',
    description: 'Search for a magic card',
    execute(message, args) {
        var url = 'https://api.scryfall.com/cards/named?fuzzy=';
        args.forEach(element => url += element);

        setTimeout(() => {
            fetch(url, {
                method: 'GET'
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    if (json.details != null) { message.reply(json.details); }
                    else {
                        if (json.mana_cost == "") { json.mana_cost = '-'; }
                        if (json.author == "") { json.author = '-'; }
                        if (json.oracle_text == "") { json.oracle_text = '-'; }

                        message.channel.send({
                            embed: {
                                color: 0x0099ff,
                                title: json.name,
                                author: json.artist,
                                url: json.scryfall_uri,
                                image: {
                                    url: json.image_uris.border_crop,
                                },
                                fields: [
                                    {
                                        name: 'Mana Cost',
                                        value: json.mana_cost,
                                        inline: true,
                                    },
                                    {
                                        name: 'Type',
                                        value: json.type_line,
                                        inline: true,
                                    },
                                    {
                                        name: 'Rarity',
                                        value: json.rarity,
                                        inline: true,
                                    },
                                    {
                                        name: 'Card Text',
                                        value: json.oracle_text,
                                    },
                                    {
                                        name: 'Set Name',
                                        value: json.set_name,
                                        inline: true,
                                    },
                                    {
                                        name: 'Artist',
                                        value: json.artist,
                                        inline: true,
                                    },
                                ],
                                timestamp: new Date(),
                            },
                        });
                    }
                });
        }, 200);
    },
};