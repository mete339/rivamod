const Discord = require('discord.js');//
const client = new Discord.Client();//
const Settings = require('./Settings/Settings.json');//
const Other = require('./Settings/Other.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./Util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = Settings.BotSettings.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./Commands/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} Adet Komut Yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./Commands/${f}`);//
        log(`[+] Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./Commands/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Commands/${command}`)];
            let cmd = require(`./Commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === Settings.BotSettings.Owner) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login("ODI3MTU4NDM5NTM2ODg1NzYx.YGW9Uw.NP_G9YArfjX6r6Tw2-4ddKCB0bA");

//-----------------------------------------------Komutlar------------------------------------------------\\
client.on("guildMemberAdd", async (member) => {
    member.roles.add(Settings.Roles.Unregister)
    member.setNickname(Settings.Welcome.WelcomeName)
    });
    
    client.on("message", async message => {
    if(!message.author.id == ("393067117169213440")) return;
    if (message.content === "gir") {
        client.emit(
            "guildMemberAdd",
            message.member || (await message.guild.fetchMember(message.author))
        );
    }
});
    

client.on("guildMemberAdd", phentos => {
    let tag = "Rivá";
    let tagsızSembolü = "•";
    if (phentos.user.username.includes(tag)) {
        phentos.setNickname(`${tag} İsim | Yaş`)
    } else {
        phentos.setNickname(`${tagsızSembolü} İsim | Yaş`)
    }
    phentos.roles.add("809763337305849877");


})



    client.on("ready", async () => {
      let botVoiceChannel = client.channels.cache.get(Settings.BotSettings.botVoiceChannelID);
      if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot Ses Kanalına Bağlanamıyor, Lütfen Ses Kanal ID'sini Kontrol Et."));
    });
    
    
    
    
client.on("guildMemberAdd", member => {
    require("moment-duration-format")
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if (üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
            return {
                '0': `<a:0_:810083466740760586>`,
                '1': `<a:1_:810083238189596682>`,
                '2': `<a:2_:810083256904318986>`,
                '3': `<a:3_:810083274554343426>`,
                '4': `<a:4_:810083291998847057>`,
                '5': `<a:5_:810083309136511006>`,
                '6': `<a:6_:810083325452353566>`,
                '7': `<a:7_:810083341238796300>`,
                '8': `<a:8_:810083357652156426>`,
                '9': `<a:9_:810083445539209256>`
            }[d];
        })
    }
    const kanal = member.guild.channels.cache.find(r => r.id === "810177190444269608");
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`)
    var kontrol;
    if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil.<a:796636246855647242:810187509115781191>'
    if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir.<a:yesil_ates:809781450122985482>'
    moment.locale("tr");
    kanal.send(`
<a:krmz_tac:809781482377576499> Sunucumuza hoş geldin <@`+ member + `>, hesabın \`` + gecen + `\` tarihinde oluşturulmuş ve ` + kontrol + `

     <a:krmz_tac:809781482377576499> Kayıt olmak için \`Taglı Alım ( Ϯ )\` odalarına geçip <@&826918932355088390> yetkilisine teyit vererek kayıt olabilirsin.

          <a:krmz_tac:809781482377576499> Sunucumuz \`Rivá\` tagını kullanıcı adına ekleyerek veya \`#0104\` etiketine alarak bizelerden birisi olabilirsin.

     <a:krmz_tac:809781482377576499> Seninle beraber sunucumuz toplam `+ üyesayısı + ` kişiye ulaştı bizi şereflendirdin ! 

<a:krmz_tac:809781482377576499> İçeride keyifli vakitler geçirmeni diler, sunucumuzun <#826918932933509156> kısmına göz atmanı tavsiye ederiz.`)



});
 
      
  //------------------------------------------------------------------------------------------------------------------------------------\\
    
    client.on("guildMemberAdd", member => {
        var moment = require("moment")
        require("moment-duration-format")
        moment.locale("tr")
         var {Permissions} = require('discord.js');
         var x = moment(member.user.createdAt).add(7, 'days').fromNow()
         var user = member.user
         x = x.replace("birkaç saniye önce", " ")
         if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
             const kytsz = Settings.Roles.Unregister
             
         var rol = member.guild.roles.cache.get(Settings.Roles.Suspicious) 
         var jail = member.guild.roles.cache.get(Settings.Roles.Jail)
         var kayıtsız = member.guild.roles.cache.get(kytsz) 
         member.roles.add(rol)
             member.roles.remove(kytsz)
            
    
      member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 7 Gün Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
      setTimeout(() => {
      
      }, 1000)
      
      
         }
              else {
      
              }
    });



    
    //------------------------------------------------------------------------------------------------------------------------------------\\
    
    
    //-----------------------TAG-ROL----------------------\\     
    
    client.on("userUpdate", async (losxstg, yeni) => {
      var sunucu = client.guilds.cache.get(Settings.ServerSettings.ServerID); 
      var uye = sunucu.members.cache.get(yeni.id);
      var tag = (Settings.ServerSettings.Tag); 
      var tagrol = (Settings.Roles.TagRole); 
      var logKanali = (Settings.Channels.TagLog); 
    
      if (!sunucu.members.cache.has(yeni.id) || yeni.bot || losxstg.username === yeni.username) return;
      
      if ((yeni.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
        try {
          await uye.roles.add(tagrol);
          await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
          await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor(Settings.Colors.Green).setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
        } catch (err) { console.error(err) };
      };
      
      if (!(yeni.username).includes(tag) && uye.roles.cache.has(tagrol)) {
        try {
          await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
          await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
          await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor(Settings.Colors.Red).setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
        } catch(err) { console.error(err) };
      };
    });
    //-----------------------TAG-ROL----------------------\\   
    
    //----------------------TAG-KONTROL----------------------\\     
    
    client.on("guildMemberAdd", member => {
      let sunucuid = (Settings.ServerSettings.ServerID); 
      let tag = (Settings.ServerSettings.Tag);
      let rol = (Settings.Roles.TagRole); 
    if(member.user.username.includes(tag)){
    member.roles.add(rol)
      const tagalma = new Discord.MessageEmbed()
          .setColor(Settings.Colors.Green)
          .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı.`)
          .setTimestamp()
         client.channels.cache.get(Settings.Channels.TagLog).send(tagalma)
    }
    })
    
    //-----------------------TAG-KONTROL----------------------\\  
  

client.on("userUpdate", async (oldUser, newUser) => { 
    let sunucu = `826918931921895495`;
    let kanal = `810089065298001950`;
    let taglı = `826918932346044435`;

    let tag = `Ϯ`;
    let discrim = `0104`;
    let untag = `•`;

  let channel = client.guilds.cache.get(sunucu).channels.cache.get(kanal);

  if (oldUser.username !== newUser.username) {
    if (
      newUser.username.includes(tag) &&
      !client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.cache.has(taglı)
        
    ) 
    if (
        newUser.discriminator.includes(discrim) &&
        !client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(taglı)
          
      )
      {
      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.add(taglı);

      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .setNickname(
          client.guilds.cache
            .get(sunucu)
            .members.cache.get(newUser.id)
            .displayName.replace(untag, tag)
        );

      channel.send(`${newUser} adlı kullanıcı tag alarak aramıza katıldı.`);
    }
    if (
      !newUser.username.includes(tag) &&
      client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.cache.has(taglı)
    ) {
      if (db.fetch(`taglıAlım.${sunucu}`)) {
        await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.remove(taglı);
        await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
            .roles.set(["809763337305849877"] || []);
      }
      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.remove(taglı);

      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .setNickname(
          client.guilds.cache
            .get(sunucu)
            .members.cache.get(newUser.id)
            .displayName.replace(tag, untag)
        );
      channel.send(`${newUser} adlı kullanıcı "${tag}" sembolünü kullanıcı adından kaldırarak ailemizden ayrıldı.`);
    }
  }
});








const iltifatlar = [
  'Kimse konuşmasın yalnız sen konuş bana. Yalnız sen bak gözlerimin içine. Kimse olmasın yalnızca sen ol benim hayatımda.',
  'Gülüşün güzelliğine anlam katıyor. Gamzelerin ise bambaşka diyarların kapılarını açıyor.',
  'Ateş gibi yakıyorsun ruhun ile beni. Gözlerin adeta ejderha, alev yayıyor etrafa.',
  'Hayatımda  verdiğim belki de en güzel karar seni sevmek olmuş.',
  'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
  'Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.',
  'Mucizelerden bahsediyordum. Tam o sırda gözlerin geldi aklıma.',
  'En güzel manzaramsın benim, seyretmeye doyamadığım.',
  'Gözlerinle baharı getirdin garip gönlüme.',
  'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
  'Mavi gözlerin, gökyüzü oldu dünyamın.',
  'Seni gören kelebekler, narinliğin karşısında mest olur.',
  'Huzur kokuyor geçtiğin her yer.',
'616 bin 717 kelimenin hic birisi seni anlatmaya yetmiyor',
  'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
  'Ben seni seçtim bu hayatta mutlu olabilmek için.',
  'Sen bu dünyadaki 7 harikadan bile daha harika bir varlıksın. Sen gönlümün ebedi sultanısın.',
  'Sen bir yalan olsan ben yalanı bile  severim. Yeter ki seni sevmek olsun tek mesele.',
'Sizin evin karşısındaki bina pahalidir senin gibi bir manzarası oldugu için',
'Gözlerinin güzelliğinde kayboldum bügün',
"Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi...",
"Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.",
"Bu dünyanın 8. harikası olma ihtimalin?",
  "Fıstık naber?",
"Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
  "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
"Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
  "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın."



];

client.on("message", async message => {
    if (message.channel.id !== "809763574091481108") return;
  let codeAcademy = db.get('chatiltifat');
  await db.add("chatiltifat", 1);
  if(codeAcademy >= 60) {
    db.delete("chatiltifat");
    const random = Math.floor(Math.random() * ((iltifatlar).length - 1) + 1);
    message.reply(`**${(iltifatlar)[random]}**`);
  };
});




client.on("guildMemberUpdate", member => {
let rol = ""
let kanal = ""
if(rol) return client.channels.cache.get(kanal).send("Sunucumuza boost bastığın için tşk")

})


//////////////////////////////


client.on("message", message => {
    if (message.content.toLowerCase() == "!tag")
        return message.channel.send(`Rivá`)
});

client.on("message", message => {
    if (message.content.toLowerCase() == "-tag")
        return message.channel.send(`Rivá`)
});

client.on("message", message => {
    if (message.content.toLowerCase() == "u!tag")
        return message.channel.send(`Rivá`)
});

client.on("message", message => {
    if (message.content.toLowerCase() == "u.tag")
        return message.channel.send(`Rivá`)
});

client.on("message", message => {
    if (message.content.toLowerCase() == "u-tag")
        return message.channel.send(`Rivá`)
});

client.on("message", message => {
    if (message.content.toLowerCase() == ".tag")
        return message.channel.send(`Rivá`)
});

client.on("message", message => {
    if (message.content.toLowerCase() == "tag")
        return message.channel.send(`Rivá`)
});

//------------------------------------------------------------------------------------------------------------\\

client.on("message", message => {
    if (message.content.toLowerCase() == "sa")
        return message.channel.send(`${message.author}, Aleyküm Selam.`)
});

client.on("message", message => {
    if (message.content.toLowerCase() == "selam")
        return message.channel.send(`${message.author}, Selam hoşgeldin.`)
});

client.on("message", message => {
    if (message.content.toLowerCase() == "merhaba")
        return message.channel.send(`${message.author}, Merhaba hoşgeldin.`)
});

client.on("message", message => {
    if (message.content.toLowerCase() == "Naber")
        return message.channel.send(`iyiyiz,sen nasılsın ?`)
});

client.on("message", message => {
    if (message.content.toLowerCase() == "s.a")
        return message.channel.send(`${message.author}, Aleyküm Selam.`)
});

client.on("message", message => {
    if (message.content.toLowerCase() == "mrb")
        return message.channel.send(`${message.author}, Aleyküm Selam.`)
});

client.on("message", message => {
    if (message.content.toLowerCase() == "slm")
        return message.channel.send(`${message.author}, Selam hoşgeldin.`)
});



///// GİRİŞ ÇIKIŞ LOG \\\\\\
client.on('guildMemberAdd', async (member) => {
    let zaman = new Date().getTime() - member.user.createdAt.getTime()
    let gecen = moment.duration(zaman).format(` YY **[yıl,]** DD **[gün]** `)
    let kanal = `826918934820290599`
    const embed = new Discord.MessageEmbed()
        .setColor('44b482')
        .setTimestamp()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setDescription(`
<@${member.id}> (\`${member.id}\`) katıldı!
Hesabı \`${gecen}\` önce oluşturulmuş.
Toplam üye sayısı \`${member.guild.memberCount}\``)
    client.channels.cache.get(kanal).send(embed)
})
///////
client.on('guildMemberRemove', async (member) => {
    let kanal = `826918934820290599`
    const embed = new Discord.MessageEmbed()
        .setColor('f04845')
        .setTimestamp()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setDescription(`
<@${member.id}> (\`${member.id}\`) ayrıldı!
Toplam üye sayısı \`${member.guild.memberCount}\``)
    client.channels.cache.get(kanal).send(embed)
})



// CHAT LOG \\
client.on("messageDelete", async message => {
    if (message.author.bot) return;

    var yapan = message.author;

    var kanal = await db.fetch(`chatlog_${message.guild.id}`);
    if (!kanal) return;
    var kanalbul = message.guild.channels.cache.find(r => r.name === kanal);

    const chatembed = new Discord.MessageEmbed()
        .setColor("f04845")
        .setAuthor(`Bir Mesaj Silindi!`, yapan.avatarURL())
        .addField("Kullanıcı", `<@${yapan.id}>`, true)
        .addField("Silindiği Kanal", message.channel, true)
        .addField("Silinen Mesaj", "```" + message.content + "```" + `[Mesaja git!](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
        .setThumbnail(yapan.avatarURL());
    kanalbul.send(chatembed);
});
//////////
client.on("messageUpdate", async (oldMsg, newMsg) => {
    if (oldMsg.author.bot) return;

    var yapan = oldMsg.author;

    var kanal = await db.fetch(`chatlog_${oldMsg.guild.id}`);
    if (!kanal) return;
    var kanalbul = oldMsg.guild.channels.cache.find(r => r.name === kanal);

    const chatembed = new Discord.MessageEmbed()
        .setColor("7289da")
        .setAuthor(`Bir Mesaj Düzenlendi`, yapan.avatarURL())
        .addField("Kullanıcı", `<@${yapan.id}>`, true)
        .addField("Düzenlendiği Kanal", newMsg.channel, true)
        .addField("Eski Mesajı", "```" + oldMsg.content + "```")
        .addField("Yeni Mesajı", "```" + newMsg.content + "```" + `[Mesaja git!](https://discordapp.com/channels/${newMsg.guild.id}/${newMsg.channel.id}/${newMsg.id})`)
        .setThumbnail(yapan.avatarURL());
    kanalbul.send(chatembed);
});
// CHAT LOG \\