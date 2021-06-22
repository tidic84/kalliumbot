const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../../colors.json')

module.exports = async (Discord, client, member) => {
    const settings = await client.getGuild(member.guild);
    var today = new Date();
    month = today.toLocaleString('fr-FR', { month: 'long' })
    var date = today.getDate()+' '+month+' '+ today.getFullYear()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // AutoRole
    let welcomeRole = member.guild.roles.cache.find(role => role.name === '👤・Membres');
    member.roles.add(welcomeRole)

    // Join Message
    const channel = client.channels.cache.get(settings.welcomeChannel);
    let msg = settings.welcomeMessage;
    if (msg.includes("{{USER}}")) msg = await msg.replace("{{USER}}", member);
    if (msg.includes("{{SERVER_NAME}}")) msg = await msg.replace("{{SERVER_NAME}}", member.guild);
    const embed = new MessageEmbed()
        .setTitle('Heyy !!')
        .setDescription(msg)
        .setImage(member.user.displayAvatarURL({ dynamic : true}))
        .setColor(`${blue}`)
        .setFooter(date)
    try {
    channel.send(embed)
    } catch (error) {
        console.log(error)
    }
 

}