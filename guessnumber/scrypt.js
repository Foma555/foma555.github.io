
var mysteryNumber = Math.floor(Math.random() * 100);
console.log(mysteryNumber);
var playersGuess = 0;
var guessesRemaining = 10;
var guessesMade = 0;
var gameState = "";
var gameWon = false;

var input = document.querySelector("#input");
var output = document.querySelector("#output");
var arrow = document.querySelector("#arrow");

var button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);
window.addEventListener("keydown", keydownHandler, false);
function keydownHandler(event)
{
if(event.keyCode === 13)
{
playGame();
input.value="";
}
}
function clickHandler()
{
playGame();
input.value="";
}
function playGame()
{
	guessesRemaining -= 1;
    guessesMade += 1;
    gameState = " Cделано попыток: " + guessesMade + ". Осталось: " + guessesRemaining + ".";
	playersGuess = parseInt(input.value);
	console.log(playersGuess);
	if(playersGuess > mysteryNumber)
	{
		output.innerHTML = "Перебор!" + "<br>" + gameState;
    if (guessesRemaining < 1)
        {
        endGame();
        }
	}
	else if(playersGuess < mysteryNumber)
	{
		output.innerHTML = "Нужно больше!" + "<br>" + gameState;
    if (guessesRemaining < 1)
        {
        endGame();
        }
	}
	else if (playersGuess === mysteryNumber)
	    {
		gameWon = true;
        endGame();
	    }
	else
	{
		output.innerHTML = "Вы ввели хрень!" + "<br>" + gameState;
		if (guessesRemaining < 1)
        {
        endGame();
        }
		
	}
   render();	
}
function endGame()
{
if (gameWon)
{
output.innerHTML
= mysteryNumber +  " - это успех! " + "<br>" + "Количество попыток: " + guessesMade + ".";
}
else
{
output.innerHTML
= "Попыток больше нет. Вы проиграли!" + "<br>"
+ "Было загадано число " + mysteryNumber + ".";
}
button.removeEventListener("click", clickHandler, false);
button.disabled = true;
window.removeEventListener("keydown", keydownHandler, false);
input.placeholder = "Конец игры!";
input.disabled = true;
}
function render()
{
arrow.style.left = playersGuess * 6 + 312 + "px";
}