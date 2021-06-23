const Discord = require('discord.js');
const client = new Discord.Client()
require('./util/functions')(client);


const mongoose = require("mongoose");

const { token , MONGODB_SRV} = require('./config')


client.commands = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(token);

mongoose.connect(MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch((error) => {
    console.log(error)
}).then(()=>{
    console.log("Connected to the database")
});

