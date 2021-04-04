const Discord = require("discord.js");
const ayarlar = require("../Settings/Settings.json");
module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has("") && !message.member.roles.cache.has("") && !message.member.hasPermission('ADMINISTRATOR')) {
        message.react('❌')
        return message.channel.send(
            new Discord.MessageEmbed()
                .setDescription(`Bu komutu kullanabilmek için <@&799705453965344808> rolüne sahip olmalısın.`)
                .setColor(ayarlar.kirmizi)).then(m => m.delete({ timeout: 8000 }))
    }

    let csc =
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]);
    if (!csc) {
        message.react('❌')
        return message.channel.send(`Ses kanalı ID'si belirtmelisin. Örnek \`.sesliye-rol-ver <kanal> <rol>\``);
    }
    let csr =
        message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
    if (!csr) {
        message.react('❌')
        return message.channel.send(`Verilecek rolü belirtmelisin. Örnek \`.sesliye-rol-ver <kanal> <rol>\``);
    }
    if (message.guild.channels.cache.get(csc.id)) {
        message.guild.channels.cache.get(csc.id).members.map(csm => {
            if (csm) {
                csm.roles.add(csr);
            }
        });
    }

    message.channel.send(
        new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(csr.hexColor)//
            .setDescription(
                `Başarıyla \`` +
                csc.members.size +
                `\` kullanıcıya ${csr} rolü verildi!`
            ));

    message.react('✅')
};
module.exports.conf = {
    aliases: ["seserolver", "sese-rol-ver", "seslidekilererolver", "seslidekilere-rol-ver", "sesliyerolver", "sesliye-rol-ver", "sesliyever", "sesliye-ver", "seslidekilerever", "seslidekilere-ver", "sestekilererolver", "sestekilere-rol-ver"]
};

module.exports.help = {
    name: "srv"
};// JavaScript source code
