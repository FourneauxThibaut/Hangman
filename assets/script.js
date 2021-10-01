const target = document.getElementById('word');
let randomWord = "";
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const drawing = ['head', 'body', 'lArm', 'rArm', 'lLegs', 'rLegs'];
let lives = 6;
let win = false;
let consecutiveFail = 0;

/**=======================================================================================================================
 **                                                     Init
 *
 *?  Create and reset all variables and class added during last game
 *@return randomWord
 *=======================================================================================================================**/                                
function init()
{
    // take a random animal from wordList.js
    randomWord = words[Math.floor(Math.random()*words.length)].toLowerCase();
    // set variables
    lives = 6;
    win = false;
    consecutiveFail = 0;
    // create the hidden word
    let temp = '_';
    for (let i=1; i<randomWord.length; i++){
        temp += '_';
    }
    document.getElementById('word').innerHTML = temp;
    // target reset
    target.classList.add('disableLink');
    target.classList.remove('red');
    target.classList.remove('winning');
    target.innerHTML = temp;
    // keyboard button reset
    alphabet.forEach(element => {
        let upper = element.toUpperCase();
        document.getElementById('letter'+upper).classList.remove('red');
        document.getElementById('letter'+upper).classList.remove('disable');
    });
    // userInfo reset
    document.getElementById('userInfo').classList.remove('lose');
    document.getElementById('userInfo').classList.remove('win');
    // drawing reset
    drawing.forEach(element => {
        document.getElementById( element ).classList.remove('active');
    });
    // update number of tries avalaible on vue
    updateLives(lives);
    // return the hidden word as variable
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
    // temp look how many time the input matches the hidden word
    let temp = 0;
    // look if input is more then a letter
    if (userInput.length > 1 )
    {
        // look if the input matches the hidden word
        if (userInput == randomWord)
        {
            for (let j=0; j<userInput.length; j++)
            {
                addLetter(userInput[j]);
            }
        }
        // if not make the player lose a live
        else
        {
            loseLive();
        }
    }
    // look if it's only one letter
    else if (userInput.length == 1)
    {
        // look if the input matches at least one letter of the hidden word
        for (let i=0; i<randomWord.length; i++)
        {
            // if yes, add one the the temp counter and add all letter coresponding in the vue
            if (userInput == randomWord[i])
            {
                temp++;
                addLetter(userInput);
            }
        }
        // if the guess doesnt correspond at least one letter
        if (temp <= 0)
        {
            // look if the game is finish and if the button already was clicked (to let the user click only one time on the same letter)
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
    // show how many tries the user have on the vue
    let userInfo = document.getElementById('userInfo');
    userInfo.textContent = 'you have '+left+' lives left.';
}

/**=======================================================================================================================
 **                                                     LoseLive
 *
 *?  decrease the live count 
 *@use updateLives  
 *@use draw  
 *@use failStreak  
 *@use result  
 *=======================================================================================================================**/
function loseLive()
{
    // look if the user can still play
    if (win == false && lives > 0)
    {
        lives--;
        consecutiveFail++;
        updateLives(lives);
        draw();
        failStreak();
        result();
    }
}

/**=======================================================================================================================
 **                                                     Draw
 *
 *?  draw each part of the hangman depending of the amout of life used
 *=======================================================================================================================**/
function draw()
{
    // while the game isn't finish
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
    // update the vue of the letter button clicked
    alphabet.forEach(element => {
        let upper = element.toUpperCase();
        if (userInput == element && win != true) 
        {
            document.getElementById('letter'+upper).classList.add('disable');
        }
    });
    // reset the pity count
    consecutiveFail = 0;
    // look if the user won
    result();
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
    if ( consecutiveFail == 3 )
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
    
    let link = "https://www.google.com/search?q="+randomWord+"&source=lnms&tbm=isch&sa=";
    if (lives > 0)
    {
        if (target.innerText.toLowerCase() == randomWord)
        {
            document.getElementById('userInfo').innerText;
            document.getElementById('userInfo').innerText = 'Congrats, you just won!';
            document.getElementById('userInfo').classList.add('win');
            win = true;

            target.classList.add('winning');
            target.classList.remove('disableLink');
            target.style.cursor = "pointer";     
            target.innerHTML = "<a href=\"\" id=\"inner-word\" target=\"_blank\" rel=\"preconnect\" rel=\"noopener\"></a>";
            document.getElementById('inner-word').textContent = randomWord;
            document.getElementById('inner-word').href=link;
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
        target.classList.remove('disableLink');
        target.style.cursor = "pointer";     
        target.innerHTML = "<a href=\"\" id=\"inner-word\" target=\"_blank\" rel=\"preconnect\" rel=\"noopener\"></a>";
        document.getElementById('inner-word').textContent = randomWord;
        document.getElementById('inner-word').href=link;
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
document.getElementById('reload').addEventListener('click', init);

/**=======================================================================================================================
 **                                                  Keydown
 *
 *?  listen if user input with the keyborad
 *=======================================================================================================================**/
//  for all letter, 
 window.addEventListener("keydown", function (event) {
    alphabet.forEach(element => {
        switch (event.key) {
            case element:
                guess(event.key);
                break;
        }
    });
    switch (event.key) {
        case "Space":
        init();
            break;
    }
  }, true);

/**=======================================================================================================================
 **                                             Run the game at loading
 *?  Call init function to stat a game
 *@use init 
 *=======================================================================================================================**/
init();

// Dont forget to take a look about:
// Schema.org balisage
// Robots.txt  
// Sitemaps XML
// canonical meta tag