import { userInfo } from "os";
import Twitter from 'twitter';

const EMIT_TWEET = "tweets";

const twitterIDs = [
  '724478906829426688', 
  '141379865',
  '36375825'
];

let twitter = new Twitter({
  consumer_key: (process.env.CONSUMER_KEY as string),
  consumer_secret: (process.env.CONSUMER_SECRET as string),
  access_token_key: (process.env.TWITTER_ACCESS_TOKEN_KEY as string),
  access_token_secret: (process.env.TWITTER_ACCESS_TOKEN_SECRET as string)
});

const recentTweetsCache: any = {
  lastUpdate: null,
  tweets: []
};

const fetchRecentTweets = (socket: any) => {
  const delay = 15 * 60 * 1000;
  if (!recentTweetsCache.lastUpdate || recentTweetsCache.lastUpdate < Date.now() - delay) {
    recentTweetsCache.tweets = [];
    twitterIDs.slice(1).forEach(twitterID => {
      const params = { user_id: twitterID, include_rts: false };
      twitter.get('statuses/user_timeline', params, (error: any, tweets: any, response: any) => {
        if (!error) {
          recentTweetsCache.tweets = [...tweets.slice(0, 4), ...recentTweetsCache.tweets];
          recentTweetsCache.lastUpdate = Date.now();
          socket.emit(EMIT_TWEET, tweets.slice(0, 4));
        } else {
          console.log("fetch ERROR");
        }
      });
    })
  } else {
    socket.emit(EMIT_TWEET, recentTweetsCache.tweets);
  }
}

const stream = (io: any) => {
  const params = { follow: twitterIDs.join(',') };
  twitter.stream('statuses/filter', params, (stream: any) => {
    stream.on('data', (tweet: any) => {
      if (tweet.text && twitterIDs.includes(tweet.user.id_str)) {
        recentTweetsCache.tweets.push(tweet);
        io.emit(EMIT_TWEET, tweet);
      }
    });

    stream.on('error', (error: any) => console.log("stream ERROR", error));
  })
}

export default (app: any, io: any) => {
  //Establishes socket connection.
  stream(io);
  io.on("connection", (socket: any) => {
    fetchRecentTweets(socket);
    socket.on("connection", () => console.log("Client connected"));
    socket.on("disconnect", (reason: any) => console.log("Client disconnected >>", reason));
  });
};

