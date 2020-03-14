const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
const client = new Discord.Client();
const ext = require('commander');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

ext.
    option('-k, --key-id <key_id>, Extension key ID').
    parse(process.argv);

const keyId = getOption('keyId', 'EXT_KEY_ID');

function getOption(optionName, environmentName) {
    const option = (() => {

        if (ext[optionName]) {
            return ext[optionName];
        } else if (process.env[environmentName]) {
            console.log(STRINGS[optionName + 'Env']);
            return process.env[environmentName];
        }
        console.log(STRINGS[optionName + 'Missing']);
        process.exit(1);
    })();
    console.log(`Using "${option}" for ${optionName}`);
    return option;
}

console.log('StartUp');

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix)) {

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) {
            message.reply(`${commandName} command does not exist`);
            return;
        }

        const command = client.commands.get(commandName);

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('Error trying to execute that command');
        }
    }
});

client.login(keyId);
