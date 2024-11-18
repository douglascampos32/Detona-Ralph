const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        Score: document.querySelector("#score"),
        life: document.querySelector("#life"),
        gameOverScreen: document.getElementById("game-over"),  
        finalScore: document.getElementById("final-score"),    
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        life: 3,  
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    
    if (state.values.currentTime <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.view.finalScore.textContent = state.values.result; 
    state.view.gameOverScreen.style.display = 'flex';  
}

function playSound() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.Score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            } else {
                state.values.life--;
                state.view.life.textContent = state.values.life; 

                if (state.values.life <= 0) {
                    endGame();
                }
            }
        });
    });
}

function restartGame() {
    state.values.result = 0;
    state.values.life = 3;
    state.values.currentTime = 60;
    state.view.Score.textContent = state.values.result;
    state.view.life.textContent = state.values.life;
    state.view.timeLeft.textContent = state.values.currentTime;

    
    state.view.gameOverScreen.style.display = 'none';

    
    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}


function initialize() {
    addListenerHitBox();
    state.view.gameOverScreen.addEventListener("click", restartGame);
}

initialize();
