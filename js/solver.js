const width = 4;
const height = 5;

const initBoard = () => [1,0,0,2,1,0,0,2,3,5,5,4,3,6,7,4,8,-1,-1,9];

const puzzleSolved = (board) => board[17] == 0 && board[18] == 0;

const squareToCoords = (square) => [Math.floor(square / width), square % width];

const coordsToSquare = (r, c) => r * width + c;

const shuffle = (array) => {

    for (let i = array.length - 1; i > 0; i--) {

        let j = Math.trunc(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]]; 
    }

    return array;
}

const getHashKey = (board) => {

    let key = '';
    let table = ['S','v','v','v','v','h','s','s','s','s'];

    for (let i = 0; i < board.length; i++) {

        let block = board[i];
        
        key += block == -1 ? ' ' : table[block];
    }

    return key;
}

const getBlocks = (board) => {

    let blocks = [[],[],[],[],[],[],[],[],[],[]];

    for (let i = 0; i < board.length; i++) {

        let val = board[i];

        if (val != -1) blocks[val].push(i);
    }

    return blocks;
}

const getNextBoards = (board) => {

    let newBoards = [];
    let blocks = getBlocks(board);
    let offsets = [[1, 0],[-1, 0],[0, 1],[0, -1]];
    
    for (let [i, block] of blocks.entries()) {

        offsets.length = 4;

        outer: for (let offset of offsets) {

            let newSquares = [];
            let newBoard = [];

            for (let i = 0; i < board.length; i++) {
                newBoard[i] = board[i];
            }

            for (let square of block) {

                let [r, c] = squareToCoords(square);
                let r2 = r + offset[0];
                let c2 = c + offset[1];

                if (r2 < 0 || r2 >= height || c2 < 0 || c2 >= width) continue outer;

                let newSquare = coordsToSquare(r2, c2);

                if (board[newSquare] != board[square] && board[newSquare] != -1) continue outer;

                if ((Math.abs(offset[0]) == 2 || Math.abs(offset[1]) == 2) && 
                    board[coordsToSquare(r + offset[0] / 2, c + offset[1] / 2)] != -1 &&
                    board[coordsToSquare(r + offset[0] / 2, c + offset[1] / 2)] != board[square]) continue outer;

                newBoard[square] = -1;

                newSquares.push(newSquare);
            }
            
            for (let square of newSquares) {
                newBoard[square] = i;
            }

            newBoards.push(newBoard);

            offsets.push([offset[0] * 2, offset[1] * 2]);
        }
    }

    return shuffle(newBoards);
}

const getMove = (board1, board2) => {

    for (let i = 0; i < board1.length; i++) {

        if (board1[i] == board2[i]) continue;

        if (board1[i] == -1) {
            
            let j = board1.indexOf(board2[i]);

            return [board2[i], j, i];

        } else {

            let j = board2.indexOf(board1[i]);

            return [board1[i], i, j];
        }
    }
}

const getSolution = (board) => {

    let moves = [];

    while (board != undefined) {

        if (board.prev != undefined) moves.push(getMove(board.prev, board));

        board = board.prev;
    }

    return moves.reverse();
}

const bfs = () => {

    let queue = [];
    let board = initBoard();
    let visitedBoards = new Set();

    queue.push(board);
    visitedBoards.add(getHashKey(board));

    while (queue.length > 0) {

        let currentBoard = queue.shift();
        let nextBoards = getNextBoards(currentBoard);

        for (let nextBoard of nextBoards) {

            nextBoard.prev = currentBoard;

            if (visitedBoards.has(getHashKey(nextBoard))) continue;
            if (puzzleSolved(nextBoard)) return getSolution(nextBoard);

            queue.push(nextBoard);
            visitedBoards.add(getHashKey(nextBoard));
        }
    }
}

postMessage(bfs());