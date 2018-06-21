var map = [];
map[0] = "Белка.";
map[1] = "Сова.";
map[2] = "Детская площадка.";
map[3] = "Темное место. Кажется, там кто-то прячется.";
map[4] = "Центр.";
map[5] = "Мостик.";
map[6] = "Место преступления.";
map[7] = "Вход.";
map[8] = "Полциейская машина.";
var images = [];
images[0] = "белка.jpg";
images[1] = "сова.jpg";
images[2] = "площадка.jpg";
images[3] = "темное.jpg";
images[4] = "центр.jpg";
images[5] = "мостик.jpg";
images[6] = "место.jpg";
images[7] = "вход.jpg";
images[8] = "машина.jpg";
var blockedPathMessages = [];
blockedPathMessages[0] = "Если бы маньяк пробежал здесь, то точно бу спугнул белку. В другую сторону?";
blockedPathMessages[1] = "Сова покачнулась и начала падать. Кажется, за ней что-то есть. Надо посмотреть.";
blockedPathMessages[2] = "Дети играют на площадке, всё тихо. Не будем их пугать. Куда теперь?";
blockedPathMessages[3] = "Тут темно, идеальное место, чтобы скрыться. Но идти на маньяка голыми руками? Ты в безумии?";
blockedPathMessages[4] = "Эээ... это же центр.";
blockedPathMessages[5] = "Да он же почти весь сломан! Тут бы никто не пробежал.";
blockedPathMessages[6] = "Искать маньяка у места преступления? Смеешься?";
blockedPathMessages[7] = "Зачем нам выходть из парка? Мы же знаем, что он убежал внутрь.";
blockedPathMessages[8] = "Сюда мы его лучше потом притащим.";
var items = ["фонарик"];
var itemLocations = [6];
var itemsIKnow = ["ботинок", "фонарик", "нож", "маньяк"];
var item = "";
var backpack= [];
var image = document.querySelector("img");
var mapLocation = 4;
var playersInput = "";
var gameMessage = "";
var actionsIKnow = ["вперед", "направо", "назад", "налево", "взять","использовать", "выбросить"];
var action = "";
var output = document.querySelector("#output");
var input = document.querySelector("#input");
var button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);
render();
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
    playersInput = input.value;
    playersInput = playersInput.toLowerCase();
    gameMessage = "";
    action = "";
    for(i = 0; i < actionsIKnow.length; i++)
    {
        if(playersInput.indexOf(actionsIKnow[i]) !== -1)
        {
        action = actionsIKnow[i];
        console.log("Действие игрока: " + action);
        break;
        }
    }
    for(i = 0; i < itemsIKnow.length; i++)
    {
        if(playersInput.indexOf(itemsIKnow[i]) !== -1)
        {
        item = itemsIKnow[i];
        console.log("Выбранный игроком предмет: " + item);
        }
    }
        switch(action)
        {
        case "вперед":
        if(mapLocation >= 3)
            {
                mapLocation -= 3;
            }
        else
            {
                gameMessage = blockedPathMessages[mapLocation];
            }
        break;
        case "направо":
        if(mapLocation % 3 != 2)
        {
        mapLocation += 1;
        }
        else
        {
        gameMessage = blockedPathMessages[mapLocation];
        }
        break;
        case "назад":
        if(mapLocation < 6)
        {
        mapLocation += 3;
        }
        else
        {
        gameMessage = blockedPathMessages[mapLocation];
        }
        break;
        case "налево":
        if(mapLocation % 3 != 0)
        {
        mapLocation -= 1;
        }
        else
        {
        gameMessage = blockedPathMessages[mapLocation];
        }
        break;
        case "взять":
        takeItem();
        break;
        case "выбросить":
        dropItem();
        break;
        case "использовать":
        useItem();
        break;
        default:
        gameMessage = "Что-то не то";
        }
        render();
    }
