// Commande a ne pas utiliser, ne marche que sur mon serveur

module.exports = {
    name: "admin",

    execute(client, message, settings, args){
        let user = message.member
        user.roles.add(user.guild.roles.cache.find(role => role.name === '👑・Owner'));
    }
}