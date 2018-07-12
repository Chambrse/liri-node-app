
/* Get all the node modules in there */
require("dotenv").config();
const keys = require('./keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


/* Get the arguments */
let args = process.argv.slice(2);

/* figure out which command to use. */

liriSwitch(args);

function liriSwitch(args) {
    switch (args[0]) {
        case 'my-tweets':

            fs.appendFileSync("log.txt", "###" + args + "\n");

            getTweets();
            break;
        case 'spotify-this-song':

            fs.appendFileSync("log.txt", "###" + args + "\n");

            if (args[1]) {
                spotifySearch(args[1]);
            } else {
                spotifySearch("The sign");
            };
            break;
        case 'movie-this':

            fs.appendFileSync("log.txt", "###" + args + "\n");

            if (args[1]) {
                getMovie(args[1]);
            } else {
                getMovie("Mr. Nobody");
            };
            break;
        case 'do-what-it-says':

            fs.appendFileSync("log.txt", "###" + args + "\n");

            readInstructions();

            break;
        case 'clear-log':

            fs.writeFileSync("log.txt", "");

            break;
        default:
            break;
    };
};

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

            fs.appendFileSync("log.txt", line + "\n");
            fs.appendFileSync("log.txt", tweets[i].created_at + "\n");
            fs.appendFileSync("log.txt", "" + "\n");
            fs.appendFileSync("log.txt", tweets[i].full_text + "\n");

        };

        console.log(line);
        fs.appendFileSync("log.txt", line + "\n");

    });
};

function spotifySearch(title) {

    /* Spotify api call */
    spotify.search({ type: 'track', query: title, limit: 1 }, function (err, data) {

        if (err) {
            return err;
        };

        console.log(line);
        console.log(data.tracks.items[0].name);
        console.log("");
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Preview: " + data.tracks.items[0].preview_url);
        console.log(line);

        fs.appendFileSync("log.txt", line + "\n");
        fs.appendFileSync("log.txt", data.tracks.items[0].name + "\n");
        fs.appendFileSync("log.txt", "" + "\n");
        fs.appendFileSync("log.txt", "Artist: " + data.tracks.items[0].album.artists[0].name + "\n");
        fs.appendFileSync("log.txt", "Album: " + data.tracks.items[0].album.name + "\n");
        fs.appendFileSync("log.txt", "Preview: " + data.tracks.items[0].preview_url + "\n");
        fs.appendFileSync("log.txt", line + "\n");


    });

};

function getMovie(title) {

    let titleFormatted = title.replace(" ", "+");

    request("http://www.omdbapi.com/?t=" + titleFormatted + "&y=&plot=full&apikey=trilogy", function (error, response, body) {

        if (JSON.parse(body).Error) {
            console.log("Movie not found. Check the spelling.");
            return;
        };

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {


            console.log(line);
            console.log(JSON.parse(body).Title + " - " + JSON.parse(body).Year + " - Rated: " + JSON.parse(body).Rated);
            console.log("IMDB: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            console.log("Metacritic: " + JSON.parse(body).Ratings[2].Value);
            console.log("Produced in " + JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Actors);
            console.log(line);
            console.log(JSON.parse(body).Plot);
            console.log(line);

            fs.appendFileSync("log.txt", line + "\n");
            fs.appendFileSync("log.txt", JSON.parse(body).Title + " - " + JSON.parse(body).Year + " - Rated: " + JSON.parse(body).Rated + "\n");
            fs.appendFileSync("log.txt", "IMDB: " + JSON.parse(body).Ratings[0].Value + "\n");
            fs.appendFileSync("log.txt", "Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value + "\n");
            fs.appendFileSync("log.txt", "Metacritic: " + JSON.parse(body).Ratings[2].Value + "\n");
            fs.appendFileSync("log.txt", "Produced in " + JSON.parse(body).Country + "\n");
            fs.appendFileSync("log.txt", JSON.parse(body).Language + "\n");
            fs.appendFileSync("log.txt", JSON.parse(body).Actors + "\n");
            fs.appendFileSync("log.txt", line + "\n");
            fs.appendFileSync("log.txt", JSON.parse(body).Plot + "\n");
            fs.appendFileSync("log.txt", line + "\n");


        };

    });
};

function readInstructions() {

    let argsArray = [];

    fs.readFile("random.txt", "utf8", function (err, body) {
        let commands = body.split("\r\n");

        for (var j = 0; j < commands.length; j++) {
            args = commands[j].split(",");

            liriSwitch(args);
        };

    });
};

