const Discord = require('discord.js');
const moment = require('moment');
moment.locale('tr');

exports.run = (client, message, args) => {

let mention = message.author;
if(message.mentions.members.first()) mention = message.mentions.members.first().user;
let mentionMember = message.guild.members.cache.get(mention.id);

let slm = {
  web: 'İnternet Tarayıcısı',
  desktop: 'Bilgisayar',
  mobile: 'Mobil'
}
let oyunlar = [];
mention.presence.activities.forEach(slm => {
if(slm.type === 'CUSTOM_STATUS') {
oyunlar.push(`${slm.emoji ? slm.emoji : ''} ${slm.state}`);
} else {
oyunlar.push(`**${slm.name}** ${slm.type.replace('PLAYING', 'oynuyor').replace('STREAMING', 'yayınlıyor').replace('LISTENING', 'dinliyor').replace('WATCHING', 'izliyor')}`)
}});

let rozetler = false;
if(mention.flags.toArray().length <= 0) {
rozetler = false;
} else {
rozetler = true;
};

let mentionFlags = mention.flags.toArray().join(' ')
.replace('HOUSE_BRAVERY', '<:bravery_arc:798467340408586250> Bravery')  
.replace('HOUSE_BRILLIANCE', '<:brilliance_arc:798467341796114472> Brilliance')
.replace('HOUSE_BALANCE', '<:balance_arc:798467341049659403> Balance')
.replace('VERIFIED_DEVELOPER', '<:botdev_arc:798467341825998898> Erken Onaylanan Geliştirici')
.replace('DISCORD_EMPLOYEE', '<:staff_arc:798467341217431554> Discord Çalışanı')
.replace('PARTNERED_SERVER_OWNER', '<:partner_arc:798467340643598346> Discord Partner')
.replace('HYPESQUAD_EVENTS', '<:hypesquad_arc:798467341528072233> HypeSquad Etkinlikleri')
.replace('BUGHUNTER_LEVEL_1', '<:bughunter_arc:798467342203486209> Bug Avcısı 1. Lvl')
.replace('EARLY_SUPPORTER', '<:earlysupporter_arc:798467342006616084> Erken Dönem Destekçisi')
.replace('TEAM_USER', 'Takım Üyesi')
.replace('SYSTEM', 'Sistem')
.replace('BUGHUNTER_LEVEL_2', 'Bug Avcısı 2. Lvl')
.replace('VERIFIED_BOT', '<:onayli:798471075687694368> Onaylı Bot');
let sa;
if(mention.bot) {
sa = 'Bilinmiyor.'
} else {
sa = slm[Object.keys(mention.presence.clientStatus)[0]];
};
const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setAuthor(mention.tag, mention.avatarURL({dynamic: true}))
.setThumbnail(mention.avatarURL({dynamic: true}))
.addField('Durum', mention.presence.status.replace('online', 'Çevrimiçi').replace('idle', 'Boşta').replace('dnd', 'Rahatsız Etmeyin').replace('offline', 'Çevrimdışı'), true)
.addField('İstemci Durumu', sa, true)
.addField('Ad', mention.username+` (${mention})`, true)
.addField('Takma Ad', mentionMember.displayName, true)
.addField('Katılma Tarihi', moment(mentionMember.joinedAt).format('D MMMM YYYY'), true)
.addField('Kayıt Tarihi', moment(mention.createdAt).format('D MMMM YYYY'), true)
.addField('Aktivite', oyunlar.join('\n') ? oyunlar.join('\n') : 'Hiç yok.')
.addField('Roller', mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') : 'Hiç yok.')
.addField('Rozetleri', `${rozetler ? mentionFlags : 'yok'}`)
.addField('Kullanıcı Kimliği', mention.id)
.setDescription(`İstemci Durumu: ${sa}`)
.setFooter(mention.username, mention.avatarURL({dynamic: true}))
.setTimestamp();

message.channel.send(embed);
}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kb","kullanıcıbilgi","kullanıcı-bilgi"],
  permLevel: 0
};
 
exports.help = {
  name: 'kb'
};