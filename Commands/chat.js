const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require("../Settings/Settings.json");
exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarlar.yasak_emoji} ${ayarlar.yonetici}`).then(msg => msg.delete(ayarlar.yetersiz));

    let kanal = message.mentions.channels.first()
    if (args[0] === "sýfýrla") {
        if (!args[0]) {
            message.channel.send(`${ayarlar.deaktif} Mesaj log kanalý zaten ayarlanmamýþ.`)
            return
        }
        db.delete(`chatlog_${message.guild.id}`)
        message.channel.send(`${ayarlar.deaktif} Mesaj log kanalý baþarýyla sýfýrlandý.`)
        return
    }
    if (!kanal) {
        return message.channel.send(`Mesaj log kanalýný etiketlemelisiniz.`)
    }
    db.set(`chatlog_${message.guild.id}`, kanal.name)

    const chatembed = new Discord.MessageEmbed()
        .setDescription(`${ayarlar.aktif} Mesaj log baþarýyla ${kanal} kanalý olarak ayarlandý.`)
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
    description: 'Log kanalýný ayarlar..',
    usage: 'log-ayarla '
}// JavaScript source code
