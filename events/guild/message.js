var path = require('path');
var appDir = path.dirname(require.main.filename);
const { prefix, token } = require(`${appDir}/config.json`)

module.exports = (Discord, client, message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client .commands.get(cmd);

    if(command) {

        try {
            command.execute(client, message, args, Discord);
        } catch (error) {
            console.error(error);
            const embed = new MessageEmbed()
                    .setTitle(`Erreur`)
                    .setColor(`${red}`)
                    .setDescription(`:x: La commande n'a pas pu s'exécuter !`)
            message.channel.send(embed);
    }
    
    }
}