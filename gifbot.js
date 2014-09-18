var irc = require('irc');
var _   = require('lodash'); 

var testRoom = '#testingbots';
var publicBetakey = 'dc6zaTOxFJmzC';

var bot = new irc.Client('irc.freenode.net', 'gif_bot', {channels: [testRoom]});

function init(){
    bot.addListener('error', function(error){ console.log('error: ' + error);} );
    bot.addListener('register', function(message){ console.log('registered: ' + message); });
    bot.join(testRoom, function(){
        bot.say(testRoom, 'I AM A BOT THAT WILL GIVE YOU GIFS')
        console.log('connected to ' + testRoom);
    });
    findGifs();
}

function findGifs(){
    bot.addListener('message', function (from, to, text){
        if(_.contains(text, 'gif me')){
            text = text.split(/[, ]+/).slice(text.split(/[, ]+/).indexOf('me'));
            text.shift();
            bot.say(to, text);
        }
    })
}

init();