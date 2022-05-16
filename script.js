'use strict';

document.querySelector('.endGame').addEventListener('click', () => {
    resetGame();
})

document.querySelector(".playBtn").addEventListener('click', function () {
    startGame();
})

let rollsLeft = 3;
let dicesHold = [false, false, false, false, false];

let currentDices = [1,1,1,1,1];
let ones = 0;
let twos = 0;
let threes = 0;
let fours = 0;
let fives = 0;
let sixes = 0;
let threeOfKinds = 0;
let fourOfKinds = 0;
let yahtzees = 0;
let chances = 0;
let smallStraight = 0;
let largeStraight = 0;
let fullHouse = 0;

let upScoreNoBonus = 0;
let bonus = 0;

let lowerScore = 0;

let upScorePlusBonus = 0;
let fullScore = 0;

let oneToSixClicked = [false, false, false, false, false, false];

let rounds = 0;

document.querySelector('.totalRolls').textContent = rollsLeft;  

let images = [
   "/img/01stip.PNG",
   "/img/02stip.PNG",
   "/img/03stip.PNG",
   "/img/04stip.PNG",
   "/img/05stip.PNG",
   "/img/06stip.PNG" 
];
let dice = document.querySelectorAll("img");


function gameStart() {
    addClickFunction()
}

gameStart()


function roll () {

    if (rollsLeft != 0) {

        // Add Roll Animation
        dice.forEach(function(die, index) {
            if (dicesHold[index] == false) {
                die.classList.add("shake");
            }
        });

        // Change Numbers Dices
        dicesHold.forEach(function(dice, index) {
            if (dicesHold[index] == false ) {
                currentDices[index] = Math.floor(Math.random() * 6);
                document.querySelector(`.dice-${index + 1}`).setAttribute("src", images[currentDices[index]])
            }
        })

        // Remove Roll animation
        setTimeout(function () {
                dice.forEach(function(die){
                die.classList.remove("shake")
                });
            }, 1000
        );
        
        // Change rollsLeft - 1
        rollsLeft -= 1;
        document.querySelector('.totalRolls').textContent = rollsLeft;

        // Checks
        oneToSixCheck();

        threeOfAKindCheck();
        FourOfAKindCheck();

        smallStraightCheck();
        largeStraightCheck();
        fullHouseChecker();
        yahtzeeCheck();
        chanceCheck();

        
        // CLick Points
        pointsBlockClick();
        lowerPointsCheck();
        
        if (rounds >= 12) {
        endGameCheck();
        }
    }


   
} 

function addClickFunction() {
document.querySelectorAll(".dice").forEach((dice, index) => {
     
        dice.addEventListener("click", () => {
            if (dice.classList.contains("selected") && rollsLeft < 3 ) {
                dice.classList.remove("selected")
                dicesHold[index] = false;
               
            } else if (rollsLeft < 3){
                dice.classList.add("selected")
                dicesHold[index] = true;
                
            }
           
        })
     })
}

function pointsBlockClick() {
  document.querySelectorAll(".pointsBlock").forEach((block, index) => {
      block.addEventListener("click", () => {
          if (rollsLeft < 3 && oneToSixClicked[index] == false) {
            block.classList.add("checked");
            oneToSixClicked[index] = true;
             
            nextRound();
          }
         
      })
  })
}


// Go to next round
function nextRound() {
    rollsLeft = 3;
    document.querySelector(".totalRolls").textContent = rollsLeft;
    rounds++;
    console.log(rounds);
    document.querySelectorAll(".dice").forEach((dice,index) => {
        dice.classList.remove("selected");
        dicesHold[index] = false;
    })
}





// --------------------- CHECKS ------------------------- //

function oneToSixCheck() {
    if (oneToSixClicked[0] == false) {
        ones = 0;
    } 

    if (oneToSixClicked[1] == false) {
        twos = 0;
    } 

    if (oneToSixClicked[2] == false) {
        threes = 0;
    } 

    if (oneToSixClicked[3] == false) {
        fours = 0;
    } 

    if (oneToSixClicked[4] == false) {
        fives = 0;
    } 

    if (oneToSixClicked[5] == false) {
        sixes = 0;
    } 

    
    

    currentDices.forEach(function(diceNumber,index,check) {
       if (diceNumber == 0 && oneToSixClicked[0] == false) { ones += 1}
       if (diceNumber == 1 && oneToSixClicked[1] == false) { twos += 2}
       if (diceNumber == 2 && oneToSixClicked[2] == false) { threes += 3}
       if (diceNumber == 3 && oneToSixClicked[3] == false) { fours += 4}
       if (diceNumber == 4 && oneToSixClicked[4] == false) { fives += 5}
       if (diceNumber == 5 && oneToSixClicked[5] == false) { sixes += 6}
       
       if (oneToSixClicked[0] == true && oneToSixClicked[1] == true && oneToSixClicked[2] == true && oneToSixClicked[3] == true && oneToSixClicked[4] == true && oneToSixClicked[5] == true) {
           upScoreNoBonus = ones + twos + threes + fours + fives + sixes;
           console.log(upScoreNoBonus);
           document.querySelector('.upTotal').textContent = upScoreNoBonus;
           
           if (upScoreNoBonus >= 63) {
               bonus = 35;
               document.querySelector('.bonus').textContent = bonus;
               
               upScorePlusBonus = upScoreNoBonus + 35;
               document.querySelector('.totalBonus').textContent = upScorePlusBonus;
               document.querySelector('.totalBonusA').textContent = upScorePlusBonus;
           } else if (upScoreNoBonus < 63) {
               bonus = 0;
               document.querySelector('.bonus').textContent = bonus;

               upScorePlusBonus = upScoreNoBonus + bonus;
               document.querySelector('.totalBonus').textContent = upScorePlusBonus;
               document.querySelector('.totalBonusA').textContent = upScorePlusBonus;
           }

        }

       document.querySelector(".onePoints").textContent = ones;
       document.querySelector(".twoPoints").textContent = twos;
       document.querySelector(".threePoints").textContent = threes;
       document.querySelector(".fourPoints").textContent = fours;
       document.querySelector(".fivePoints").textContent = fives;
       document.querySelector(".sixPoints").textContent = sixes;
    })
}

