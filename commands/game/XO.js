const { tictactoe } = require('reconlx')

module.exports = {
    name : 'tictactoe',
    description: 'Chơi tictactoe với recon',
    category: 'game',
    usage: 'tictactoe',
    aliases: ['ttt'],
	run: async (client, message, args, cmd) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Hãy chọn một người chơi cùng')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}