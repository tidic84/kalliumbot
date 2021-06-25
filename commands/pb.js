const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../colors.json')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
    name: 'pb',
    description: 'template',
    
    async execute(client, message) {

        const step0 = "░░░░░░░░░░"
        const step = [
            "█░░░░░░░░░",
            "██░░░░░░░░",
            "███░░░░░░░",
            "████░░░░░░",
            "█████░░░░░",
            "██████░░░░",
            "███████░░░",
            "████████░░",
            "█████████░",
            "██████████"
        ]


        const embed = new MessageEmbed()
            .setTitle('ProgressBar')
            .setDescription('|░░░░░░░░░░|')
            .setColor(`${blue}`)
        msg = await message.channel.send(embed);

        const receivedEmbed = msg.embeds[0];

        for(i = 0; i< step.length; i++){
            const embed2 = new MessageEmbed(receivedEmbed)
                .setDescription(`|${step[i]}|`)
            await delay(500)
            msg.edit({embed: embed2});
        }

    }
};