function takeItem()
{
var itemIndexNumber = items.indexOf(item);
if(itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === mapLocation)
    {
    gameMessage = "Вы взяли " + item + ".";
    backpack.push(item);
    items.splice(itemIndexNumber, 1);
    itemLocations.splice(itemIndexNumber, 1);
    console.log("Предметы МИРА: " + items);
    console.log("Предметы РЮКЗАКА: " + backpack);
    }
else
    {
    gameMessage = "Вы не можете это сделать.";
    }
}
function dropItem()
{
    if(backpack.length !== 0)
    {
        var backpackIndexNumber = backpack.indexOf(item);
        if(backpackIndexNumber !== -1)
            {
            gameMessage = "Вы бросили " + item + ".";
            items.push(backpack[backpackIndexNumber]);
            itemLocations.push(mapLocation);
            backpack.splice(backpackIndexNumber, 1);
            }
        else
        {
        gameMessage = "Вы не можете это сделать.";
        }
    }
    else
    {
    gameMessage = "У вас ничего нет.";
    }
}
function useItem()
{
    var backpackIndexNumber = backpack.indexOf(item);
    if(backpackIndexNumber === -1)
        {
        gameMessage = "У вас этого нет.";
        }
    if(backpack.length === 0)
        {
        gameMessage += " У вас ничего нет";
        }
    if(backpackIndexNumber !== -1)
        {
        switch(item)
            {
				case "маньяк":
                if(mapLocation === 8)
                    {
                    gameMessage = "Вы передаете маньяка в руки полицеских.";
                    gameMessage += "Отличная работа!";
					backpack.splice(backpackIndexNumber, 1);
					itemLocations.push(mapLocation);
                    }
                else
                    {
                    gameMessage = "Тут уже никого нет. Решил его отпустить? ну-ну!!"
                    }
                break;
				
                case "нож":
                if(mapLocation === 3)
                    {
                    gameMessage = "Вы замахиваетесь и задеваете его по руке. Маньяк, кажется, ранен. ";
                    gameMessage += "Пора тащить его к машине!";
					items.push("маньяк");
                    itemLocations.push(mapLocation);
                    }
                else
                    {
                    gameMessage = "И? Зачем он тебе тут? Прохожих пугать?"
                    }
                break;
                case "ботинок":
                if(mapLocation === 6)
                    {
                    gameMessage = "Вы подходите к полицейскому и показываете улику. ";
                    gameMessage += "'Хм... ты напал на след? Ну не можешь не влезать в опасные дела! Ладно... возьми ка ты нож. Живее будешь!' "
                    gameMessage += "Полицейский протягивает тебе нож:'Только не вздумай никогму говорить!'";
					backpack.splice(backpackIndexNumber, 1);
                    items.push("нож");
                    itemLocations.push(mapLocation);
                    }
                else
                    {
                    gameMessage = "ТЫ ЧТО? ХОЧЕШЬ ВЫБРОСИТЬ ЗДЕСЬ УЛИКУ!?!"
                    gameMessage += "Ну ты вообще!!!";
                    }
                break;
                case "фонарик":
                if(mapLocation === 1)
                {
                gameMessage = "Вы светите фонариком, кажется, там что-то есть.";
                gameMessage += "О! Это же ботинок! Важная улика!";
                backpack.splice(backpackIndexNumber, 1);
                items.push("ботинок");
                itemLocations.push(mapLocation);
                }
                else
                {
                gameMessage = "Вы светите фонариком в разные темные уголки, но там ничего нет.";
                }
                break;
                }
            }
}
function render()
{
output.innerHTML = map[mapLocation];
image.src = "../khimkiforest/Image/" + images[mapLocation];
for(var i = 0; i < items.length; i++)
    {
    if(mapLocation === itemLocations[i])
        {
        output.innerHTML+= "<br>Вы видите здесь <strong>" + items[i] + "</strong>.";
        }
    }
output.innerHTML += "<br><em>" + gameMessage + "</em>";
if(backpack.length !== 0)
    {
    output.innerHTML += "<br>Вы несете: "+ backpack.join(", ") ;
    }
}

