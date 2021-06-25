const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../colors.json')

module.exports = {
    name: 'ping',
    aliases: ['latence', 'latency'],
    description: 'test présence bot',
    
    async execute(client, message) {
        const embed = new MessageEmbed()
            .setTitle(`Ping`)
            .setDescription(`Latence du bot: \`---ms\`
            Latence de l'API: \`---ms\``)
            .setColor(`${yellow}`)
        const msg = await message.channel.send(embed)

        const embed2 = new MessageEmbed()
            .setTitle(`Ping`)
            .setDescription(`Latence du bot: \`${msg.createdTimestamp - message.createdTimestamp}ms\`
            Latence de l'API: \`${Math.round(client.ws.ping)}ms\``)
            .setColor(`${blue}`)

        msg.edit({embed: embed2}).catch(error => {
            console.log(error)
        })
        
    }
};