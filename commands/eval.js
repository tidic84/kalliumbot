 module.exports = {
    name: "eval",

    async execute(client, message, args) {
        function clean(text) {
            if (typeof text === "string") 
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            return text;
          }
         
          if (message.author.id == "806520166208503809") {
          const code = args.join(" ");
          const evaled = eval(code);
          const cleanCode = await clean(evaled);
          message.channel.send(cleanCode, { code: "js" });
          } else {
            return `Chutt !! Cette commande n'existe pas`
          }
        }
  
};