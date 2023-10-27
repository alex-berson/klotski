const width = 4;
const height = 5;

const initBoard = () =>  [1,0,0,2,1,0,0,2,3,5,5,4,3,6,7,4,8,-1,-1,9];

const squareToCoords = (square) => [Math.floor(square / width), square % width];

const coordsToSquare = (r, c) => r * width + c;

const puzzleSolved = (board) => board[17] == 0 && board[18] == 0;

const shuffle = (array) => {

    for (let i = array.length - 1; i > 0; i--) {

        let j = Math.trunc(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]]; 
    }

    return array;
}

const getHash = (board) => {

    let str = '';
    let table = ['S','v','v','v','v','h','s','s','s','s'];

    for (let i = 0; i < board.length; i++) {

        let block = board[i];
        
        str += block == -1 ? ' ' : table[block];
    }

    return str;

    // let values = new Map([
    //     [-1, ' '], 
    //     [0, 'S'], 
    //     [1, 't'], 
    //     [2, 't'], 
    //     [3, 't'], 
    //     [4, 't'], 
    //     [5, 'w'], 
    //     [6, 's'], 
    //     [7, 's'], 
    //     [8, 's'], 
    //     [9, 's']
    //   ]);

    // return board.map(s => values.get(s)).join('');

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

    let offsets = [[1, 0],[-1, 0],[0, 1],[0, -1]];
    let blocks = getBlocks(board);
    let newBoards = [];

    for (let [i, block] of blocks.entries()) {

        offsets.length = 4;

        outer: for (let offset of offsets) {

            let newSquares = [];
            let newBoard = [];

            for (let i = 0; i < board.length; i++) {
                newBoard[i] = board[i];
            }

            for (let square of block) {

                let [r0, c0] = squareToCoords(square);
                let r = r0 + offset[0];
                let c = c0 + offset[1];

                if (r < 0 || r >= height || c < 0 || c >= width) continue outer;

                let newSquare = coordsToSquare(r, c);

                if (board[newSquare] != board[square] && board[newSquare] != -1) continue outer;

                if ((Math.abs(offset[0]) == 2 || Math.abs(offset[1]) == 2) && 
                    board[coordsToSquare(r0 + offset[0] / 2, c0 + offset[1] / 2)] != -1 &&
                    board[coordsToSquare(r0 + offset[0] / 2, c0 + offset[1] / 2)] != board[square]) continue outer;

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

const breadthFirstSearch = () => {

    let queue = [];
    let enqueued = new Set();
    let board = initBoard();

    queue.push(board);
    enqueued.add(getHash(board));

    while (queue.length > 0) {

        let currentBoard = queue.shift();
        let nextBoards = getNextBoards(currentBoard);

        for (let nextBoard of nextBoards) {

            nextBoard.prev = currentBoard;

            if (enqueued.has(getHash(nextBoard))) continue;
            if (puzzleSolved(nextBoard)) return getSolution(nextBoard);

            queue.push(nextBoard);
            enqueued.add(getHash(nextBoard));
        }
    }
}

postMessage(breadthFirstSearch());