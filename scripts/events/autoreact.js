const fs = require("fs");
module.exports.config = {
        name: "autoreact",
  version: "1.0.0",
        hasPermssion: 0,
        credits: "Minami Tatsuo",
        description: "non prefix reply",
        commandCategory: "no prefix",
        usages: "noprefix",
    cooldowns: 0,
};
 
module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
 let haha = event.body.toLowerCase();
  if (haha.includes("lol") || haha.includes("😂") || haha.includes("haha") || haha.includes("pagal") || haha.includes("mental") || haha.includes("oye") || haha.includes("love") || haha.includes("jani") || haha.includes("bc") || haha.includes("group") || haha.includes("kis") || haha.includes("kuta") || haha.includes("jan") || haha.includes("oh")){                 
    return api.setMessageReaction("😆", event.messageID, (err) => {}, true)
    api.markAsSeen(1, (err) => {});
  }
    if (haha.includes("death") || haha.includes("mar") || haha.includes("udas") || haha.includes("☹️") || haha.includes("hurt") || haha.includes("please") || haha.includes("😢") || haha.includes("😔") || haha.includes("🥺") || haha.includes("sad")){
      return  api.setMessageReaction("😢", event.messageID, (err) => {}, true);
}
  if (haha.includes("🥵") || haha.includes("umah") || haha.includes("💋") || haha.includes("kiss") || haha.includes("babu") || haha.includes("wow") || haha.includes("wah") || haha.includes("relationship") || haha.includes("gf") || haha.includes("baby") || haha.includes("omg")){
    return api.setMessageReaction("😘", event.messageID, (err) => {}, true)
        };
  if (haha.includes("uyab") || haha.includes("gf")){
    api.setMessageReaction("😡", event.messageID, (err) => {}, true)
    api.sendMessage("ayaw sigeg pangita ana naa nanay murag uyab.", event.threadID,event.messageID);
  }
  if (haha.includes("uyab") || haha.includes("gf")){
    api.sendMessage("ayaw sigeg pangita ato naa natoy murag uyab.", event.threadID, event.messageID);
  }
  if (haha.includes("What if") || haha.includes("what if")){
    api.sendMessage("what if bobo ka?", event.threadID, event.messageID);
  }
  if (haha.includes("good morning") || haha.includes("morning")){
    api.sendMessage("good morning, eat kana loveu ", event.threadID, event.messageID);
  }
if (haha.includes("good night") || haha.includes("night")){
    api.sendMessage("good night mahal, sleep well sweet dreams loveu mwa", event.threadID, event.messageID);
}
if (haha.includes("piste") || haha.includes("yawa")){
    api.sendMessage("aysig pamalikas kay maka baho nag nawng", event.threadID, event.messageID);
};
  
      
};
        module.exports.run = function({ api, event, client, __GLOBAL }) {
  };
