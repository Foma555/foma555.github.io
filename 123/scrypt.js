//Переменные игры
var mysteryNumber = 50;
var playersGuess = 0;
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
playersGuess = parseInt(input.value);
if(playersGuess > mysteryNumber)
{
output.innerHTML = "Слишком большое";
}
else if(playersGuess < mysteryNumber)
{
output.innerHTML = "Слишком маленькое";
}
else if (playersGuess === mysteryNumber)
{
output.innerHTML = "Вы угадали!";
}
else
{
output.innerHTML = "Вы ввели хрень!";
}
}