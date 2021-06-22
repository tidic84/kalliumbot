module.exports = (Discord, client) => {
    console.log('Ready !');
    client.user.setActivity('Kallium', { type: 'WATCHING', url: 'https://twitch.tv/'});
}