const Twit = require('twit');

const fetch = require('node-fetch');

require('dotenv').config();

var T = new Twit({consumer_key:`${process.env.API_KEY}`, 
                  consumer_secret:`${process.env.API_KEY_SECRET}`,
                  access_token:`${process.env.ACESS_TOKEN}`,
                  access_token_secret:`${process.env.ACESS_TOKEN_SECRET}`,
                });



/**/
    
const token = process.env.BEARER_TOKEN;

let username = 'aaaaaa';

const URL = 'https://api.twitter.com/2/users/by/username/'+ username + '?expansions=pinned_tweet_id';

async function getData() {
    try {
        let res = await (fetch(URL, {
            method: 'get',
            headers: { "Authorization": `${token}` },   
        }));
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

let id, username;
let album_link = 'https://open.spotify.com/album/3UfgdnveqOKVBnFdEpeoYX?si=YCv_86jdRU-DeWDya_FjbA';
let reply = `Stream na lenda! ${album_link}`;


getData().then((res) => { 
    console.log(res.includes.tweets[0]);
    id = res.includes.tweets[0].id;
    reply = `@${res.data.username} ${reply}`;
    postReply(id, reply);
});

function postReply(id){
    T.post('statuses/update', { 
        in_reply_to_status_id: id,
        status: reply,
        },
        function(err, data, response) {
        console.log(data);
      });
}