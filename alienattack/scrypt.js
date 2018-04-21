var alienX = Math.floor(Math.random() * 530);
var alienY = 20;
var guessX = 0;
var guessY = 0;
var shotsRemaining = 8;
var shotsMade = 0;
var gameState = "";
var gameWon = false;

var cannon = document.querySelector("#cannon");
var alien = document.querySelector("#alien");
var missile = document.querySelector("#missile");

var inputX = document.querySelector("#inputX");
var inputY = document.querySelector("#inputY");
var output = document.querySelector("#output");

var button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);
window.addEventListener("keydown", keydownHandler, false);

function keydownHandler(event)
{
if(event.keyCode === 13)
{
playGame();
inputX.value="";
inputY.value="";
}
}

function render()
{
//Позиция пришельца
alien.style.left = alienX + "px";
alien.style.top = alienY + "px";
//Позиция орудия
cannon.style.left = guessX + "px";
//Позиция ракеты
missile.style.left = guessX + "px";
missile.style.top = guessY + "px";
}
function clickHandler()
{
playGame();
inputX.value="";
inputY.value="";
}
function playGame()
{
shotsRemaining -= 1;
shotsMade += 1;
gameState = "<br>Выстрелы: " + shotsMade + ". Осталось: "+ shotsRemaining + ".";
guessX = parseInt(inputX.value);
guessY = parseInt(inputY.value);

//Анализ: Находятся ли введенные игроком
//координаты X и Y внутри области цели
if(guessX >= alienX && guessX <= alienX + 50)
{
//В горизонтальном направлении X находятся,
//теперь проверим вертикальное направление Y
if(guessY >= alienY && guessY <= alienY + 57)
{
//Совпадение по обоим направлениям, т.е. цель поражена!
gameWon = true;
endGame();
}
}
else
{
output.innerHTML = "Мимо!" + gameState;
//Проверка на конец игры
if (shotsRemaining < 1)
{
endGame();
}
}
//Изменение позиции пришельца, если игра еще не выиграна
if(!gameWon)
{
//Изменение координаты X пришельца
alienX = Math.floor(Math.random() * 530);
//Добавим 30 к координате Y, чтобы новая позиция
//пришельца стала ниже и приблизилась к земле
alienY += 35;
}
//Обновление отображения нового состояния игры
render(); console.log("X: " + alienX);
console.log("Y: " + alienY);
}
function endGame()
{
if(gameWon)
{
output.innerHTML
= "Победа! Вы спасли планету!" + "<br>"
+ "Израсходовано ракет: " + shotsMade + ".";
}
else
{
output.innerHTML
= "Вы проиграли!" + "<br>" + "Вторжение началось!";
}
}