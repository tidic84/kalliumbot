const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require(`../../colors.json`)
const { prefix } = require(`../../config.js`)

module.exports = async (Discord, client, message) => {

    const settings = await client.getGuild(message.guild);

    if(!message.content.startsWith(settings.prefix) || message.author.bot) return;

    
    const args = message.content.slice(settings.prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));


    if(command) {

        try {
            command.execute(client, message, settings, args, cmd, Discord);
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