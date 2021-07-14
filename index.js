const Discord = require('discord.js');
const client = new Discord.Client();
require('./util/functions')(client);


const mongoose = require("mongoose");

require('discord-buttons')(client) ;

client.commands = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.TOKEN);

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch((error) => {
    console.log(error)
}).then(()=>{
    console.log("Connected to the database")
});

