let randomFlash = [];
let userInput = [];

let gameStarted = false;
let levelNum = 0;
let cvalue = 0;
let k = 0;
let cov = 0;

let body = document.querySelector("body");
let boxes = document.querySelectorAll(".box");
let h3 = document.querySelector("h3");
let h1 = document.querySelector("h1");
let startSign = document.querySelector(".startwin");
let allContent = document.querySelector(".allcontent");

//Game Start
body.addEventListener("keydown", function startGame() {
    
    if(gameStarted == false) {
        randomFlash = [];
        userInput = [];
        levelNum = 0;
        cov = 0;
        startwindow();
        setTimeout(() => {
            h1.style.visibility = "visible";
            h3.style.visibility = "visible";
            levelUp();
        }, 2000);
              
        gameStarted = true;
    }
          
});

//function for game started window
function startwindow() {
    startSign.classList.add("startdis");
    h1.style.visibility = "hidden";
    h3.style.visibility = "hidden";

    setTimeout(() => {
        startSign.classList.remove("startdis"); 
    }, 2000);
}

//calling click id store function
getIdNum();

// Random Value Selection Function
function random() {
    let randomv = Math.floor(Math.random() * 4);
    return randomv;
};

//Random Flash Function
function lightingFlash() {
    let startFlash = random();
    boxes[startFlash].classList.add("flash");
    setTimeout( ()=> {
        boxes[startFlash].classList.remove("flash");
    }, 250);
    randomFlash.push(startFlash);
    console.log(`Random Flash array: ${randomFlash}`);
}

//User Click Id Store Function
function getIdNum() {
    for(box of boxes){
        box.addEventListener("click", function(event) {
            if(gameStarted) {
                cov = parseInt(this.id);
                userInput.push(cov);
                console.log(userInput);
                compareValue();
                cov = 0;
            }
            
        });
    }    
};

//Level up Function
function levelUp() {
    userInput = [];
    k = 0;
    cvalue = 0;
    h3.innerText = `Level ${++levelNum}`;
    setTimeout(lightingFlash, 810);
}

//code for click flash
for(box of boxes){
    box.addEventListener("click", function(event) {
        if(gameStarted){
            this.classList.add("flash");

            setTimeout( ()=> {
                this.classList.remove("flash");
            }, 120);
        }  
    });
}

//Compare value function
function compareValue() {
    if(randomFlash[cvalue] == userInput[cvalue]){
        k++;
    }
    else{
        h3.innerHTML = `Game Over! Your score was <b>${levelNum-1}</b> <br> Press any key to start the game again.`;
        allContent.style.backgroundColor = "red";
        setTimeout(() => {
            allContent.style.backgroundColor = "#e1e2e6";
        }, 150);

        resetAll();
    }
    cvalue++;

    if(k == levelNum){
        levelUp();       
    } 
}

//reset function
function resetAll() {
    gameStarted = false;       
}