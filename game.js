// Create a Gameboard

function createGameboard(rows, cols){
    let gameboard = [];
    for(let row = 0; row<rows; row++){
        gameboard[row] = [];
        for(let col = 0; col<cols; col++){
            gameboard[row].push('#');
        }
    }
    const getRows = () => rows;
    const getCols = () => cols;
    return {gameboard, getRows, getCols};
}

// Create players
function createPlayer(name, marker){
    let error = "No error";
    if (typeof(name) !== "string"){
        return{name, marker, error : "Kindly enter alphanumberic characters only in the name"};
    }
    if (marker !== "X" && marker !== "O"){
        return{name, marker, error: "Kindly use either X or O as the marker for the player"}
    }
    return {name, marker, error};
}

// Define a way to play a move for players
function playMove(player, ongoingGame, posX, posY){
    const marker = player.marker;
    let error = "No Error";


    if(posX > ongoingGame.getCols() || posY > ongoingGame.getRows()){
        return {ongoingGame, error: "Move outside play area"};
    }
    
    // let gameboard = ongoingGame.gameboard;
    // Check for a marker present on the gameboard
    if(ongoingGame.gameboard[posX][posY] != '#'){
        return {ongoingGame, error: "Move exists"};
    }
    ongoingGame.gameboard[posX][posY] = marker;
    // ongoingGame.gameboard = gameboard;
    return {ongoingGame, error};
}

let gameBoard = createGameboard(3, 3);
const player1 = createPlayer("Avi", 'X')
const player2 = createPlayer("Saumya", 'O')

// let game_state;
// game_state = playMove(player1, gameBoard, 0, 0);
// console.log(game_state.ongoingGame.gameboard)
// game_state = playMove(player2, gameBoard, 1, 2);
// console.log(game_state.ongoingGame.gameboard)
// game_state = playMove(player1, gameBoard, 2, 2);
// console.log(game_state.ongoingGame.gameboard)

// After 2 moves, check for winnings and display the winner

// Handle edge cases in player creation etc