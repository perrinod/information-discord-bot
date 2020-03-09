module.exports = {
    name: 'help',
    description: 'List of possible commands',
    execute(message, args) {
        message.channel.send({
            embed: {
                color: 0x0099ff,
                title: 'Command Menu',
                author: 'Imperial Pigeon Bot',
                description: 'List of possible commands',
                fields: [
                    {
                        name: 'Search for a magic card',
                        value: '!magic <card name>',
                    },
                    {
                        name: 'Search for an anime',
                        value: '!anime <anime name>',
                    },
                    {
                        name: 'Get forecast of weather at location',
                        value: '!weather <location name>',
                    },
                    {
                        name: 'Possibly returns a legitimate cat fact',
                        value: '!catfact',
                    },
                    {
                        name:  'Search for a tv show',
                        value: '!show <tv show name>',
                    },
                ],
                timestamp: new Date(),
            }
        });
    },
};