const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
const client = new Discord.Client();
const ext = require('commander');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const userCooldownMs = 5000;                // maximum input rate per user to prevent bot abuse
const channelCooldownMs = 5000;             // maximum broadcast rate per channel
const userCooldownClearIntervalMs = 60000;  // interval to reset our tracking object
const channelCooldowns = {};                // rate limit compliance
let userCooldowns = {};                     // spam prevention

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
    setInterval(() => { userCooldowns = {}; }, userCooldownClearIntervalMs);
});

client.on('message', message => {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix)) {

        const now = Date.now();
        const cooldown = channelCooldowns[message.channel.id];

        if (userIsInCooldown(message.author.id)) {
            message.author.send('Error too many requests by user, try again in ' + ((userCooldowns[message.author.id] - now) / 1000) + ' seconds');
            return;
        }

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) {
            message.author.send(`${commandName} command does not exist`);
            return;
        }

        const command = client.commands.get(commandName);

        try {
            if (!cooldown || cooldown.time < now) {
                command.execute(message, args);
                channelCooldowns[message.channel.id] = { time: now + channelCooldownMs };
            } else if (!cooldown.trigger) {
                cooldown.trigger = setTimeout(command.execute, cooldown.time - now, message, args);
                message.author.send('Error too many requests from channel, try again in ' + ((channelCooldowns[message.channel.id].time - now) / 1000) + ' seconds');
            }
        } catch (error) {
            console.error(error);
            message.author.send('Error trying to execute that command');
        }
    }
});

function userIsInCooldown(userId) {
    // Check if the user is in cool-down.
    const cooldown = userCooldowns[userId];
    const now = Date.now();

    if (cooldown && cooldown > now) {
        return true;
    }

    userCooldowns[userId] = now + userCooldownMs;
    return false;
}


client.login(keyId);
