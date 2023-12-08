const prompt = require("prompt-sync")();
// Create a Gameboard

function createGameboard(rows, cols){
    let gameboard = [];
    for(let row = 0; row<rows; row++){
        gameboard[row] = [];
        for(let col = 0; col<cols; col++){
            gameboard[row].push('');
        }
    }
    const getRows = () => rows;
    const getCols = () => cols;
    return {gameboard, getRows, getCols};
}

// Create players
function createPlayer(name, marker){
    let error = null;
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
    let error = null;
    if(posX > ongoingGame.getCols()-1 || posY > ongoingGame.getRows()-1){
        return {ongoingGame, error: "Move outside play area"};
    }
    // let gameboard = ongoingGame.gameboard;
    // Check for a marker present on the gameboard
    if(ongoingGame.gameboard[posX][posY] != ''){
        return {ongoingGame, error: "Move exists"};
    }
    ongoingGame.gameboard[posX][posY] = marker;
    // ongoingGame.gameboard = gameboard;
    return {ongoingGame, error};
}

function checkForWin(ongoingGame, player){
    const marker = player.marker;
    
    // checking for horizontal win
    for (let i =0; i<ongoingGame.getRows(); i++){
        let chkr;
        for (j=0; j<ongoingGame.getCols(); j++){
            chkr = chkr + ongoingGame.gameboard[i][j]
        }
        if (chkr === marker.repeat(ongoingGame.getCols())){
            return true
        }
    }
    
    // checking for vertical win
    for (let i =0; i<ongoingGame.getCols(); i++){
        let chkr;
        for (j=0; j<ongoingGame.getRows(); j++){
            chkr = chkr + ongoingGame.gameboard[j][i]
        }
        if (chkr === marker.repeat(ongoingGame.getRows())){
            return true
        }
    }

    // checking for diagonal win
    for (let i=0; i<ongoingGame.getRows(); i++){
        let chkr1, chkr2;
        const rows = ongoingGame.getRows();
        chkr1 += ongoingGame.gameboard[i][i]
        chkr2 += ongoingGame.gameboard[rows-1-i][rows-1-i]
        if (chkr1 === marker.repeat(ongoingGame.getCols()) || chkr2 === marker.repeat(ongoingGame.getCols())){
            return true
        }
    }
    return false
}

// Check for draw by flattening out the entire board and check if any cell is without a mark
function checkForDraw(ongoingGame){
    return ongoingGame.gameboard.flat().every(cell => cell !== '')
}

function playTicTacToe(){
    console.log('Ready to play Tic-Tac-Toe ?')
    const user_input_dims = prompt("Enter the dimensions of the board (eg. 3x3): ")
    const rows = user_input_dims.split('x')[0]
    const cols = user_input_dims.split('x')[1]
    let game = createGameboard(rows, cols);

    const user_input_player1 = prompt("Enter the name of player playing with X : ")
    const user_input_player2 = prompt("Enter the name of player playing with O : ")
    const player1 = createPlayer(user_input_player1, 'X')
    const player2 = createPlayer(user_input_player2, 'O')

    let currentPlayer = player1

    while(true){
        console.log(`${currentPlayer.name}'s turn: `);
        const mark_loc = prompt(`Enter mark loc (eg 1,2): `)
        const row = mark_loc.split(',')[0]
        const col = mark_loc.split(',')[1]

        const result = playMove(currentPlayer, game, row, col)
        if(result.error){
            console.log(`Error: ${result.error}`)
            continue;
        }
        let w = checkForWin(game, currentPlayer);
        console.log(w);
        let d = checkForDraw(game);
        console.log(d);
        // if(checkForWin(game, currentPlayer)){
        //     console.log(checkForWin(game, currentPlayer))
        //     console.log(`${currentPlayer.name} wins!!!`)
        //     break
        // }
        if (checkForDraw(game)){
            console.log("Match is a draw")
            break
        }
        console.log("Current board:");
        console.log(game.gameboard)
        currentPlayer = currentPlayer === player1 ? player2:player1
    }
}

playTicTacToe();