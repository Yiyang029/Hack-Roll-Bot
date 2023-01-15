module.exports = {
    name: 'iamreply',
    description: 'a sad dad joke',
    execute(message) {
        const jokemessage = message.content;
        const newMessage = jokemessage.split(" ");
        let replyArray = [];
        for(let i=0; i< newMessage.length; i++) {
            if (newMessage[i] === "I'm" || newMessage[i] === "i'm" || newMessage[i] === "Im" || newMessage[i] === "im") {
                    
                replyArray = newMessage.slice(i + 1);
                const reply = replyArray.join(" ");
                message.channel.send(`Hello ${reply}, I'm F bot!`);
                break;
            } else if (newMessage[i] === "i" || newMessage[i] === "I") {
                if (newMessage[i + 1] === "m" || newMessage[i + 1] === "am") {
                    replyArray = newMessage.slice(i + 2);
                    const reply = replyArray.join(" ");
                    message.channel.send(`Hello ${reply}, I'm F bot!`);
                    break;
                } else { continue; }
            } 
        }
            
    }
}