// Three of a kind Check
function threeOfAKindCheck() {
  let threeOfKind = document.querySelector(".threeOfKind");
  
  // If clicked on
  threeOfKind.addEventListener("click", () => {
      if (rollsLeft < 3 && !threeOfKind.classList.contains("checked")) {
        threeOfKind.classList.add("checked");
        nextRound();
      }
      
  })
  
  // check
  if (!threeOfKind.classList.contains("checked") && rollsLeft < 3) {
      threeOfKinds = 0;
      
      for (let i = 0; i < 6; i++) {
          let howManyTimes = 0;
          currentDices.forEach((dice) => {
              if (dice == i) {
                howManyTimes++;
            }
        })

        if (howManyTimes == 3) {
            currentDices.forEach((dice, index) => {
                threeOfKinds += dice + 1;
            })
        } 
    }
    
    document.querySelector(".threeOfKindPoints").textContent = threeOfKinds;
  
  }
}

// Four of a kind Check
function FourOfAKindCheck() {
    let fourOfKind = document.querySelector(".fourOfKind");
    
    // If clicked on
    fourOfKind.addEventListener("click", () => {
        if (rollsLeft < 3 && !fourOfKind.classList.contains("checked")) {
            fourOfKind.classList.add("checked");
            nextRound();
        }
        
    })
    
    // check
    if (!fourOfKind.classList.contains("checked") && rollsLeft < 3) {
      fourOfKinds = 0;
      
      for (let i = 0; i < 6; i++) {
          let howManyTimes = 0;
          currentDices.forEach((dice) => {
              if (dice == i) {
                  howManyTimes++;
              }
            })
  
            if (howManyTimes == 4) {
              currentDices.forEach((dice, index) => {
                  fourOfKinds += dice + 1;
              })
            } 
        }
     
        document.querySelector(".fourOfKindPoints").textContent = fourOfKinds;
    
    }
}

// Yahtzee Check

function yahtzeeCheck () {
    let yahtzee500 = document.querySelector(".yahtzee");
    
    // If clicked on
    yahtzee500.addEventListener("click", () => {
        if (rollsLeft < 3 && !yahtzee500.classList.contains("checked")) {
            yahtzee500.classList.add("checked");
            nextRound();
        }
       
    })
    
    // check
    if (!yahtzee500.classList.contains("checked") && rollsLeft < 3) {
      yahtzees = 0;
      
      for (let i = 0; i < 6; i++) {
          let howManyTimes = 0;
          currentDices.forEach((dice) => {
              if (dice == i) {
                  howManyTimes++;
              }
            })
            
            if (howManyTimes == 5) {
              currentDices.forEach((dice, index) => {
                  yahtzees = 50;
              })
            } 
        }
        
        document.querySelector(".yahtzeePoints").textContent = yahtzees;
        
    }
  }
  
function chanceCheck () {
    let chanceSS = document.querySelector(".chance");
    
    chanceSS.addEventListener("click", () => {
        if (rollsLeft < 3 && !chanceSS.classList.contains("checked")) {
            chanceSS.classList.add("checked");
            nextRound();
        }
        
    })
    
    if (!chanceSS.classList.contains("checked") && rollsLeft < 3) {
        chances = 0;

        currentDices.forEach((dice) => {
           chances += dice + 1;
           document.querySelector(".chancePoints").textContent = chances;
        })
    }
}

function smallStraightCheck () {
    let smlS = document.querySelector(".smallStraight");
    
    let eenC = currentDices.includes(0);
    let tweeC = currentDices.includes(1);
    let drieC = currentDices.includes(2);
    let vierC = currentDices.includes(3);
    let vijfC = currentDices.includes(4);
    let zesC = currentDices.includes(5);
    
    
    smlS.addEventListener("click", () => {
        if (rollsLeft < 3 && !smlS.classList.contains("checked")) {
            smlS.classList.add("checked");
            nextRound();
        }
       
    })
    
    if (!smlS.classList.contains("checked") && rollsLeft < 3) {
        smallStraight = 0;

        if ((eenC && tweeC && drieC && vierC) || (tweeC && drieC && vierC && vijfC) || (drieC && vierC && vijfC && zesC)) {
            smallStraight = 30;
            
        }
        
        document.querySelector('.sSPoints').textContent = smallStraight;
    }
}

