const util = require('minecraft-server-util');
 
module.exports = {
    name: 'mcserver',
    description: 'Lấy thông tin từ server\n Nếu không có port sever để <25565>',
    category: 'game',
    aliases: ['mcs'],
    usage: 'mcs <id server> <port server>',
    run: async (client, message, args, cmd) => {
        if(!args[0]) return message.channel.send('Hãy nhập server minecraft id');
        if(!args[1]) return message.channel.send('Hãy nhập server minecraft port');
        util.status(args[0], {port: parseInt(args[1])}).then((response) =>{
            console.log(response);
            const embed = new Discord.MessageEmbed()
            .setColor('#BFCDEB')
            .setTitle('Thông tin server')
            .addFields(
                {name: 'Server IP', value: response.host},
                {name: 'Số người online', value: response.onlinePlayers},
                {name: 'Số người tối đa', value: response.maxPlayers},
                {name: 'Phiên bản', value: response.version}
            )
            .setFooter('Server minecraft until by ....');
 
            message.channel.send(embed);
        })
        .catch ((error) =>{
            message.channel.send('Có một vài lỗi đang xảy ra...:(');
            throw error;
        })
    }
}