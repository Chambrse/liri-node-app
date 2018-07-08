require("dotenv").config();
const keys = require('./keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

let args = process.argv.slice(2);

switch (args[0]) {
    case 'my-tweets':
        getTweets();
        break;
    case 'spotify-this-song':

        break;
    case 'movie-this':

        break;
    case 'do-what-it-says':

        break;

    default:
        break;
}

function getTweets() {

    const line = "--------------------------------------------";

    var params = { screen_name: 'realDonaldTrump', tweet_mode: 'extended' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (error) {
            console.log(error);
            return;
        };

        for (var i = 0; i < tweets.length; i++) {
            console.log(line);
            console.log("Tweet:");
            console.log(tweets[i].full_text);
            console.log("");
            console.log("TimeStamp:");
            console.log(tweets[i].created_at);
        };

        console.log(line);

    });
}


