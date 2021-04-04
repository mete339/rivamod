const { MessageEmbed, Discord } = require('discord.js');
const ayarlar = require('../Settings/Settings.json');
const db = require('quick.db')
exports.run = async (client, message, args) => {
    //-------------------------------------------------------------------------------\\

    if (!["809763292939550742"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR")))
        return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak i�in yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL()({ dynamic: true })).setTimestamp()).then(x => x.delete({ timeout: 5000 }));

    //-------------------------------------------------------------------------------\\


    if (!args[0]) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bir ID belirtmelisin.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({ timeout: 5000 }));
    try {
        message.guild.fetchBan(args.slice(0).join(' '))
            .then(({ user, reason }) => message.channel.send(new MessageEmbed().setAuthor(user.tag, user.avatarURL()).setColor('0x348f36').addField('Banlanan Kullan�c�', `**${user.tag}** \`(${user.id})\``).setDescription(`**Ban Sebebi:** \`${reason}\``)))
    } catch (err) {
        message.channel.send(new MessageEmbed().setTimestamp().setColor('0x800d0d').setDescription('Belirtilen �D\'ye Ait Bir Ban Ge�mi�i Bulunamad�'))
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ban-info', 'ban-ge�mi�i'],
    permLevel: 0
};

exports.help = {
    name: 'ban-bilgi',
    kategori: 'yetkili'
};// JavaScript source code
