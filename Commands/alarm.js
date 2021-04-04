const Discord = require('discord.js');
const ms = require('ms');
const ayarlar = require("../Settings/Settings.json");
exports.run = async(client, message, args) => {
  let sure = args[0];
  let hatirlatilacak = args.slice(1).join(' ');
  if (!sure || !ms(sure) || !hatirlatilacak) return message.channel.send(
        new Discord.MessageEmbed() 
.setColor('RANDOM')
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.setDescription(`Süresini ve sebebini belirtmelisin. Örnek: \.alarm <süre> <sebep>\``))

  let time = sure.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
  
  message.channel.send(`:alarm_clock: <@${message.author.id}> Alarmın kuruldu sana bunu ${time} sonra hatırlatacağım.`);
  setTimeout((archilles) => {
message.channel.send(hatirlatilacak);
    message.author.send(hatirlatilacak).catch(archilles => message.channel.send(`${message.author} DM mesajların kapalı olduğu için alarmin sunucudan yapıldı!`));
message.author.send(`:alarm_clock: ${message.author} \`${hatirlatilacak}\` sebebiyle alarm kurmamı istemiştin!`).catch(archilles => message.channel.send(`:alarm_clock: ${message.author} \`${hatirlatilacak}\` sebebiyle alarm kurmamı istemiştin!`));
  }, ms(sure));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['hatırlatıcı', 'hatirlat','hatırlat','hatirlatici',"alarm","alarmkur","alarm-kur","alarmayarla","alarm-ayarla","alarmiayarla","alarmi-ayarla"],
  permLevel: 0
};

exports.help = { 
  name: 'hatırlat', 
  description: 'Hatırlatıcı.',
  usage: 'hatırlat <süre> <hatırlatılacak şey>',
  kategori: 'kullanıcı'
};