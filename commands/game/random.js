const { MessageCollector, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'number',
    aliases: ['nb'],
    description: 'Chơi game cùng recon',
    category: 'game',
    usage: '',
    
	run: async (client, message, args, cmd) => {
        let number = Math.ceil(Math.random() * 10000);
        let finished = false;

        message.channel.send(
            new MessageEmbed()
            .setTitle(`Đoán số`)
            .setDescription(`Đoán số từ (1-10000) bạn có \`1 phút\``)
            .setColor('RANDOM')
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        )

        let collector = new MessageCollector(message.channel, msg => msg.author.id == message.author.id, {
            time: 60000,
        });

        let tries = 0;

        collector.on('collect', async(msg) => {
            if(finished == false) {
                let split = msg.content.split(/ +/);
                let attempt = split.shift();

                if(isNaN(attempt)) return message.reply(`Bạn phải chọn một số thực tế`);

                tries++;
    
                if(parseInt(attempt) !== number) return message.reply(`Sai rồi. Hãy thử lại nha (Con số của tôi là ${parseInt(msg) < number ? 'Cao hơn' : 'Thấp hơn'} so với ${parseInt(msg)})`)
    
                finished = true;
    
                message.channel.send(
                    new MessageEmbed()
                    .setTitle(`👏Chính xác`)
                    .setDescription(`${parseInt(msg)} Là kết quả chính xác:ok_hand:`)
                    .setFooter(`Bạn chỉ mất ${tries} thời gian để đoán`)
                    .setTimestamp()
                    .setColor('GREEN')
                )
            }
        });
        
        collector.on('end', async(collected) => {
            if(finished == false) return message.reply(`😲Hêt giờ rồi...`);
        });
    }
}