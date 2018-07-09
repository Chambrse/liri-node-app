
/* Get all the node modules in there */
require("dotenv").config();
const keys = require('./keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


/* Get the arguments */
let args = process.argv.slice(2);

/* figure out which command to use. */
switch (args[0]) {
    case 'my-tweets':
        getTweets();
        break;
    case 'spotify-this-song':
        spotifySearch(args[1]);
        break;
    case 'movie-this':

        break;
    case 'do-what-it-says':

        break;

    default:
        break;
}

/* for formatting */
const line = "--------------------------------------------";

function getTweets() {

    /* Twitter api call */
    var params = { screen_name: 'chambrse', tweet_mode: 'extended' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (error) {
            console.log(error);
            return;
        };

        /* print out the appropriate items */
        for (var i = 0; i < tweets.length; i++) {

            console.log(line);
            console.log(tweets[i].created_at);
            console.log("");
            console.log(tweets[i].full_text);

        };

        console.log(line);

    });
};

function spotifySearch(title) {

    /* Spotify api call */
    spotify.search({ type: 'track', query: title, limit: 1 }, function(err, data) {

        if (err) {
          return err;
        }

        console.log(line);

        console.log(data.tracks.items[0].name);

        console.log("");

        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);

        console.log("Album: " + data.tracks.items[0].album.name);

        console.log("Preview: " + data.tracks.items[0].preview_url);

        console.log(line);


      });
            
};


