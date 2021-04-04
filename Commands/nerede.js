const Discord = require("discord.js");
const ayarlar = require('../Settings/Settings.json');
module.exports.run= async(client, message, args) => {

let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

if(!user) {
  message.react('❌')
return message.channel.send(
new Discord.MessageEmbed()
     .setColor("RANDOM")
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`Kullanıcı belirtmelisin. Örnek: \`.nerede @kullanıcı\``)).then(m => m.delete({timeout: 8000}))
}

   let mikrofon = user.voice.selfMute ? " kapalı" : " açık";
 let kulaklik = user.voice.selfDeaf ? " kapalı" : " açık";
  
let sonuc 
if(!user.voice.channelID) sonuc = `${user} kullanıcısı bir sesli sohbete bağlı değil.`
if(user.voice.channelID) sonuc = (`${user} kullanıcısı şuan \`${user.voice.channel.name}\` sesli kanalında.\n  Ayrıca mikrofonu ${mikrofon}, kulaklığı ${kulaklik}`)
  
message.react('✅')
  
message.channel.send(
  new Discord.MessageEmbed()
     .setColor("RANDOM")
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(sonuc)).then(m => m.delete({timeout: 15000}))

}
module.exports.conf = {
aliases: ["n","nerde"]
}

module.exports.help = {
name: "nerede"
}