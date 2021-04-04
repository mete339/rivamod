const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../Settings/Settings.json');
const db = require('quick.db');
exports.run = (client, message, args) => {

    //let kisi = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    //if(!kisi) return message.channel.send(`kiþi belirt`)

    message.guild.members.cache.forEach(u => {
        setTimeout(() => {
            (`${message.guild.members.cache.get(u.id).roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(',') ||
                u.roles.add("809763337305849877")}`.replace(`[object Promise]`, ""))
        }, 1000)
        db.add("nokayit", 1)
    })
    message.channel.send(
        new Discord.MessageEmbed()
            .setColor('f1f1f1')
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(`Hiçbir rolü olmayan \`${db.fetch("nokayit")}\` üyeye <@740511129083838494> rolü verildi.`))

    db.set("nokayit", 0)
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["rolleri"],
    permLevel: 0
};
exports.help = {
    name: "roller",
    category: 'rolleri',
    description: 'rolleri',
    usage: 'rolleri'
};// JavaScript source code
