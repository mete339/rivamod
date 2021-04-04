const codare = require('discord.js');
const ayarlar = require('../Settings/Settings.json');
exports.run = async (client, message) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.react('❌')
        return message.channel.send(`Bu komutu kullanmaya iznin yok `).then(m => m.delete({ timeout: 8000 }))
    }
    let yetkili = message.guild.roles.cache.get("809763305878847498");

    let ses = message.guild.members.cache.filter(kullanici => kullanici.roles.highest.position >= yetkili.position && !kullanici.voice.channel && !kullanici.user.bot && kullanici.presence.status !== "offline");
    {
        message.react('✅')
        message.channel.send(new codare.MessageEmbed().addField(`Aktif olup seste olmayan yetkili sayısı:`, `**${ses.size}**\n${ses.map(y => y).join(', ')}`).setColor("RANDOM"))
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['yetkilitarama', 'yetkili-tara', 'ytara', 'yetkili-tarama', 'yetkilitara', "ytarama", "yetkilitaraması", "yetkili-taraması"],
    permLevel: 0
};

exports.help = {
    name: 'yetkilitarama',
    description: 'Seste olmayan yetkilileri gösterir.',
    usage: 'yetkilitara',
};// JavaScript source code
