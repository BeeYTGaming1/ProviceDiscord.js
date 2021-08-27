const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    name: "rps",
    category: "game",
    description: "Kéo búa bao game. Chọn icon để ra lựa chọn",
    usage: "rps",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
            .setDescription("Hãy chọn một emoji nào!")
            .setTimestamp();

        const m = await message.channel.send(embed);
        // Wait for a reaction to be added
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        // Get a random emoji from the array
        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        // Check if it's a win/tie/loss
        const result = await getResult(reacted, botChoice);
        // Clear the reactions
        m. reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);

        function getResult(me, clientChosen) {
            if ((me === "🗻" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🗻") ||
                (me === "✂" && clientChosen === "📰")) {
                    return "Bạn thắng";
            } else if (me === clientChosen) {
                return "Hòa rồi";
            } else {
                return "Bạn thua rồi";
            }
        }
    }
}