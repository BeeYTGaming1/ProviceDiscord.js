const { MessageEmbed } = require('discord.js');

module.exports = {
  name: '8ball',
  description: 'Đặt câu hỏi và để bot quyết định số phận của bạn :sparkler:\n Đừng lên quá tin các lựa chọn là ngẫu nhiên',
  category: 'game',
  usage: '8ball <quest>',
  run: async (client, message, args, cmd) => {
    if (!args[0]) return message.channel.send('Hãy nói đầy đủ câu hỏi!'); // return if no question is commenced
    const replies = ['Có.', 'Không.', 'Đừng bao giờ.', 'Chắc chắn.', 'Nói lại sau.']; // random responses

    const result = Math.floor(Math.random() * replies.length); // Get a random respons for the array
    const question = args.join(' '); // join the args(Array<string>) to a question string
    // check permissions for embed
    if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
      const embed = new MessageEmbed() // create embed 
        .setAuthor('🎱 Quả bóng đã nói...')
        .setColor('RANDOM').addField('Question:', question)
        .addField('Answer:', replies[result]);
      await message.channel.send(embed); // send embed message
    } else {
      await message.channel.send(`**Câu hỏi:**\n${question}\n**Trả lời:**\n${replies[result]}`); // no permissins so bot will default to a raw message
    }
  },
};