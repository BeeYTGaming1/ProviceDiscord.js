const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'avatar',
    category: 'user',
    aliases: ['ava'],
    description: 'Tải avatar của bạn bè',
    usage: 'avatar <@tag>',
    run: (client, message, args, cmd) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        const URL = member.user.avatarURL({ format: 'jpg', dynamic: true, size: 1024 })
        const avatarEmbed = new MessageEmbed()
            .setImage(URL)
            .setURL(URL)
            .setTitle('DownLoad Here')
        message.channel.send(avatarEmbed)
    }
}