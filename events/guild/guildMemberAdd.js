module.exports = (Discord, client, guildMember) => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === '👤・Membres');

    guildMember.roles.add(welcomeRole)

}