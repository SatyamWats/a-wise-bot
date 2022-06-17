var Twit = require('twit')
var config=require('./config');
var fetch=require('node-fetch');
var T = new Twit(config);
    
var set=new Set();
var curr=0;

setInterval(function(){


fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
      
    if(curr == 100){
        set.clear();
        curr=0;
    }

    var r=Math.floor(Math.random()*data.length);
    while(set.has(r) == true || data[r].author == null || (data[r].text.length + data[r].author.length >= 140))   r=Math.floor(Math.random()*data.length);

    set.add(r);
    const quote=data[r].text;
    var author=data[r].author;
    if(author == null || author=='null')  author='Unknown';
    tweeted(quote,author);


});



},1000*60*60*12);


function tweeted(quote,author){
        
    var tweet={ 
    status: '"' + quote + '" -' + ' ' + author
    }

    T.post('statuses/update', tweet, respondData);

    function respondData(err, data, response) {
    if(err){
        console.log("error");
        console.log(err);
    }
    else{
        curr++;
        console.log("Bot is Working!");
    }
    };
};

console.log("Bot is running!");