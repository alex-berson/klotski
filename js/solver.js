const height = 5;
const width = 4;

const initBoard = () =>  [1,0,0,2,1,0,0,2,3,5,5,4,3,6,7,4,8,-1,-1,9];

const squareToCoords = (square) => [Math.floor(square / width), square % width];

const coordsToSquare = (r, c) => r * width + c;

const solved = (board) => board[17] == 0 && board[18] == 0;

const shuffle = (array) => {

    for (let i = array.length - 1; i > 0; i--) {

        let j = Math.trunc(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]]; 
    }

    return array;
}

const hash = (board) => {

    let str = '';
    let table = ['S','v','v','v','v','h','s','s','s','s'];

    for (let i = 0; i < board.length; i++) {

        let block = board[i];
        
        str += block == -1 ? ' ' : table[block];
    }

    return str;
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

    // return newBoards;

    return shuffle(newBoards);
}

const solutionlist = (board) => {

    let boards = [];

    while (board != undefined) {

        boards.push(board);

        board = board.prev;
    }

    return boards.reverse();
}

const bfs = () => {

    let queue = [];
    let enqueued = new Set();
    let board = initBoard();

    queue.push(board);
    enqueued.add(hash(board));

    while (queue.length > 0) {

        let currentBoard = queue.shift();
        let nextBoards = getNextBoards(currentBoard);

        for (let nextBoard of nextBoards) {

            nextBoard.prev = currentBoard;

            if (enqueued.has(hash(nextBoard))) continue;
            if (solved(nextBoard)) return nextBoard;

            queue.push(nextBoard);
            enqueued.add(hash(nextBoard));
        }
    }
}

const solve = () => {
  
    let t0 = performance.now();
    let solution = bfs();
    let t1 = performance.now();

    console.log(`Finished in ${(t1 - t0) / 1000} seconds`);
    console.log(solutionlist(solution).length);

    alert(`Finished in ${(t1 - t0) / 1000} seconds`);
}