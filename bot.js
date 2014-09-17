var irc = require('irc');
var emoji = require('emo/lib/emotes');
var _ = require('lodash');

var bot = new irc.Client('irc.freenode.net', 'gifbot',{channels: ['#testingbots']});

bot.addListener('message', function (from, to, text){
   var message = text.split(/[, ]+/);
    if (_.contains(message, 'emoji')){
        var tag = message.shift();
        console.log(tag)
        if(_.isEmpty(tag)){
            bot.say(to, emoji.select().string)
        }
        else{
            tag = tag.join(' ');
            if(_.contains(emoji.getTags(), tag)){
                bot.say(to, emoji.select(tag).string);
            }
            else{
                bot.say(to, 'tag not supported');
            }
        }
    }
});

bot.addListener('error', function (error){ console.log(error); })

bot.join('#testingbots');



