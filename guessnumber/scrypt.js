//Переменные игры
var mysteryNumber = 50;
var playersGuess = 0;
var guessesRemaining = 10;
var guessesMade = 0;
var gameState = "";
//Поля ввода и вывода
var input = document.querySelector("#input");
var output = document.querySelector("#output");
//Кнопка
var button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);
function clickHandler()
{
playGame();
}
function playGame()
{
	guessesRemaining -= 1;
    guessesMade += 1;
    gameState = " Сделано попыток: " + guessesMade + ". Осталось: " + guessesRemaining + ".";
	playersGuess = parseInt(input.value);
	console.log(playersGuess);
	if(playersGuess > mysteryNumber)
	{
		output.innerHTML = "Слишком большое." + gameState;
	}
	else if(playersGuess < mysteryNumber)
	{
		output.innerHTML = "Слишком маленькое" + gameState;
	}
	else if (playersGuess === mysteryNumber)
	{
		output.innerHTML = "Вы угадали!";
	}
	else
	{
		output.innerHTML = "Вы ввели хрень!" + gameState;
	}	
}