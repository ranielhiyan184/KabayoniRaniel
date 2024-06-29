module.exports.config = {
  name: "quiz",
  version: "1.0",
  hasPermission: 0,
  credits: "Raniel",
  usePrefix: true,
  description: "Answer trivia questions",
  commandCategory: "Fun",
  cooldowns: 5,
};

const axios = require('axios');
const triviaData = {};

const difficultyMap = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
};

const categoryMap = {
  general: 9,
  books: 10,
  film: 11,
  music: 12,
  theatres: 13,
  television: 14,
  videogames: 15,
  boardgames: 16,
  science: 17,
  computers: 18,
  math: 19,
  mythology: 20,
  sports: 21,
  geography: 22,
  history: 23,
  politics: 24,
  art: 25,
  celebrity: 26,
  animals: 27,
  vehicles: 28,
  comics: 29,
  gadgets: 30,
  anime: 31,
  cartoon: 32,
};

// Function to fetch the user's name based on senderID
async function getUserName(api, senderID) {
  const userInfo = await api.getUserInfo(senderID);
  const user = userInfo[senderID];
  if (user && user.name) {
    return user.name;
  } else {
    return "Unknown User"; // Return a default name if the user's name is not available
  }
}

// Create a function to reveal the answer
function revealAnswer(api, threadID) {
  if (!triviaData[threadID].answered) {
    const { correctIndex, options } = triviaData[threadID];
    const correctLetter = String.fromCharCode(65 + correctIndex);
    api.sendMessage(`Time's up! The correct answer is:\n\n${correctLetter}. ${decodeURIComponent(options[correctIndex])}`, threadID);
  }
}
