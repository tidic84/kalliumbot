const { MessageEmbed } = require('discord.js');
var path = require('path');
var appDir = path.dirname(require.main.filename);
const { blue, green, yellow, red } = require(`${appDir}/commands/colors.json`)
const { prefix, token } = require(`${appDir}/config.json`)

module.exports = (Discord, client, message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client .commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));


    if(command) {

        try {
            command.execute(client, message, args, cmd,  Discord);
        } catch (error) {
            console.error(error);
            const embed = new MessageEmbed()
                    .setTitle(`Erreur`)
                    .setColor(`${red}`)
                    .setDescription(`:x: La commande n'a pas pu s'exécuter !`)
                    .setFooter(`${error}`)
            message.channel.send(embed);
        }
    
    }
}