function largeStraightCheck () {
    let lgS = document.querySelector(".largeStraight");
    
    let eenC = currentDices.includes(0);
    let tweeC = currentDices.includes(1);
    let drieC = currentDices.includes(2);
    let vierC = currentDices.includes(3);
    let vijfC = currentDices.includes(4);
    let zesC = currentDices.includes(5);
    
    lgS.addEventListener("click", () => {
        if (rollsLeft < 3 && !lgS.classList.contains("checked")) {
            lgS.classList.add("checked");
            nextRound();
        }
       
    })
    
    if (!lgS.classList.contains("checked") && rollsLeft < 3) {
        largeStraight = 0;
        
        if ((eenC && tweeC && drieC && vierC && vijfC) || (tweeC && drieC && vierC && vijfC && zesC)) {
            largeStraight = 40;
            
        }
        
        document.querySelector('.lSPoints').textContent = largeStraight;
    }
}

function fullHouseChecker () {
    let fh = document.querySelector(".fullHouse");

    fh.addEventListener("click", () => {
        if (rollsLeft < 3 && !fh.classList.contains("checked")) {
            fh.classList.add("checked");
            nextRound();
        }
       
    })
    
    fullHouse = 0;
    
    let threeOfKindYes = false;
    let twoOfKindYes = false;
    
    let two = 0;
    let three = 0;
    
    for (let i = 0; i < 6; i++) {
        two = 0;
        three = 0;
        for (let j = 0; j < 6; j++) {
            if (currentDices[i] == currentDices[j]) {
                three++;
            }
        }
        if (three == 3) {
            threeOfKindYes = true;
        } 


        for (let b = 0; b < 6; b++) {
            if (currentDices[i] == currentDices[b]) {
               two++;
            }
        }
        
        if (two == 2) {
            twoOfKindYes = true;
        }
        
    }

    if (threeOfKindYes && twoOfKindYes) {
        fullHouse = 25;
        document.querySelector('.fullHousePoints').textContent = fullHouse;
    } else {
        document.querySelector('.fullHousePoints').textContent = fullHouse;
    }
}


let lowerPointsCheck = () => {
 let total = 0;
 document.querySelectorAll(".lowerPoints").forEach((block) => {
     if (block.classList.contains("checked")) {
        total++;
     }
 })

 if (total == 7) {
     lowerScore = threeOfKinds + fourOfKinds + fullHouse + smallStraight + largeStraight + yahtzees + chances;
     document.querySelector(".lower-total").textContent = lowerScore;
 }
}


let endGameCheck = () => {
    fullScore = threeOfKinds + fourOfKinds + fullHouse + smallStraight + largeStraight + yahtzees + chances + ones + twos + threes + fours + fives + sixes + bonus;
    document.querySelector('.fullScore').textContent = fullScore;
}

let startGame = () => {
    document.querySelector('.firstContainer').classList.remove('hidden');
    document.querySelector('.extended-background').classList.remove('hidden');
    document.querySelector('.playBtn').classList.add('hidden');
    document.querySelector('.playBackground').classList.add('hidden');
}

let resetGame = () => {
rollsLeft = 3;
dicesHold = [false, false, false, false, false];
currentDices = [1,1,1,1,1];
ones = 0;
twos = 0;
threes = 0;
fours = 0;
fives = 0;
sixes = 0;

document.querySelector(".onePoints").textContent = '';
document.querySelector(".twoPoints").textContent = '';
document.querySelector(".threePoints").textContent = '';
document.querySelector(".fourPoints").textContent = '';
document.querySelector(".fivePoints").textContent = '';
document.querySelector(".sixPoints").textContent = '';

threeOfKinds = 0;
document.querySelector(".threeOfKindPoints").textContent = '';

fourOfKinds = 0;
document.querySelector(".fourOfKindPoints").textContent = '';

yahtzees = 0;
document.querySelector(".yahtzeePoints").textContent = '';

chances = 0;
document.querySelector(".chancePoints").textContent = '';

smallStraight = 0;
document.querySelector('.sSPoints').textContent = '';

largeStraight = 0;
document.querySelector('.lSPoints').textContent = '';

fullHouse = 0;


document.querySelector('.totalRolls').textContent = rollsLeft; 

upScoreNoBonus = 0;
document.querySelector('.upTotal').textContent = '';

bonus = 0;
document.querySelector('.bonus').textContent = '';

upScorePlusBonus = 0;
document.querySelector('.totalBonus').textContent = '';
document.querySelector('.totalBonusA').textContent = '';

lowerScore = 0;
document.querySelector('.lower-total').textContent = '';

fullScore = 0;
document.querySelector('.fullScore').textContent = '';


oneToSixClicked = [false, false, false, false, false, false];

rounds = 0;

document.querySelectorAll('.box').forEach((box) => {
    box.classList.remove('checked');
})
}