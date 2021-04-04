const Discord = require("discord.js");

const ms = require("ms");
exports.run = function (client, message, args) {
    let dogum = "809763262739644448"; //791783473538007050

    if (
        !message.member.roles.cache.has("809763249033183282") &&
        !message.member.roles.cache.has("809763252321779749") &&
        !message.member.roles.cache.has("7809763255291215921")
    ) {
        message.react("❌");
        return message.channel
            .send(
                new Discord.MessageEmbed()
                    .setDescription(
                        `Bu komutu kullanabilmek için <@&789224320396165130> rolüne sahip olmalısın.`
                    )
                    .setColor(ayarlar.kirmizi)
            )
            .then(m => m.delete({ timeout: 8000 }));
    }

    let uye =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
    if (!uye) {
        message.react("❌");
        return message.channel
            .send(
                new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription(
                        `Kullanıcıyı belirtmelisin. Örnek: \`.doğumgünü @etiket/ID\``
                    )
            )
            .then(m => m.delete({ timeout: 8000 }));
    }
    let rol = dogum;

    message.react("✅");

    uye.setNickname(
        `${uye.nickname}`
            .replace("26", "27")
            .replace("25", "26")
            .replace("24", "25")
            .replace("23", "24")
            .replace("22", "23")
            .replace("21", "22")
            .replace("20", "21")
            .replace("19", "20")
            .replace("18", "19")
            .replace("17", "18")
            .replace("16", "17")
            .replace("15", "16")
            .replace("14", "15")
            .replace("13", "14")
            .replace("12", "13")
            .replace("11", "12")
            .replace("10", "11")
            .replace("9", "10")
    );

    message.channel
        .send(
            new Discord.MessageEmbed()
                .setColor("ffc107")
                .setAuthor(`${uye.user.tag}`, uye.user.avatarURL())
                .setDescription(
                    `${uye} kullanıcısına başarıyla <@&${rol}> rolü verildi. 24 saat sonra kullanıcıdan rol otomatik alınacaktır.`)).then(m => m.delete({ timeout: 15000 }))

    message.channel.send(`Hey ${uye} **${uye.nickname}.** yaş günün kutlu olsun, nice mutlu yıllara.. 🎉`.replace("!", "").replace("26", "27").replace("25", "26").replace("24", "25").replace("23", "24").replace("22", "23").replace("21", "22").replace("20", "21").replace("19", "20").replace("18", "19").replace("17", "18").replace("16", "17").replace("15", "16").replace("14", "15").replace("13", "14").replace("12", "13").replace("11", "12").replace("10", "11").replace("9", "10").replace(uye.nickname, " "))

    uye.roles.add(rol)

    setTimeout((archilles) => {
        let uye2 = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        let rol2 = dogum
        uye2.roles.remove(rol2)
        message.channel.send(`${uye2} kullanıcısına başarıyla <@&${rol}> rolü alındı. Seneye görüşürüz dostum!`).catch(archilles => message.channel.send(`${uye2} kullanıcısına başarıyla <@&${rol}> rolü alındı. Seneye görüşürüz dostum!`))
    }, ms(`1d`));

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["doğumgünüçocuğu", "doğum-günü-çocuğu", "doğumgünü", "doğum-günü", "dogumgunu", "dogum-gunu"],
    permLevel: 0
};
exports.help = {
    name: 'dgç',
    description: 'Doğum günü sistemi',
    usage: 'dogum'
};// JavaScript source code
