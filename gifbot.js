var irc = require('irc');
var _   = require('lodash');
var request = require('request');

var testRoom = '#testingbots';
var publicBetakey = '&limit=1&api_key=dc6zaTOxFJmzC';

var bot = new irc.Client('irc.freenode.net', 'gif_bot', {channels: [testRoom]});

function init(){
    bot.addListener('error', function(error){ console.log('error: ' + error);} );
    bot.addListener('register', function(message){ console.log('registered: ' + message); });
    bot.join(testRoom, function(){
        bot.say(testRoom, 'I AM A BOT THAT WILL GIVE YOU GIFS')
        console.log('connected to ' + testRoom);
    });
    bot.addListener('message', function (from, to, text){
        if(_.contains(text, 'gif me')){
            text = text.split(/[, ]+/).slice(text.split(/[, ]+/).indexOf('me'));
            text.shift();
            console.log(text.join('+'));
            findGif(text.join('+'));
        }
    });
}

function findGif(search){
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + search + publicBetakey
    request(url, function (err, res, body){
        if(!err && res.statusCode == 200 && _.isEmpty(JSON.parse(body).data)!=true){
            body = JSON.parse(body);
            console.log(body);
            bot.say(testRoom, body.data[0].images.original.url);
        }
        else{
            bot.say(testRoom, 'NOPE!');
        }
    })
}

init();


