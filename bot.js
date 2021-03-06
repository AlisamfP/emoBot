var irc = require('irc');
var emoji = require('emo/lib/emotes');
var _ = require('lodash');

var bot = new irc.Client('irc.freenode.net', 'emobot',{channels: ['#testingbots']});

bot.addListener('message', function (from, to, text){
    text = text.toLowerCase();
   var message = text.split(/[, ]+/).slice(text.split(/[, ]+/).indexOf('emobot'));
    if (_.contains(message, 'emobot')){
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
            else if(_.contains(message, 'tags')){
                var tags = emoji.getTags();
                tags = tags.join(', ');
                bot.say(from, tags);
            }
            else{
                bot.say(to, 'NOPE');
            }
        }
    }
});

bot.addListener('error', function (error){ console.log(error); })

bot.join('#testingbots', function(){
    bot.say('#testingbots', 'Type EMOBOT [tag] for an emoticon. <EMOBOT tags> will send a pm with all available tags.');
})



