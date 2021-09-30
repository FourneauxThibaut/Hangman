let lives = 6;
let win = false;
let consecutiveFail = 0;
let randomWord = ''
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const drawing = ['head', 'body', 'lArm', 'rArm', 'lLegs', 'rLegs'];
const target = document.getElementById('word');

/**=======================================================================================================================
 **                                                     Init
 *
 *?  Reset all variables and class added during last game
 *@return randomWord
 *=======================================================================================================================**/                                
function init()
{
    // take a random animal from wordList.js
    randomWord = words[Math.floor(Math.random()*words.length)].toLowerCase();
    lives = 6;
    win = false;
    consecutiveFail = 0;
    updateLives(lives);
    // create the hidden world
    let temp = '_';
    for (let i=1; i<randomWord.length; i++){
        temp += '_';
    }
    target.innerHTML = temp;
    target.classList.remove('red');
    // remove all classes
    alphabet.forEach(element => {
        let upper = element.toUpperCase();
        document.getElementById('letter'+upper).classList.remove('red');
        document.getElementById('letter'+upper).classList.remove('disable');
    });
    document.getElementById('userInfo').classList.remove('lose');
    document.getElementById('userInfo').classList.remove('win');
    drawing.forEach(element => {
        document.getElementById( element ).classList.remove('active');
    });

    return randomWord;
}

/**=======================================================================================================================
 **                                                     Guess
 *
 *?  compare if the number is the same as function 
 *@param userInput  
 *@use addLetter
 *@use loseLive
 *@use removeLetter
 *=======================================================================================================================**/
function guess(userInput){
    let temp = 0;
        // look if input is more then a letter
    if (userInput.length > 1 )
    {
        // look if the guess is correct
        if (userInput == randomWord)
        {
            for (let j=0; j<userInput.length; j++)
            {
                addLetter(userInput[j]);
            }
        }
        // look if it's uncorrect
        else
        {
            loseLive();
            result();
        }
    }
    // look if it's only one letter
    else if (userInput.length == 1)
    {
        // look if the input are the same a one letter in the random word
        for (let i=0; i<randomWord.length; i++)
        {
            if (userInput == randomWord[i])
            {
                temp++;
                addLetter(userInput);
            }
        }
        // if the guess doesnt correspond at least one letter
        if (temp <= 0)
        {
            // look if the game is finish and if the button already was clicked
            if (win != true && document.getElementById('letter'+(userInput.toUpperCase())).className == "") 
            {
                loseLive();
                removeLetter(userInput);
            }
        }
    } 
}

/**=======================================================================================================================
 **                                                     UpdateLives
 *
 *?  update the number of tries in the p field selected as "userInfo"
 *@param left
 *=======================================================================================================================**/
function updateLives(left)
{
    let userInfo = document.getElementById('userInfo');
    userInfo.textContent = 'you have '+left+' lives left.';
}

/**=======================================================================================================================
 **                                                     LoseLive
 *
 *?  decrease the live count 
 *@use updateLives  
 *@use draw  
 *=======================================================================================================================**/
function loseLive()
{
    if (win == false)
    {
        if (lives > 0){
            lives--;
            consecutiveFail++;
            updateLives(lives);
            draw();
            failStreak()
        }
    }
}

/**=======================================================================================================================
 **                                                     Draw
 *
 *?  draw each part of the hangman depending of the amout of life used
 *=======================================================================================================================**/
function draw()
{
    if (win == false)
    {
        let errorNbr = 6-lives;
        document.getElementById( drawing[ (errorNbr)-1 ] ).classList.add('active');
    }
}

/**=======================================================================================================================
 **                                                  AddLetter
 *
 *Add the input in the target field
 *@param userInput 
 *@use result
 *=======================================================================================================================**/
function addLetter(userInput)
{
    // foreach letter, check the target with the same name and replace the showed word
    for (let i=0; i<randomWord.length; i++)
    {
        if (userInput == randomWord[i])
        {
            tempArr = Array.from(target.textContent);
            tempArr[i] = userInput;
            target.textContent = tempArr.join('');
        }
    }
    // make the text locked in the button list when clicking on the good one
    alphabet.forEach(element => {
        let upper = element.toUpperCase();
        if (userInput == element && win != true) 
        {
            document.getElementById('letter'+upper).classList.add('disable');
        }
    });
    // each time an letter is added, look if the player won
    consecutiveFail = 0;
    result();
}
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

