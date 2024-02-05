var numSelected = null;
var tileSelected = null;
var errors = 0;
var startTime = 0;
var timerInterval;

var board = [
    "---8-----",
    "4---15-3-",
    "-29-4-518",
    "-4----12-",
    "---6-2---",
    "-32----9-",
    "693-5-87-",
    "-5-48---1",
    "-----3---"
];

var solution = [
    "315827946",
    "468915732",
    "729346518",
    "946538127",
    "571692483",
    "832174695",
    "693251874",
    "257489361",
    "184763259"
];

window.onload = function() {
    setGame();
    startTimer();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }
    // 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("present");
            }
            if (r % 3 == 2) {
                tile.style.borderBottom = "2px solid black"; // Add bold line for every 3 rows
            }
            if (c % 3 == 2) {
                tile.style.borderRight = "2px solid black"; // Add bold line for every 3 columns
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let currentTime = Date.now();
    let elapsedTime = Math.floor((currentTime - startTime) / 1000); // in seconds

    let minutes = Math.floor(elapsedTime / 60);
    let seconds = elapsedTime % 60;

    document.getElementById("timer").innerText = formatTime(minutes) + ":" + formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function stopTimer() {
    clearInterval(timerInterval);
}
