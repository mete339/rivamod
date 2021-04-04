const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require("../Settings/Settings.json");
exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarlar.yasak_emoji} ${ayarlar.yonetici}`).then(msg => msg.delete(ayarlar.yetersiz));

    let kanal = message.mentions.channels.first()
    if (args[0] === "s�f�rla") {
        if (!args[0]) {
            message.channel.send(`${ayarlar.deaktif} Mesaj log kanal� zaten ayarlanmam��.`)
            return
        }
        db.delete(`chatlog_${message.guild.id}`)
        message.channel.send(`${ayarlar.deaktif} Mesaj log kanal� ba�ar�yla s�f�rland�.`)
        return
    }
    if (!kanal) {
        return message.channel.send(`Mesaj log kanal�n� etiketlemelisiniz.`)
    }
    db.set(`chatlog_${message.guild.id}`, kanal.name)

    const chatembed = new Discord.MessageEmbed()
        .setDescription(`${ayarlar.aktif} Mesaj log ba�ar�yla ${kanal} kanal� olarak ayarland�.`)
        .setColor("44b482")
    message.channel.send(chatembed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["chatlog", "mesajlog", "mesaj-log"],
    permLevel: 0
}
exports.help = {
    name: 'chat-log',
    description: 'Log kanal�n� ayarlar..',
    usage: 'log-ayarla '
}// JavaScript source code
