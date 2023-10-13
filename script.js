//your code here
const snake = document.getElementById('pixel2')
const gameContainer = document.getElementById('gameContainer')
let row = 1, column = 1
let foodItemList = []
const score = document.getElementById('score')

function moveSnakeToRight() {
    eatFood()
    let currentOffset = (column - 1) * 10
    snake.style.left = (currentOffset + 10) + "px"
    column++
    if (column == 41) {
        column = 0
        snake.style.left = "0px"
    }
}
function moveSnakeToLeft() {
    eatFood()
    let currentOffset = (column - 1) * 10
    snake.style.left = (currentOffset - 10) + "px"
    column--
    if (column == 0) {
        column = 40
        snake.style.left = "390px"
    }
}
function moveSnakeToTop() {
    eatFood()
    let currentOffset = (row - 1) * 10
    snake.style.top = (currentOffset - 10) + "px"
    row--
    if (row == 0) {
        row = 40
        snake.style.top = "390px"
    }
}
function moveSnakeToBottom() {
    eatFood()
    let currentOffset = (row - 1) * 10
    snake.style.top = (currentOffset + 10) + "px"
    row++
    if (row == 41) {
        row = 0
        snake.style.top = "0px"
    }
}

let intervalId = setInterval(moveSnakeToRight, 100);

document.addEventListener('keyup', e => {
    if (["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(e.key)) {
        clearInterval(intervalId)
    }
    if (e.key == "ArrowUp") {
        intervalId = setInterval(moveSnakeToTop, 100);
    }
    else if (e.key == "ArrowDown") {
        intervalId = setInterval(moveSnakeToBottom, 100);
    }
    else if (e.key == "ArrowLeft") {
        intervalId = setInterval(moveSnakeToLeft, 100);
    }
    else if (e.key == "ArrowRight") {
        intervalId = setInterval(moveSnakeToRight, 100);
    }
})

function generateRandomOffset(){
    let num = Math.random()*39
    return Math.floor(num)*10
}


for(let i=1; i<=5; i++){
    const food = document.createElement('div')
    const id = "pixel"+(3*i)
    const top = generateRandomOffset()
    const left = generateRandomOffset()
    food.style.left = left+"px"
    food.style.top = top+"px"
    food.className = "food"
    food.id = id
    let foodItemObj = {
        left,top, id
    }
    foodItemList.push(foodItemObj)
    gameContainer.appendChild(food)
}

function eatFood(){
    let snakeTop = (row-1)*10
    let snakeLeft = (column-1)*10
    let eatFoodId
    foodItemList.forEach((el,i)=>{
        if(snakeTop==el.top && snakeLeft==el.left){
            eatFoodId = el.id
            score.innerText = parseInt(score.innerText)+10
        }
    })
    foodItemList = foodItemList.filter(el=>el.id!=eatFoodId)
    console.log(eatFoodId)
    if(eatFoodId){
        let eatFoodElement = document.getElementById(eatFoodId)
        eatFoodElement.remove()
    }
}