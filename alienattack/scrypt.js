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
var explosion = document.querySelector("#explosion");

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
alien.style.left = alienX + "px";
alien.style.top = alienY + "px";
cannon.style.left = guessX + "px";
missile.style.left = guessX + "px";
missile.style.top = guessY + "px";
}

function clickHandler()
{
 validateInput();
inputX.value="";
inputY.value="";
}

function validateInput()
{
guessX = parseInt(inputX.value);
guessY = parseInt(inputY.value);
if(isNaN(guessX) || isNaN(guessY))
{
output.innerHTML = "Вы ввели хрень!";
}
else if(guessX > 530 || guessX < 0)
{
output.innerHTML = "Вы ввели хрень!";
}
else if(guessY > 350 || guessY < 0)
{
output.innerHTML = "Вы ввели хрень!";
}
else
{
playGame();
}
}

function playGame()
{
shotsRemaining -= 1;
shotsMade += 1;
gameState = "<br>Выстрелы: " + shotsMade + ". Осталось: "+ shotsRemaining + ".";
guessX = parseInt(inputX.value);
guessY = parseInt(inputY.value);
if(guessX >= alienX && guessX <= alienX + 50)
{
if(guessY >= alienY && guessY <= alienY + 57)
{
gameWon = true;
endGame();
}
}
else
{
output.innerHTML = "Мимо!" + gameState;
inputX.placeholder = "(0-530)";
inputY.placeholder = "(0-350)";
if (shotsRemaining < 1)
{
endGame();
}
}
if(!gameWon)
{
alienX = Math.floor(Math.random() * 530);
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
= "Победа! Вы спасли планету!" + "<br>"+ "Израсходовано ракет: " + shotsMade + ".";
explosion.style.display = "block";
alien.style.display = "none";
missile.style.display = "none";
explosion.style.left = alienX + "px";
explosion.style.top = alienY + "px";
}
else
{
output.innerHTML
= "Вы проиграли!" + "<br>" + "Вторжение началось!";
}
button.removeEventListener("click", clickHandler, false);
button.disabled = true;
window.removeEventListener("keydown", keydownHandler, false);
inputX.placeholder = "Конец";
inputX.disabled = true;
inputY.placeholder = " игры!";
inputY.disabled = true;
}