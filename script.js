////////////////////////////////////////////
// Setting Global variables / classes
////////////////////////////////////////////
// Creating variables to be used across the global scope

// Player class for user and AI
class Player {
    constructor (name) {
        this.name = name
        this.isTurn = false
        this.isWinner = false
        this.score = 0
    } 

    // Methods to set and get the above
    setName (name) {this.name = name}
    setTurn (turn) {this.turn = turn}
    setWinner (winner) {this.winner = winner}
    setScore (score) {this.score = score}
    getName () {return this.name}
    getTurn () {return this.isTurn}
    getWinner () {return this.isWinner}
    getScore () {return this.score}   
}

// Instanciating 2 players of the above class, with basic info.
const player1 = new Player ("Player 1")
const player2 = new Player ("Player 2")

// Sounds
const scribbleSound1 = new Audio("./sounds/scribble1.wav")
const scribbleSound2 = new Audio("./sounds/scribble2.wav")
const hmmSound = new Audio("./sounds/Hmm.wav")
const ahhSound1 = new Audio("./sounds/Ahh1.wav")
const ahhSound2 = new Audio("./sounds/Ahh2.wav")
const aiSound1 = new Audio("./sounds/AI1.wav")
const aiSound2 = new Audio("./sounds/AI2.wav")


// Creates variable to track if game is still running
let matchOver = false;

// Creates variable to track if PVP or PVE
let pvp = true;

// Variable to store the size of the board. Default starter value is 3
let boardSize = 3

// Variable to keep track of rounds
const roundNumber = 0

// Variable to keep track of turns (Player 1 = 1, Player 2 = -1)
// Initially set to Player 1's turn
let turn = 1

// Creates variable to track button elements in HTML
restartButton = document.querySelector(".restart-button")
btn3x3 = document.querySelector(".btn-3x3")
btn5x5 = document.querySelector(".btn-5x5")

// Adds listeners for buttons
restartButton.addEventListener("click", () => {restartGame()})
// btn3x3.addEventListener("click", ()=>{})

btn3x3.addEventListener("click", ()=>{
    // console.log("3x3 clicked")
    cleanBoard()
    setupBoard3()
    
})

btn5x5.addEventListener("click", ()=>{
    // console.log("5x5 clicked")
    cleanBoard()
    setupBoard5()
    
})

// Creates variable to store the result h3 element under the board
let matchResults = document.querySelector(".match-results")

// Creates variable to store the Score indicator in the HTML
let score1 = document.querySelector(".score1")
let score2 = document.querySelector(".score2")

// AI switch variable and it's event listener
let switch1 = document.querySelector("#switch1")
let AIh4 = document.querySelector(".AIh4")

switch1.addEventListener("click", (event)=>{
    if (event.target.checked) {
        pvp = false 
        AIh4.innerText = "AI: on"
        aiSound1.play()
    }
    else {
        pvp = true 
        AIh4.innerText = "AI: off"
        aiSound2.play()
    }
})

// Filtered array with free board spaces
let filteredArr = []

// Create variable to store the moveIndicator value
const turnIndicator = document.querySelector(".turn-indicator")

// Default mode is 3x3
scoreSetter()
setupBoard3()
turnSetter(turn)

