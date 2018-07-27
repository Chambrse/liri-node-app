# liri-node-app
In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### Contributors:  
Shane Chambry

## Command line arguments:  
```node liri.js my-tweets```
    Logs your most recent tweets to the console using the twitter API
```node liri.js spotify-this-song "song title"```
    Uses the spotify API to search for and log information about the song to the console.
```node liri.js movie-this "movie title"```
    Uses the research node module and the OMDB API to search for a movie and log its info to the console.
```node liri.js do-what-it-says```
    reads commands from the random.txt file and runs them as normal.


## Authentication:
If you clone this repository, don't forget to npm install the node packages. Then, you'll have to provide an .env file with your own twitter and spotify credentials for it to work, like this:


```
# Spotify API keys

SPOTIFY_ID=<your spotify ID>
SPOTIFY_SECRET=<your spotify secret>

# Twitter API keys

TWITTER_CONSUMER_KEY=<your twitter consumer key>
TWITTER_CONSUMER_SECRET=<your twitter consumer secret>
TWITTER_ACCESS_TOKEN_KEY=<your twitter access token key>
TWITTER_ACCESS_TOKEN_SECRET=<your twitter access token secret>
```

### Gif Tour
This gif goes quickly over the main functionality of this app with some example cases.

<img src="https://i.imgur.com/WoTdvX9.gif"/>
