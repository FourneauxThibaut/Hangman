let lives = 6;
let win = false;
let randomWord = ''
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const drawing = ['head', 'body', 'lArm', 'rArm', 'lLegs', 'rLegs'];
const target = document.getElementById('word');

// initialise les variable ou les remet à 0 pour refaire une partie.
// 🇮​​​​​🇳​​​​​🇮​​​​​🇹​​​​​
function init()
{
    // take a random animal from wordList.js
    randomWord = words[Math.floor(Math.random()*words.length)].toLowerCase();
    lives = 6;
    win = false;
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
    drawing.forEach(element => {
        document.getElementById( element ).classList.remove('active');
    });
    
    document.getElementById('guess').disabled = false;

    return randomWord;
}

// vérifie si la lettre ou le mot correspond.
// 🇬​​​​​🇺​​​​​🇪​​​​​🇸​​​​​🇸​​​​​
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
                loseLive();
                removeLetter(userInput);
            }
        } 
}

// mets à jour l'affichage des vies.
// 🇺​​​​​🇵​​​​​🇩​​​​​🇦​​​​​🇹​​​​​🇪​​​​​🇱​​​​​🇮​​​​​🇻​​​​​🇪​​​​​🇸
function updateLives(left)
{
    let userInfo = document.getElementById('userInfo');
    userInfo.textContent = 'you have '+left+' lives left.';
}

// retire une vie et dessine une partie du pendu.
// 🇱​​​​​🇴​​​​​🇸​​​​​🇪​​​​​🇱​​​​​🇮​​​​​🇻​​​​​🇪​​​​​
function loseLive()
{
    if (lives > 0){
        lives--;
        updateLives(lives);
        draw();
    }
}
function draw()
{
    let errorNbr = 6-lives;
    document.getElementById( drawing[ (errorNbr)-1 ] ).classList.add('active');
}

// ajoute la lettre du mots dans l'affichage
// 🇦​​​​​🇩​​​​​🇩​​​​​🇱​​​​​🇪​​​​​🇹​​​​​🇹​​​​​🇪​​​​​🇷​​​​​
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
    result();
}
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

// retire le pointer et met la lettre en rouge
// 🇷​​​​​🇪​​​​​🇲​​​​​🇴​​​​​🇻​​​​​🇪​​​​​🇱​​​​​🇪​​​​​🇹​​​​​🇹​​​​​🇪​​​​​🇷
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

// 🇷​​​​​🇪​​​​​🇸​​​​​🇺​​​​​🇱​​​​​🇹​​​​​
// vérifie si la personne à gagné
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

            document.getElementById('guess').disabled = true;
        }    
    }
    else{
        document.getElementById('userInfo').innerText;
        // let message = 'You lose ! the word was '+randomWord;
        document.getElementById('userInfo').innerText = 'You lose !';
        document.getElementById('userInfo').classList.add('lose');

        target.textContent = randomWord;
        target.classList.add('red');

        win = true;

        document.getElementById('guess').disabled = true;
    }
    
}

// 🇧​​​​​🇺​​​​​🇹​​​​​🇹​​​​​🇴​​​​​🇳​​​​​🇸
if (win != true)
{
    // crée un boutton pour chaque lettres.
    alphabet.forEach(element => {
        let upper = element.toUpperCase();
        document.getElementById('letter'+upper).addEventListener('click', function(e)
        {
            guess(element);
        })
    });
    // vérifie si l'utilisateur entre une input
    document.getElementById('run').addEventListener('click', function(e)
    {
        let userInput = (document.getElementById('guess').value).toLowerCase();
        guess(userInput);
        document.getElementById('guess').value = '';
    });
    // vérifie si l'utilisateur reload
    document.getElementById('reload').addEventListener('click', function(e)
    {
        init();
        // console.log(randomWord);-------------------------------------------------------------------------------------------------------------------
    });
}
else
{
    document.getElementById('run').removeEventListener('click', arguments.callee);
    alphabet.forEach(element => {
        let upper = element.toUpperCase();
        document.getElementById('letter'+upper).removeEventListener('click', arguments.callee);
    });
}

// initialise le jeux et affiche le mots dans la console.
init();
// console.log(randomWord); -------------------------------------------------------------------------------------------------------------------


