module.exports = {
    name: "inspo",
    description: "inspires you!",
    execute(message) { 
        
        const Quotes = require("randomquote-api");
        
        const num = Math.floor(Math.random() * 100);
        if (num <= 50) {
            if (!message.author.bot) {
                const randomquote = Quotes.randomQuote().quote;
                console.log(randomquote);
                message.channel.send(randomquote);
            }
        }
    
  }

}
