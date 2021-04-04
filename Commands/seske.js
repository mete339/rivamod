const { MessageEmbed } = require('discord.js');
const config = require("../Settings/Settings.json")

exports.run = async (client, message, args) => {

    if (!["809763296252395570"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR")))
        return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak i�in yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({ timeout: 5000 }));

    const kanal = message.member.voiceChannel
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return;
    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullan�c� sizden �st/ayn� pozisyondad�r.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({ timeout: 5000 }));
    message.guild.member(member.id).voice.setChannel(null)

    message.channel.send(new MessageEmbed().setDescription(`${member} Kullanc�s�n�n ${message.author} Taraf�ndan Ba�lant�s� Kesildi.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#7289D').setTimestamp()).then(x => x.delete({ timeout: 10000 }));
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["ses-kes", "kes"]
}

exports.help = {
    name: "kes"
}

//code creator: sadxmamy// JavaScript source code
