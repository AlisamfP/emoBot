var irc = require('irc');
var emoji = require('emo/lib/emotes');
var _ = require('lodash');

var bot = new irc.Client('irc.freenode.net', 'emobot',{channels: ['#phxtech']});

bot.addListener('message', function (from, to, text){
   var message = text.split(/[, ]+/);
    if (_.contains(message, 'emoji')){
        message.shift();
        if(_.isEmpty(message)){
            console.log('empty array');
            bot.say(to, emoji.select().string)
        }
        else{
            message = message.join(' ');
            if(_.contains(emoji.getTags(), message)){
                bot.say(to, emoji.select(message).string);
            }
            else{
                bot.say(to, 'NOPE');
            }
        }
    }
});

bot.addListener('error', function (error){ console.log(error); })

bot.join('#testingbots');



