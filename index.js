const Discord = require('discord.js');
const client = new Discord.Client()

const { token } = require('./config.json')

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.once('ready', () => {
    client.user.setActivity('Kallium', { type: 'WATCHING', url:  'https://twitch.tv/'});
});

client.login(process.env.TOKEN);
