function genRandomNum(startInterval, endInterval){
  return Math.floor((endInterval - startInterval)*Math.random()) + startInterval;
}

function generateCard(quantityNumber){
  let card = [];  
  for(i = 0; i < quantityNumber; i++){
    let numberNewBingoCard = true;
    while(numberNewBingoCard == true){
      let randomNum = genRandomNum(1, 75);
      if(card.includes(randomNum) == true){
        numberNewBingoCard = true;
      }else{
        numberNewBingoCard = false;
        card.push(randomNum);
      }
    }
  }
  return card;
}

function verifyCard(card, numberDrawn, quantityNumber){
  if(numberDrawn.length < quantityNumber){
    return false;
  }
  let numberHave = true;
  card.forEach(function(number){
    if(numberDrawn.includes(number) == true){
    numberHave = true;
    }else{
      numberHave = false;
      return false
    }
});
if(numberHave == true){
  return true;
  }
}

function toPlayBingo(vectorPlayers){
  let numberDrawn = []
  let interval = setInterval(function(){
    let numberHave = true;
    while(numberHave == true){
      let randomNum = genRandomNum(1, 75);
      if(numberDrawn.includes(randomNum) == true){
        numberHave = true;
      }else{
        numberHave = false;
        numberDrawn.push(randomNum);
        console.log("Number Drawn: ", numberDrawn)
        vectorPlayers.forEach(function(player){
          if(verifyCard(player.card, numberDrawn, 25) == true){
            console.log(`${player.name} W O N  B I N G O !!!!!`);
            clearInterval(interval);
          }
        });
      }
   }
   if(numberDrawn.length >= 75){
      console.log("Draw Finished!!");
      clearInterval(interval);
    }
  }, 1000);
}

function askPlayer(vectorPlayers){
  let readline = require("readline");
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("What is the player name? Type 'play' to start the game. \n", function(namePlayer){
    if(namePlayer == "play"){
      console.log("Registered players;", vectorPlayers);
      rl.close();
      toPlayBingo(vectorPlayers); 
    }else{
      let player = {
        name: namePlayer,
        card: generateCard(25)
      }
      rl.close();
      console.log("Successfully created player. Here are your details: ", player);
      vectorPlayers.push(player);
      askPlayer(vectorPlayers);
    }
  })
};
let vectorPlayers = [];
askPlayer(vectorPlayers);