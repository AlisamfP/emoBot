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
        bot.say(testRoom, 'Type gif me <what you want a gif of>')
        console.log('connected to ' + testRoom);
    });
    bot.addListener('message', function (from, to, text){
        text = text.toLowerCase();
        if(_.contains(text, 'gif me')){
            text = text.split(/[, ]+/).slice(text.split(/[, ]+/).indexOf('me'));
            text.shift();
            findGif(text.join('+'));
        }
    });
    bot.addListener('notice', function (nick, to, text, message){
        console.log('nick: ' + nick);
        console.log('to: ' + to);
        console.log('text: ' + text);
        console.log('message: ' + message);
    })
}

function findGif(search){
    var url = 'http://api.giphy.com/v1/gifs/random?tag=' + search + publicBetakey
    request(url, function (err, res, body){
        if(!err && res.statusCode == 200 && _.isEmpty(JSON.parse(body).data)!=true){
            body = JSON.parse(body);
            console.log(body);
            bot.say(testRoom, body.data.image_original_url);
        }
        else{
            bot.say(testRoom, 'NOPE!');
        }
    })
}
// function randomize(data){
//     var count = (data.pagination.count) - 1;
//     if (count >= 0){
//         var random = _.random(0, count);
//         console.log(random);
//         return random;
//     }
// }

init();


