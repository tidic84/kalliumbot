const Discord = require('discord.js');
const client = new Discord.Client()
const fs = require('fs');

const { prefix, token } = require('./config.json')
const { blue, green, yellow, red } = require('./commands/colors.json')
const { MessageEmbed } = require('discord.js');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

// client.once('ready', () => {
//     console.log('Ready !');
// });

// const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));
// for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);
//     client.commands.set(command.name, command);
//     client.commands.set(command.aliases, command);
// }
// const commandFiles2 = fs.readdirSync(`./commands/music`).filter(file => file.endsWith('.js'));
// for (const file of commandFiles2) {
//     const command2 = require(`./commands/music/${file}`);
//     client.commands.set(command2.name, command2);
//     client.commands.set(command2.aliases && command2.aliases.includes(command2), command2);
// }



// client.on('message', message => {
//     if(!message.content.startsWith(prefix) || message.author.bot) return;

//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();

//     if(!client.commands.has(command)) return;

//     try {
//         client.commands.get(command).execute(message, args);
//     } catch (error) {
//         console.error(error);
//         const embed = new MessageEmbed()
//                 .setTitle(`Erreur`)
//                 .setColor(`${red}`)
//                 .setDescription(`:x: La commande n'a pas pu s'exécuter !`)
//         message.channel.send(embed);
//     }
// })


client.login(token);
