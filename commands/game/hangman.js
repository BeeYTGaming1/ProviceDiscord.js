const { hangman } = require('reconlx')

module.exports = {
    name : 'hangman',
    category: 'game',
    run: async (client, message, args, cmd) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You need manage messages permission.')

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.channel.send('Hãy cho một kênh')
        const word = args.slice(1).join(" ")
        if(!word) return  message.channel.send('Hãy cho một từ khóa')

        const hang = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: channel.id,
        })

        hang.start();
    }
}