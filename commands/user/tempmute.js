const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'tempmute',
    category: 'user',
    aliases: ['tmute'],
    description: 'tắt tiếng tạm thời',
    usage: 'tmute <@tag> <time>',
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('❌Bạn không có quyền')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        if(!Member) return message.channel.send('Không tìm thấy người chơi')
        if(!time) return message.channel.send('Hãy cho thời gian câm lặng')
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send('Không tìm thấy vai trò bị ẩn, đang cố gắng tạo vai trò bị ẩn.')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Đã tạo thành công vai trò bị ẩn')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} đã sẵn sàng tắt tiếng.`)
        await Member.roles.add(role2)
        message.channel.send(`${Member.displayName} bây giờ đã được tắt tiếng.`)

        setTimeout(async () => {
            await Member.roles.remove(role2)
            message.channel.send(`${Member.displayName} đã hết thời gian tắt tiếng`)
        }, ms(time))
    }
}