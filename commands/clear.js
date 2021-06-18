module.exports = {
    name: 'clear',
    description: 'clear messages',
    
    execute(message, args) {
        const ammount = parseInt(args[0]);

        if (isNaN(ammount)) {
            return message.reply("ce n'est pas un nombre valide !");
        }
        else if (ammount < 1 || ammount > 256) {
            return message.reply("Le nombre doit être superieur a **0** et inferieur ou égal a **256**")
        } 

        message.channel.bulkDelete(ammount + 1)
        .then(messages => console.log(`${messages.size - 1} message supprimés`));
    }
};