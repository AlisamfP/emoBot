var irc = require('irc');
var emoji = require('emo/lib/emotes');

var bot = new irc.Client('irc.freenode.net', 'gifbot',{channels: ['#testingbots']});

bot.addListener('message', function (from, to, text){
    var message = text.split(/[, ]+/);
    if(message.indexOf('emoji') != undefined){
        index = message.indexOf('emoji');
        var tag = message[index+2] != undefined ? message[2] : '';
        bot.say(to, emoji.select(tag).string);
        console.log(emoji.getTags())
    }
});

bot.addListener('error', function (error){ console.log(error); })

bot.join('#testingbots');



