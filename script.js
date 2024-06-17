
let boxes = document.querySelectorAll('.cell');
let statustxt = document.querySelector('.statustext');
let RestartBtn = document.querySelector('.restartBtn');
let XOXvalue = "X";
let player1 = "PLAYER1";
let player2 = "PLAYER2";
const win = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];

let option = ["", "", "", "", "", "", "", "", ""]; //=["player1","player2","player1","player1",....]
let currentPlayer = XOXvalue;
let Playernames = player1;
let running = false;
init();



function init() {
    boxes.forEach(box => box.addEventListener('click', boxClick));
    RestartBtn.addEventListener('click', RestartGame);
    statustxt.textContent = `${Playernames},Its's Your Turn`;
    running = true;
}

function boxClick() {
    let index = this.getAttribute("cellIndex");
    if (option[index] != "" || !running) {
        return;
    }
    updateBox(this, index);
    checkWinner();

}

function updateBox(box, index) {
    option[index] = Playernames;
    box.textContent = currentPlayer;
    if (currentPlayer === "O") {
        box.style.color = "yellow";
    }
    if (currentPlayer === "X") {
        box.style.color = "aqua";

    }

}

function checkWinner() {
    let isWon = false;
    for (let i = 0; i < win.length; i++) {
        let condtion = win[i]; //[0,1,2]
        let box1 = option[condtion[0]];
        let box2 = option[condtion[1]];
        let box3 = option[condtion[2]];

        if (box1 == "" || box2 == "" || box3 == "") {
            continue;

        }
        if (box1 == box2 && box3 == box2) {
            isWon = true;
            if (box1 == player1 && box2 == player1 && box3 == player1) {
                boxes[condtion[0]].classList.add('win');
                boxes[condtion[1]].classList.add('win');
                boxes[condtion[2]].classList.add('win');

            }
            else {

                boxes[condtion[0]].classList.add('win2');
                boxes[condtion[1]].classList.add('win2');
                boxes[condtion[2]].classList.add('win2');

            }
        }

    }
    if (isWon) {
        statustxt.textContent = `${Playernames} won`;
        running = false;

    }
    else if (!option.includes("")) {
        statustxt.textContent = "Match Draw";
        running = false;
    }
    else {
        changePlayer();

    }


}

function RestartGame() {

    option = ["", "", "", "", "", "", "", "", ""];
    // currentPlayer = (currentPlayer == "X") ? "O" : "X";
    running = true;
    boxes.forEach(box => box.innerHTML = "");
    statustxt.textContent = `${Playernames},Its's Yours Turn`;
    boxes.forEach(box => {
        box.classList.remove('win');
        box.classList.remove('win2');
        box.innerHTML = "";
    })



}
function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    Playernames = (Playernames == player1) ? player2 : player1;
    statustxt.textContent = `${Playernames},Its's Yours Turn`;


}