/**=======================================================================================================================
 **                                                     RemoveLetter
 *
 *?  adding class to make the button color red and unclickable
 *@param userInput  
 *@use result
 *=======================================================================================================================**/
function removeLetter(userInput)
{
    alphabet.forEach(element => {
        let upper = element.toUpperCase();
        // make the letter red
        if (userInput == element && win != true)
        {
            document.getElementById('letter'+upper).classList.add('red');
        }
    });
    // each time an letter is removed, look if the player lose
    result();
}

/**=======================================================================================================================
 **                                                  failStreak
 *
 *?  What does it do?
 *=======================================================================================================================**/
function failStreak()
{
    if ( consecutiveFail == 4 )
    {
        let randomWordlength = randomWord.length;
        let randomLetterNbr = Math.round(randomWordlength/3);
        for (let i = 0; i < randomLetterNbr; i++)
        {
            randomLetter = randomWord[ Math.round( Math.random()*randomWordlength ) ]
            verifOutput = document.getElementById('word').innerText

            for (let j=0; j < randomWordlength; j++)
            {
                if (randomLetter == verifOutput[j])
                {
                    randomLetter = randomLetterNbr, randomWord[ Math.round( Math.random()*randomWordlength ) ];
                }
                addLetter(randomLetter);
            }
        }
    }
}

/**=======================================================================================================================
 **                                                     Result
 *
 *?  verify if the player win or lose depending of the word or the amount of live 
 *=======================================================================================================================**/
function result()
{
    if (lives > 0)
    {
        if (target.innerText.toLowerCase() == randomWord)
        {
            document.getElementById('userInfo').innerText;
            document.getElementById('userInfo').innerText = 'Congrats, you just won!';
            document.getElementById('userInfo').classList.add('win');
            win = true;
        }    
    }
    else
    {
        document.getElementById('userInfo').innerText;
        // let message = 'You lose ! the word was '+randomWord;
        document.getElementById('userInfo').innerText = 'You lose !';
        document.getElementById('userInfo').classList.add('lose');

        target.textContent = randomWord;
        target.classList.add('red');

        win = true;
    }    
}

/**=======================================================================================================================
 **                                                  🇧​​​​​uttons
 *?  set all the eventListener
 *@use init
 *=======================================================================================================================**/
// crée un boutton pour chaque lettres.
alphabet.forEach(element => {
    let upper = element.toUpperCase();
    document.getElementById('letter'+upper).addEventListener('click', function(e)
    {
        guess(element);
    })
});
// vérifie si l'utilisateur reload
document.getElementById('reload').addEventListener('click', function(e)
{
    init();
});

/**=======================================================================================================================
 **                                                  Keydown
 *
 *?  listen if user input with the keyborad
 *=======================================================================================================================**/
 window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        case "a":
            guess(event.key)
            break;
        case "b":
            guess(event.key)
            break;
        case "c":
            guess(event.key)
            break;
        case "d":
            guess(event.key)
            break;
        case "e":
            guess(event.key)
            break;
        case "f":
            guess(event.key)
            break;
        case "g":
            guess(event.key)
            break;
        case "h":
            guess(event.key)
            break;
        case "i":
            guess(event.key)
            break;
        case "j":
            guess(event.key)
            break;
        case "k":
            guess(event.key)
            break;
        case "l":
            guess(event.key)
            break;
        case "m":
            guess(event.key)
            break;
        case "n":
            guess(event.key)
            break;
        case "o":
            guess(event.key)
            break;
        case "p":
            guess(event.key)
            break;
        case "q":
            guess(event.key)
            break;
        case "r":
            guess(event.key)
            break;
        case "s":
            guess(event.key)
            break;
        case "t":
            guess(event.key)
            break;
        case "u":
            guess(event.key)
            break;
        case "v":
            guess(event.key)
            break;
        case "w":
            guess(event.key)
            break;
        case "x":
            guess(event.key)
            break;
        case "y":
            guess(event.key)
            break;
        case "z":
            guess(event.key)
            break;
        case "Enter":
            init();
            break;
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);
  // the last option dispatches the event to the listener first,
  // then dispatches event to window

/**=======================================================================================================================
 **                                             Run the game at loading
 *?  Call init function to stat a game
 *@use init 
 *=======================================================================================================================**/
init();