// console.log(words);

let lives = 6;
let randomWord = words[Math.floor(Math.random()*words.length)].toLowerCase();
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const target = document.getElementById('word');

function init()
{
    randomWord = words[Math.floor(Math.random()*words.length)].toLowerCase();
    lives = 6;
    updateLives(lives);
    let temp = '_';
    for (let i=1; i<randomWord.length; i++){
        temp += '_';
    }
    target.innerHTML = temp;
}
function guess(userInput){
    let temp = 0;
    if (userInput.length > 1 )
    {
        if (userInput == randomWord)
        {
            return console.log("gagné");
        }
        else
        {
            loseLive();
            console.log("vérification si input > 1");
        }
    }
    else if (userInput.length == 1)
    {
        for (let i=0; i<randomWord.length; i++)
        {
            if (userInput == randomWord[i])
            {
                temp++;
                addLetter(userInput);
            }
        }
        if (temp <= 0)
        {
            loseLive();
            removeLetter();
            console.log("vérification si input < 1");
        }
    }
}
function updateLives(left)
{
    let userInfo = document.getElementById('userInfo');
    userInfo.textContent = 'you have '+left+' lives left.';
}
function loseLive()
{
    lives--;
    updateLives(lives);
    // dessiner un élément du pendu
}
function addLetter(userInput)
{
    for (let i=0; i<randomWord.length; i++)
    {
        if (userInput == randomWord[i])
        {
            tempArr = Array.from(target.textContent);
            tempArr[i] = userInput;
            target.textContent = tempArr.join('');
        }
    }
    // mettre la lettre en vert
}
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
function removeLetter()
{
    // mettre la lettre en rouge
}






document.getElementById('run').addEventListener('click', function()
{
    // let userInput = (document.getElementById('guess').value).toLowerCase();
    // guess(userInput);
    init();
    console.log(randomWord);
});




alphabet.forEach(element => {
    let upper = element.toUpperCase();
    document.getElementById('letter'+upper).addEventListener('click', function()
    {
        guess(element);
        console.log(element);
        console.log(lives);
    })
});



console.log(randomWord);
init();