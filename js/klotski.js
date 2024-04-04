let timer;
let timer2; //
let moves;

const gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gap'));

const showBoard = () => document.body.style.opacity = 1;

const clearStorage = () => localStorage.removeItem('board');

const setBoardSize = () => {

    let minSide = screen.height > screen.width ? screen.width : window.innerHeight;
    let cssBoardSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--board-size')) / 100;
    let boardSize = Math.ceil(minSide * cssBoardSize / 4) * 4;

    document.documentElement.style.setProperty('--board-size', boardSize + 'px');
}

const fillBoard = () => {

    console.log(checkStorage());    

    let places = [1,0,3,8,11,9,13,14,16,19];

    // let places = [1,0,3,8,11,13,9,10,16,19];
    // let places = [1,0,13,8,14,9,3,7,16,19];

    // let places = [14,0,1,2,3,8,10,11,12,16];


    let cells = document.querySelectorAll('.cell');
    let tiles = document.querySelectorAll('.tile');

    let savedBoard = checkStorage();

    if (savedBoard != null) places = savedBoard;

    for (let [i, n] of places.entries()) {

        let rectTile = tiles[i].getBoundingClientRect();
        let rectCell = cells[n].getBoundingClientRect();
        let offsetLeft =  rectCell.left - rectTile.left;
        let offsetTop =  rectCell.top - rectTile.top;
        
        tiles[i].dataset.pos = n;
        tiles[i].style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
    }
}

// const checkMove = (tile1) => {

//     let board = document.querySelector('.board');
//     let tiles = document.querySelectorAll('.tile');
//     let borderWidth = parseInt(getComputedStyle(board).getPropertyValue('border-width'));
//     let rectTile1 = tile1.getBoundingClientRect();
//     let rectBoard = board.getBoundingClientRect();
//     let left = right = up = down = [tile1];

//     // left = [tile1, tiles[8]];

//     if (rectBoard.left + borderWidth + gap >= rectTile1.left) {
//         console.log('left', 'border');
//         left = null;
//     }
//     if (rectBoard.right - borderWidth - gap <= rectTile1.right) {
//         console.log('right', 'border');
//         right = null;
//     }
//     if (rectBoard.top + borderWidth + gap >= rectTile1.top) {
//         console.log('up', 'border');
//         up = null;
//     }
//     if (rectBoard.bottom - borderWidth - gap <= rectTile1.bottom) {
//         console.log('down', 'border');
//         down = null;
//     }

//     for (let tile of tiles) {

//         if (tile1 == tile) continue;

//         let rectTile = tile.getBoundingClientRect();

//         if (rectTile.right + gap == rectTile1.left 
//             && ((rectTile.top - gap + 1 <= rectTile1.top && rectTile.bottom + gap - 1 >= rectTile1.top)
//             || (rectTile.top - gap + 1 <= rectTile1.bottom && rectTile.bottom + gap - 1 >= rectTile1.bottom)
//             || (rectTile.top - gap + 1 >= rectTile1.top && rectTile.bottom + gap - 1 <= rectTile1.bottom))) {
//                 console.log('left', tile.id);
//                 left = null;
//                 }
//         if (rectTile.left - gap == rectTile1.right
//             && ((rectTile.top - gap + 1 <= rectTile1.top && rectTile.bottom + gap - 1 >= rectTile1.top)
//             || (rectTile.top - gap + 1 <= rectTile1.bottom && rectTile.bottom + gap - 1 >= rectTile1.bottom)
//             || (rectTile.top - gap + 1 >= rectTile1.top && rectTile.bottom + gap - 1 <= rectTile1.bottom))) {
//                 console.log('right', tile.id);
//                 right = null;
//             }
        
//         if (rectTile.bottom + gap == rectTile1.top 
//             && ((rectTile.left - gap + 1 <= rectTile1.left && rectTile.right + gap - 1 >= rectTile1.left)
//             || (rectTile.left - gap + 1 <= rectTile1.right && rectTile.right + gap - 1 >= rectTile1.right)
//             || (rectTile.left - gap + 1 >= rectTile1.left && rectTile.right + gap - 1 <= rectTile1.right))) {
//                 console.log('up', tile.id);
//                 up = null;
//             }
         
//         if (rectTile.top - gap == rectTile1.bottom
//             && ((rectTile.left - gap + 1 <= rectTile1.left && rectTile.right + gap - 1 >= rectTile1.left)
//             || (rectTile.left - gap + 1 <= rectTile1.right && rectTile.right + gap - 1 >= rectTile1.right)
//             || (rectTile.left - gap + 1 >= rectTile1.left && rectTile.right + gap - 1 <= rectTile1.right))) {
//                 console.log('down', tile.id);
//                 down = null;
//             }
//     }

//     return [left, right, up, down];
// }

// const checkLeft = (tile1, tiles, rectBoard, rectTile1, borderWidth) => {

//     // let moveTiles = [tile1];

    // if (rectBoard.left + borderWidth + gap >= rectTile1.left) {
    //     console.log('left', 'border');
    //     return null;
    // }

    // for (let tile of tiles) {

    //     if (tile1 == tile) continue;

    //     let rectTile = tile.getBoundingClientRect();

    //     if (rectTile.right + gap == rectTile1.left 
    //         && ((rectTile.top - gap + 1 <= rectTile1.top && rectTile.bottom + gap - 1 >= rectTile1.top)
    //         || (rectTile.top - gap + 1 <= rectTile1.bottom && rectTile.bottom + gap - 1 >= rectTile1.bottom)
    //         || (rectTile.top - gap + 1 >= rectTile1.top && rectTile.bottom + gap - 1 <= rectTile1.bottom))) {
    //             console.log('left', tile.id);
    //             // return null;
    //             // moveTiles.push(tile);
    //             checkLeft(tile, tiles, rectBoard, rectTile, borderWidth)
    //     }
    // }

//     return [tile1];
// }

// const checkRight = (tile1, tiles, rectBoard, rectTile1, borderWidth) => {

//     if (rectBoard.right - borderWidth - gap <= rectTile1.right) {
//         console.log('right', 'border');
//         return null;
//     }

//     for (let tile of tiles) {

//         if (tile1 == tile) continue;

//         let rectTile = tile.getBoundingClientRect();

//         if (rectTile.left - gap == rectTile1.right
//             && ((rectTile.top - gap + 1 <= rectTile1.top && rectTile.bottom + gap - 1 >= rectTile1.top)
//             || (rectTile.top - gap + 1 <= rectTile1.bottom && rectTile.bottom + gap - 1 >= rectTile1.bottom)
//             || (rectTile.top - gap + 1 >= rectTile1.top && rectTile.bottom + gap - 1 <= rectTile1.bottom))) {
//                 console.log('right', tile.id);
//                 checkRight(tile, tiles, rectBoard, rectTile, borderWidth)
//                 // return null;
//         }
//     }

//     return [tile1];
// }

// const checkUp = (tile1, tiles, rectBoard, rectTile1, borderWidth) => {

    // if (rectBoard.top + borderWidth + gap >= rectTile1.top) {
    //     console.log('up', 'border');
    //     return null;
    // }
    
    // for (let tile of tiles) {

    //     if (tile1 == tile) continue;

    //     let rectTile = tile.getBoundingClientRect();

    //     if (rectTile.bottom + gap == rectTile1.top 
    //         && ((rectTile.left - gap + 1 <= rectTile1.left && rectTile.right + gap - 1 >= rectTile1.left)
    //         || (rectTile.left - gap + 1 <= rectTile1.right && rectTile.right + gap - 1 >= rectTile1.right)
    //         || (rectTile.left - gap + 1 >= rectTile1.left && rectTile.right + gap - 1 <= rectTile1.right))) {
    //             console.log('up', tile.id);
    //             checkUp(tile, tiles, rectBoard, rectTile, borderWidth)
    //             // return null;
    //     }
    // }

//     return [tile1];
// }

const checkLeft = (tile, tiles, rectBoard, borderWidth) => {

    // console.log(tile1.id);

    let moveTiles = [];

    const traverseLeft = (tile1) => {

        // console.log(tile1.id);

        moveTiles.push(tile1);

        let rectTile1 = tile1.getBoundingClientRect();

        if (rectBoard.left + borderWidth + gap >= rectTile1.left) {
            // console.log('left', 'border');
            // moveTiles = null;
            moveTiles.push(null);
            return null;
        }
    
        for (let tile of tiles) {
    
            if (tile1 == tile) continue;
    
            let rectTile = tile.getBoundingClientRect();
    
            if (rectTile.right + gap == rectTile1.left 
                && ((rectTile.top - gap + 1 <= rectTile1.top && rectTile.bottom + gap - 1 >= rectTile1.top)
                || (rectTile.top - gap + 1 <= rectTile1.bottom && rectTile.bottom + gap - 1 >= rectTile1.bottom)
                || (rectTile.top - gap + 1 >= rectTile1.top && rectTile.bottom + gap - 1 <= rectTile1.bottom))) {
                    // console.log('left', tile.id);
                    // return null;
                    // moveTiles.push(tile);
                    traverseLeft(tile);
            }
        }
    }

    traverseLeft(tile);

    // console.log(tilesMove);

    return moveTiles.includes(null) ? null : moveTiles;

    // return traverseLeft(tile);
    // console.log(moveTiles.length == 0 ? null : moveTiles);

    // return moveTiles.length == 0 ? null : moveTiles;
}


const checkRight = (tile, tiles, rectBoard, borderWidth) => {

    let moveTiles = [];

    const traverseRight = (tile1) => {

        moveTiles.push(tile1);

        let rectTile1 = tile1.getBoundingClientRect();

        if (rectBoard.right - borderWidth - gap <= rectTile1.right) {
            // console.log('right', 'border');
            // moveTiles = null;
            moveTiles.push(null);
            return null;
        }
    
        for (let tile of tiles) {
    
            if (tile1 == tile) continue;
    
            let rectTile = tile.getBoundingClientRect();
    
            if (rectTile.left - gap == rectTile1.right
                && ((rectTile.top - gap + 1 <= rectTile1.top && rectTile.bottom + gap - 1 >= rectTile1.top)
                || (rectTile.top - gap + 1 <= rectTile1.bottom && rectTile.bottom + gap - 1 >= rectTile1.bottom)
                || (rectTile.top - gap + 1 >= rectTile1.top && rectTile.bottom + gap - 1 <= rectTile1.bottom))) {
                    // console.log('right', tile.id);
                    traverseRight(tile);
                    // return null;
            }
        }
    }

    traverseRight(tile);


    return moveTiles.includes(null) ? null : moveTiles;
}

const checkUp = (tile, tiles, rectBoard, borderWidth) => {

    let moveTiles = [];

    const traverseUp = (tile1) => {

        moveTiles.push(tile1);

        let rectTile1 = tile1.getBoundingClientRect();

        if (rectBoard.top + borderWidth + gap >= rectTile1.top) {
            // console.log('up', 'border');
            // moveTiles = null;
            moveTiles.push(null);
            return null;
        }
        
        for (let tile of tiles) {
    
            if (tile1 == tile) continue;
    
            let rectTile = tile.getBoundingClientRect();
    
            if (rectTile.bottom + gap == rectTile1.top 
                && ((rectTile.left - gap + 1 <= rectTile1.left && rectTile.right + gap - 1 >= rectTile1.left)
                || (rectTile.left - gap + 1 <= rectTile1.right && rectTile.right + gap - 1 >= rectTile1.right)
                || (rectTile.left - gap + 1 >= rectTile1.left && rectTile.right + gap - 1 <= rectTile1.right))) {
                    // console.log('up', tile.id);
                    traverseUp(tile);
                    // return null;
            }
        }
    }

    traverseUp(tile);

    return moveTiles.includes(null) ? null : moveTiles;
}

const checkDown = (tile, tiles, rectBoard, borderWidth) => {

    let moveTiles = [];

    const traverseDown = (tile1) => {

        moveTiles.push(tile1);

        let rectTile1 = tile1.getBoundingClientRect();

        if (rectBoard.bottom - borderWidth - gap <= rectTile1.bottom) {
            // console.log('down', 'border');
            // moveTiles = null;
            moveTiles.push(null);
            return null;
        }
    
        for (let tile of tiles) {
    
            if (tile1 == tile) continue;
    
            let rectTile = tile.getBoundingClientRect();
    
            if (rectTile.top - gap == rectTile1.bottom
                && ((rectTile.left - gap + 1 <= rectTile1.left && rectTile.right + gap - 1 >= rectTile1.left)
                || (rectTile.left - gap + 1 <= rectTile1.right && rectTile.right + gap - 1 >= rectTile1.right)
                || (rectTile.left - gap + 1 >= rectTile1.left && rectTile.right + gap - 1 <= rectTile1.right))) {
                    // console.log('down', tile.id);
    
                    traverseDown(tile)
                    // return null;
            }
        }
    }

    traverseDown(tile);

    // return moveTiles.includes(null) ? null : [...new Set(moveTiles)]; 

    return moveTiles.includes(null) ? null : moveTiles;
}

const checkMove = (tile) => {

    let board = document.querySelector('.board');
    let tiles = document.querySelectorAll('.tile');
    let borderWidth = parseInt(getComputedStyle(board).getPropertyValue('border-width'));
    let rectBoard = board.getBoundingClientRect();

    // let rectTile1 = tile1.getBoundingClientRect();

    // let left = right = up = down = [tile1];

    // left = [tile1, tiles[8]];

    let left = checkLeft(tile, tiles, rectBoard, borderWidth);
    let right = checkRight(tile, tiles, rectBoard, borderWidth);
    let up = checkUp(tile, tiles, rectBoard, borderWidth);
    let down = checkDown(tile, tiles, rectBoard, borderWidth);

    // console.log(left);
    // console.log(right);
    // console.log(up);
    // console.log(down);

    return [left, right, up, down];
}

const fixedPositions = () => {

    let tiles = document.querySelectorAll('.tile');
    let cells = document.querySelectorAll('.cell');

    outer: for (let tile of tiles) {

        let rectTile = tile.getBoundingClientRect();

        for (let cell of cells) {
                
            let rectCell = cell.getBoundingClientRect();
    
            if (rectTile.left == rectCell.left && rectTile.top == rectCell.top) {
                continue outer;
            }
        }

        return false;
    }

    return true;
}

const startMove = (e) => {

    if (aiMode()) return;

    console.clear(); //

    if (document.querySelector('.selected') != null) return;

    let tile = e.currentTarget;

    // if ([...checkMove(tile)].every(direction => direction == null)) return;

    // if (!tile.classList.contains('selected')) {
    //     if (fixedPositions()) {
    //         endMove(e);
    //     } else {
    //         return;
    //     }
    // }    

    tile.classList.add('selected', 'move');


    // checkMove(tile);

    if (e.type == 'touchstart') {

        let n = 0;

        while (e.currentTarget != e.touches[n].target) n++;

        tile.dataset.x = e.touches[n].clientX;
        tile.dataset.y = e.touches[n].clientY;

        tile.addEventListener('touchmove', touchMove);
        tile.addEventListener('touchend', endMove);
        tile.addEventListener('touchcancel', endMove);

    } else {

        tile.dataset.x0 = tile.dataset.x = e.clientX
        tile.dataset.y0 = tile.dataset.y = e.clientY

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', endMove);
    }
}

const moveTile = (tile, dx, dy) => {

    // console.log('MOVE', dx, dy);

    // let style = window.getComputedStyle(tile);
    // let matrix = new WebKitCSSMatrix(style.transform);
    let [left, right, up, down] = checkMove(tile);
    let tiles = [...document.querySelectorAll('.move:not(.selected')];
    let cells = document.querySelectorAll('.cell');


    // let derections = ['left', 'right', 'up', 'down'];

    // console.log(dx, dy);

    let vertical = Math.abs(dx) < Math.abs(dy);
    let horizontal = Math.abs(dx) > Math.abs(dy);


    // let removed = false;

    // vertical = true;
    // horizontal = true;


    if (dx < 0 && left == null) dx = 0;
    if (dx > 0 && right == null) dx = 0;
    if (dy < 0 && up == null) dy = 0;
    if (dy > 0 && down == null) dy = 0;


    // if (left.length <= 1 && right.length <= 1 && up.lastIndexOf <= 1 && down.length <= 1 && tiles.length != 0) {

    if ((left == null || left.length == 1) &&
        (right == null || right.length == 1) &&
        (up == null || up.length == 1) &&
        (down == null || down.length == 1) && tiles.length != 0) {

            console.log(left, right, 'END MOVE');

            endMove();
            tiles.forEach(tile => tile.classList.remove('move'));
            tiles = [];
            
            // for (let tile of tiles) {
            //     if (!tile.classList.contains('selected')) {

            //         endMove();

            //         tile.classList.remove('move');

            //         // let rectTile = tile.getBoundingClientRect();
            //         // let rectCell = cells[19].getBoundingClientRect();

            //         // console.log(rectTile.bottom, rectCell.bottom);
            //     }
            // }
    }

    // if (left == null) {

        // for (let tile of tiles) {
        //     if (!tile.classList.contains('selected')) tile.classList.remove('move');
        // }
        
    // }

    // console.log(dx, dy);


    // if (Math.abs(dy) > Math.abs(dx) && down && dy > 0) {

    if (dx == 0 && dy > 0 && vertical) {

        let matrix = [];

        let [left, right, up, down] = checkMove(tile);
        let length = down.length;
        // let x0 = 0;

        // let [left, right, up, down] = checkMove(tile);

        // for (let [i, tile] of down.entries()) {
        //     let style = window.getComputedStyle(tile);
        //     matrix[i] = new WebKitCSSMatrix(style.transform);       
        // }

        for (let y = 1; y <= dy; y++) {

            let [left, right, up, down] = checkMove(tile);

            // if (down == null || tile.classList.contains('left') || tile.classList.contains('right')) break;

            if (down == null) break;
            // if (down == null) {

            //     // for (let tile of tiles) {
            //     //     if (!tile.classList.contains('selected')) tile.classList.remove('move');
            //     // }
                
            //     break;
            // }


            if (length < down.length) break;

            for (let tile of down) {
                tile.classList.add('move');
            }

            // let tiles = [...document.querySelectorAll('.move')];
            let downPlus = [...new Set(down.concat(tiles))];

            // if (down == null || tile.classList.contains('horiz')) break;
            // if (down == null || tile.classList.contains('left') || tile.classList.contains('right')) break;


            // tile.classList.add('vert');

            // if (tile.classList.contains('up')) {
            //     endMove();
            // }

            tile.classList.remove('down','up','right','left');
            tile.classList.add('down');

            for (let [i, tile] of downPlus.entries()) {

            // for (let [i, tile] of document.querySelectorAll('.move').entries()) {

                // tile.classList.add('move');

                let pos = Number(tile.dataset.pos);
                let rectTile = tile.getBoundingClientRect();
                let rectCell = cells[pos].getBoundingClientRect();

                if (rectTile.left == rectCell.left && rectTile.top == rectCell.top) {
                    if (!down.includes(tile)) {
                        tile.classList.remove('move');
                        continue;
                    }
                }

                if (matrix.length == i) {
                    let style = window.getComputedStyle(tile);
                    matrix[i] = new DOMMatrix(style.transform);  
                }


                // if (length < down.length && i >= length) {
                //     x0++;
                //     x = x0;
                // }

                tile.style.transform = `translate(${matrix[i].m41 + dx}px, ${matrix[i].m42 + y}px)`;
            }          
        }
    }

    // if (Math.abs(dy) > Math.abs(dx) && up && dy < 0) {

    if (dx == 0 && dy < 0 && vertical) {

        let matrix = [];

        let [left, right, up, down] = checkMove(tile);
        let length = up.length;
        // let x0 = 0;
        // let [left, right, up, down] = checkMove(tile);

        // for (let [i, tile] of up.entries()) {
        //     let style = window.getComputedStyle(tile);
        //     matrix[i] = new WebKitCSSMatrix(style.transform);       
        // }

        for (let y = -1; y >= dy; y--) {

            let [left, right, up, down] = checkMove(tile);

            // if (up == null || tile.classList.contains('left') || tile.classList.contains('right')) break;

            if (up == null) break;

            // if (up == null) {

            //     // for (let tile of tiles) {
            //     //     if (!tile.classList.contains('selected')) tile.classList.remove('move');
            //     // }
                
            //     break;
            // }

            if (length < up.length) break;


            for (let tile of up) {
                tile.classList.add('move');
            }

            // let tiles = [...document.querySelectorAll('.move')];
            let upPlus = [...new Set(up.concat(tiles))];

            // if (up == null|| tile.classList.contains('horiz')) break;
            // if (up == null || tile.classList.contains('left') || tile.classList.contains('right')) break;


            // tile.classList.add('vert');

            // if (tile.classList.contains('down')) {
            //     endMove();
            // }

            tile.classList.remove('down','up','right','left');
            tile.classList.add('up');

            for (let [i, tile] of upPlus.entries()) {

            // for (let [i, tile] of document.querySelectorAll('.move').entries()) {

                // tile.classList.add('move');

                let pos = Number(tile.dataset.pos);
                let rectTile = tile.getBoundingClientRect();
                let rectCell = cells[pos].getBoundingClientRect();

                if (rectTile.left == rectCell.left && rectTile.top == rectCell.top) {
                    if (!up.includes(tile)) {
                        tile.classList.remove('move');
                        continue;
                    }
                }

                if (matrix.length == i) {
                    let style = window.getComputedStyle(tile);
                    matrix[i] = new DOMMatrix(style.transform);  
                }

                // if (length < up.length && i >= length) {
                //     x0--;
                //     x = x0;
                // }

                tile.style.transform = `translate(${matrix[i].m41 + dx}px, ${matrix[i].m42 + y}px)`;
            }       
        }
    }

    // if (Math.abs(dx) > Math.abs(dy) && right && dx > 0) {

    if (dy == 0 && dx > 0 && horizontal) {

        let matrix = [];

        let [left, right, up, down] = checkMove(tile);
        let length = right.length;
        // let x0 = 0;
        // let [left, right, up, down] = checkMove(tile);

        // for (let [i, tile] of right.entries()) {
        //     let style = window.getComputedStyle(tile);
        //     matrix[i] = new WebKitCSSMatrix(style.transform);       
        // }

        for (let x = 1; x <= dx; x++) {

            let [left, right, up, down] = checkMove(tile);

            // if (right == null || tile.classList.contains('up') || tile.classList.contains('down')) break;

            if (right == null) break;

            // if (right == null) {

            //     // for (let tile of tiles) {
            //     //     if (!tile.classList.contains('selected')) tile.classList.remove('move');
            //     // }
                
            //     break;
            // }

            if (length < right.length) break;


            for (let tile of right) {
                tile.classList.add('move');
            }

            // let tiles = [...document.querySelectorAll('.move')];
            let rightPlus = [...new Set(right.concat(tiles))];

            // console.log(right);


            // if (right == null|| tile.classList.contains('vert')) break;
            // if (right == null || tile.classList.contains('up') || tile.classList.contains('down')) break;

            // tile.classList.add('horiz');

            // if (tile.classList.contains('left')) {
                // let detach = endMove();
                // console.log('LEFT');
                // if (detach) rightPlus = [];
                // tiles.forEach(tile => tile.classList.remove('move'));
                // tiles = [];
            // }
            

            tile.classList.remove('down','up','right','left');
            tile.classList.add('right');


            // if (tile.classList.contains('left')) {
            //     tile.classList.remove('left');
            //     endMove();
            // }

            for (let [i, tile] of rightPlus.entries()) {

                tile.classList.remove('down','up','right','left')
                tile.classList.add('right');

            // for (let [i, tile] of document.querySelectorAll('.move').entries()) {

                // tile.classList.add('move');

                let pos = Number(tile.dataset.pos);
                let rectTile = tile.getBoundingClientRect();
                let rectCell = cells[pos].getBoundingClientRect();

                if (rectTile.left == rectCell.left && rectTile.top == rectCell.top) {
                    if (!right.includes(tile)) {
                        tile.classList.remove('move');
                        continue;
                    }
                }

                if (matrix.length == i) {
                    let style = window.getComputedStyle(tile);
                    matrix[i] = new DOMMatrix(style.transform);  
                }

                // if (length < right.length && i >= length) {
                //     x0++;
                //     x = x0;
                // }

                tile.style.transform = `translate(${matrix[i].m41 + x}px, ${matrix[i].m42 + dy}px)`;
            }
        }
    }

    // if (Math.abs(dx) > Math.abs(dy) && left && dx < 0) {

    if (dy == 0 && dx < 0 && horizontal) {

        let matrix = [];

        // left = [...new Set(tiles.concat(left))];

        // console.log(left.length);

        // for (let [i, tile] of left.entries()) {
        //     let style = window.getComputedStyle(tile);
        //     matrix[i] = new WebKitCSSMatrix(style.transform);       
        // }
        let [left, right, up, down] = checkMove(tile);
        let length = left.length;
        // let x0 = 0;

        for (let x = -1; x >= dx; x--) {

            let [left, right, up, down] = checkMove(tile);

            // console.log(left.length);

            // if (left == null || tile.classList.contains('up') || tile.classList.contains('down'))break;

            if (left == null) break;

            // if (left == null) {

            //     // for (let tile of tiles) {
            //     //     if (!tile.classList.contains('selected')) tile.classList.remove('move');
            //     // }
                
            //     break;
            // }

            // console.log(length, left.length);

            if (length < left.length) break;

            for (let tile of left) {
                tile.classList.add('move');
            }

            // tiles = [...document.querySelectorAll('.move')];

            // let tiles = [...document.querySelectorAll('.move')];
            let leftPlus = [...new Set(tiles.concat(left))];

            // console.log(left);

            // if (left == null|| tile.classList.contains('vert')) break;

            // console.log(tile);


            // tile.classList.add('horiz');

            // if (tile.classList.contains('right')) {
                // let detach = endMove();   
                // if (detach) leftPlus = [];
            // }

            tile.classList.remove('down','up','right','left');
            tile.classList.add('left');

            // length = length || left.length;

            for (let [i, tile] of leftPlus.entries()) {

                // tile.classList.remove('down','up','right','left')
                // tile.classList.add('left');

            // let tiles = document.querySelectorAll('.move');

            // for (let [i, tile] of tiles.entries()) {

                // tile.classList.add('move');

                // if (!tile.classList.contains('select')) {
                //     let style = window.getComputedStyle(tile);
                //     matrix[i] = new WebKitCSSMatrix(style.transform);  
                //     tile.classList.add('select');
                // }

                let pos = Number(tile.dataset.pos);
                let rectTile = tile.getBoundingClientRect();
                let rectCell = cells[pos].getBoundingClientRect();

                if (rectTile.left == rectCell.left && rectTile.top == rectCell.top) {
                    if (!left.includes(tile)) {
                        tile.classList.remove('move', 'left');
                        continue;
                    }
                }

                if (matrix.length == i) {
                    let style = window.getComputedStyle(tile);
                    matrix[i] = new DOMMatrix(style.transform);  
                }

                // if (length < left.length && i >= length) {
                //     console.log('X0');
                //     x0--;
                //     x = x0;
                // }

                // console.log(matrix)

                // console.log('LEFT');

                tile.style.transform = `translate(${matrix[i].m41 + x}px, ${matrix[i].m42 + dy}px)`;
            }
        }
    }
}

const touchMove = (e) => {

    let tile = e.currentTarget;
    let n = 0;
    
    while (e.currentTarget != e.touches[n].target) n++;

    let dx = e.touches[n].clientX - tile.dataset.x;
    let dy = e.touches[n].clientY - tile.dataset.y;

    tile.dataset.x = e.touches[n].clientX;
    tile.dataset.y = e.touches[n].clientY;

    moveTile(tile, dx, dy);
}

const mouseMove = (e) => {

    let tile = document.querySelector('.selected');
    let dx = e.clientX - tile.dataset.x;
    let dy = e.clientY - tile.dataset.y;

    tile.dataset.x = e.clientX;
    tile.dataset.y = e.clientY;

    moveTile(tile, dx, dy);
}

const destCell = (tile) => {

    let cells = document.querySelectorAll('.cell');
    let rectTile = tile.getBoundingClientRect();
    let size = cells[0].offsetWidth;
    let ox = rectTile.left + size / 2;
    let oy = rectTile.top + size / 2;

    for (let [i, cell] of cells.entries()) {

        let rectCell = cell.getBoundingClientRect();

        if (ox >= rectCell.left - gap  / 2 && ox <= rectCell.right + gap  / 2 && oy >= rectCell.top - gap  / 2 && oy <= rectCell.bottom + gap  / 2) return i;
    }

    return null;
}

const endMove = (e) => {

    // console.log(e);
        
    // let tiles = document.querySelectorAll('.move');

    let tiles = e == undefined ? document.querySelectorAll('.move:not(.selected)') 
                               : document.querySelectorAll('.move');

    // console.log(tiles);

    for (let tile of tiles) {

        let i = destCell(tile);
        // let pos = i;

        // if (!e && Number(tile.dataset.pos) == i) return;

        tile.dataset.pos = i;

        let cell = document.querySelectorAll('.cell')[i];
        tile.classList.add('return');        
            
        let event = new Event('transitionend');
        let style = window.getComputedStyle(tile);
        let matrix = new DOMMatrix(style.transform);
        let rectTile = tile.getBoundingClientRect();
        let rectCell = cell.getBoundingClientRect();

        // let offsetLeft = rectTile.left - rectCell.left;
        // let offsetTop = rectTile.top - rectCell.top;


        // console.log(e, offsetLeft, offsetTop, [...tile.classList], i);

        
        // if (!e && tile.classList.contains('left') && offsetLeft < 0) return false;
        // if (!e && tile.classList.contains('right') && offsetLeft > 0) return false;

        // if (!e && tile.classList.contains('right')) return false;


        // if (!e) return

        // tile.dataset.pos = i;
        // tile.classList.add('return'); 

        if (e) {

            tile.removeEventListener('touchmove', touchMove);
            document.removeEventListener('mousemove', mouseMove);

            tile.removeEventListener('touchend', endMove);
            tile.removeEventListener('touchcancel', endMove);
            document.removeEventListener('mouseup', endMove);
        }

        let offsetLeft = rectTile.left - rectCell.left;
        let offsetTop = rectTile.top - rectCell.top;

        tile.style.transform = `translate(${Math.round(matrix.m41 - offsetLeft)}px, ${Math.round(matrix.m42 - offsetTop)}px)`;

        // tile.classList.remove('move');

        tile.addEventListener('transitionend', e => {

            let tile = e.currentTarget;

            saveBoard();
            
            // tile.classList.remove('return', 'selected', 'vert', 'horiz');
            tile.classList.remove('return', 'selected', 'move', 'left', 'right', 'up', 'down');

            if (win()) {

                document.body.addEventListener('touchstart', blink);
                document.body.addEventListener('mousedown', blink);

                clearStorage();
                slideOut();
            }
            
        }, {once: true});

        if (offsetLeft == 0 && offsetTop == 0) tile.dispatchEvent(event);   
    }

    // return true;
}

// const endMove = () => {
        
//     let tile = document.querySelector('.selected');
//     let i = destCell(tile);
//     let pos = i;

//     tile.dataset.pos = i;

//     cell = document.querySelectorAll('.cell')[pos];
//     tile.classList.add('return');        
         
//     let event = new Event('transitionend');
//     let style = window.getComputedStyle(tile);
//     let matrix = new WebKitCSSMatrix(style.transform);
//     let rectTile = tile.getBoundingClientRect();
//     let rectCell = cell.getBoundingClientRect();

//     tile.removeEventListener('touchmove', touchMove);
//     document.removeEventListener('mousemove', mouseMove);

//     tile.removeEventListener('touchend', endMove);
//     tile.removeEventListener('touchcancel', endMove);
//     document.removeEventListener('mouseup', endMove);

//     let offsetLeft = rectTile.left - rectCell.left;
//     let offsetTop = rectTile.top - rectCell.top;

//     tile.style.transform = `translate(${Math.round(matrix.m41 - offsetLeft)}px, ${Math.round(matrix.m42 - offsetTop)}px)`;

//     tile.addEventListener('transitionend', e => {

//         let tile = e.currentTarget;

//         tile.classList.remove('return', 'selected', 'vert', 'horiz');
        
//     }, {once: true});

//     if (offsetLeft == 0 && offsetTop == 0) tile.dispatchEvent(event);
// }

// const reset = () => {

//     let n = 10;

//     disableReset();

//     let tiles = document.querySelectorAll('.tile');

//     tiles.forEach(tile => {
        
//         tile.classList.add('disappear');

//         tile.addEventListener('transitionend', e => {

//             n--;
    
//             let tile = e.currentTarget;
    
//             tile.removeAttribute('style');
    
//             if (n == 0) {

//                 let n = 10;
                
//                 fillBoard();

//                 tiles.forEach(tile =>  {
                    
//                     tile.classList.remove('disappear')
                
//                     tile.addEventListener('transitionend', e => {

//                         n--;
                
//                         if (n == 0) enableReset();
    
//                     }, {once: true});
                
//                 });
//             }
//         }, {once: true});
//     });
// }

// const reset = () => {

//     let shapes = [[0],[1,2,3,4],[5],[6,7,8,9]];
//     let positions = [[1],[0,3,8,11],[9],[13,14,16,19]];
//     let tiles = document.querySelectorAll('.tile');

//     // let event = new Event('touchend');
//     // disableReset();

//     if ([...tiles].some(tile => tile.classList.contains('move'))) return;

//     for (let tile of tiles) {

//         let n = Number(tile.id.substring(1));
//         let pos = Number(tile.dataset.pos); 

//         // if (tile.classList.contains('move')) tile.dispatchEvent(event);

//         for (let [i, shape] of shapes.entries()) {

//             if (shape.includes(n)) {

//                 if (positions[i].includes(pos)) break;

//                 let freePositions = positions[i].slice();

//                 for (let j of shape) {

//                     let pos2 = Number(tiles[j].dataset.pos);

//                     if (positions[i].includes(pos2)) {
//                         freePositions = freePositions.filter(val => val != pos2);
//                     }
//                 }

//                 let newPos;
//                 let minDist = Infinity;

//                 for (let freePos of freePositions) {
                    
//                     let dist = manhattanDist(pos, freePos);

//                     if (dist < minDist) [newPos, minDist] = [freePos, dist];
//                 }

//                 let cell = document.querySelectorAll('.cell')[newPos];                    
//                 let style = window.getComputedStyle(tile);
//                 let matrix = new DOMMatrix(style.transform);
//                 let rectTile = tile.getBoundingClientRect();
//                 let rectCell = cell.getBoundingClientRect();
//                 let offsetLeft = rectTile.left - rectCell.left;
//                 let offsetTop = rectTile.top - rectCell.top;

//                 tile.dataset.pos = newPos;
//                 tile.classList.add('return');        
//                 tile.style.transform = `translate(${Math.round(matrix.m41 - offsetLeft)}px, ${Math.round(matrix.m42 - offsetTop)}px)`;
        
//                 tile.addEventListener('transitionend', e => {
        
//                     let tile = e.currentTarget;
        
//                     tile.classList.remove('return');        
                    
//                 }, {once: true});

//                 break;
//             }
//         }
//     }
// }

const manhattanDistAdj = (pos, newPos) => {

    let r1 = Math.floor(pos / 4)
    let c1 = pos % 4;
    let r2 = Math.floor(newPos / 4)
    let c2 = newPos % 4;

    // return Math.abs(r2 - r1) + Math.abs(c2 - c1);

    return Math.abs(r2 - r1) + Math.abs(c2 - c1) + 0.01 * Math.min(Math.abs(r2 - r1), Math.abs(c2 - c1));
}

const permutations = (arr) => {

    if (arr.length == 0) return [[]];

    return arr.flatMap((e, i) => permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(p => [e, ...p]));
}

const totalDistance = (starts, ends) => {

    let total = 0;

    for (let i = 0; i < starts.length; i++) {
        total += manhattanDistAdj(starts[i], ends[i]);
    }

    return total;
}

const reset = () => {

    let shapes = [[0],[1,2,3,4],[5],[6,7,8,9]];
    let positions = [[1],[0,3,8,11],[9],[13,14,16,19]];
    let tiles = document.querySelectorAll('.tile');
    let cells = document.querySelectorAll('.cell');
    let arrows = document.querySelector('.arrows');
    let rotate = false;

    console.log('RESET')

    // if (aiMode()) {
        
    //     clearTimeout(timer);
    //     setTimeout(aiPlay, 200, {init: false});
    //     // return;
    //     setTimeout(enableReset, 1000);

    // } else {
    //     setTimeout(enableReset, 150);

    // }

    // if ([...tiles].every((tile, i) => tile.dataset.pos == positions.flat()[i])) {
    //     console.log('Condition met for all elements');
    // } else {
    //     console.log('Condition not met for all elements');
    // }


    if ([...tiles].some(tile => tile.classList.contains('move') || tile.classList.contains('ai-move'))) return;

    for (let [i, tileNums] of shapes.entries()) {

        let startPositions = [];

        for (let num of tileNums) {
            startPositions.push(Number(tiles[num].dataset.pos)); 
        }

        let allEndPositions = permutations(positions[i]);
        let minDistance = Infinity;
        let minN;

        for (let [n, endPositions] of allEndPositions.entries()) {

            let total = totalDistance(startPositions, endPositions);

            if (total < minDistance) [minDistance, minN] = [total, n];

            // console.log(total, minN);
        }

        // console.log(startPositions);
        // console.log(allEndPositions[minN]);

        let endPositions = allEndPositions[minN];

        for (let [n, num] of tileNums.entries()) {

            if (startPositions[n] == endPositions[n]) continue;

            let cell = cells[endPositions[n]];  
            let tile = tiles[num];
            let style = window.getComputedStyle(tile);
            let matrix = new DOMMatrix(style.transform);
            let rectTile = tile.getBoundingClientRect();
            let rectCell = cell.getBoundingClientRect();
            let offsetLeft = rectTile.left - rectCell.left;
            let offsetTop = rectTile.top - rectCell.top;

            rotate = true;
            tile.dataset.pos = endPositions[n];
            tile.classList.add('return');        
            tile.style.transform = `translate(${Math.round(matrix.m41 - offsetLeft)}px, ${Math.round(matrix.m42 - offsetTop)}px)`;
    
            tile.addEventListener('transitionend', e => {
    
                let tile = e.currentTarget;
    
                tile.classList.remove('return');  
                
                tile.addEventListener('transitionend', e => {
    
                    let tile = e.currentTarget;

                    // if (tile.id != 't0') return;
        
                    tile.style.removeProperty('transition');       
                    
                }, {once: true});
                
            }, {once: true});
        }
    }

    if (rotate) {

        console.log('ROTATE');

        arrows.classList.add('rotate');

        arrows.addEventListener('animationend', e => {
    
            let arrows = e.currentTarget;

            arrows.classList.remove('rotate');       
            
        }, {once: true});
    }

    for (let [i, pos] of positions.flat().entries()) {

        let tile = document.querySelector(`[data-pos='${pos}']`);
        tile.id = `t${i}`;
    }

    let bigBlock = tiles[0];

    if (bigBlock.classList.contains('invisible')) {

        bigBlock.style.transition = 'opacity 0.2s ease-in-out';
        bigBlock.classList.remove('invisible');

        bigBlock.addEventListener('transitionend', e => {
    
            let tile = e.currentTarget;

            tile.style.removeProperty('transition');       
            
        }, {once: true});

        document.body.removeEventListener('touchstart', blink);
        document.body.removeEventListener('mousedown', blink);

        if (aiMode()) {
            disableReset();    
            aiPlay();
        }
    }
}

const enableReset = () => {

    let button = document.querySelector('.reset');

    button.classList.add('enabled');
    button.addEventListener('touchstart', reset);
    button.addEventListener('mousedown', reset);
}

const disableReset = () => {

    let button = document.querySelector('.reset');

    button.classList.remove('enabled');
    button.removeEventListener('touchstart', reset);
    button.removeEventListener('mousedown', reset);
}

const enableTouch = () => {

    let tiles = document.querySelectorAll('.tile');

    tiles.forEach(tile => {
        tile.addEventListener('touchstart', startMove);
        tile.addEventListener('mousedown', startMove);
    });

    window.addEventListener('orientationchange', endMove);
}

const disableTouch = () => {

    let tiles = document.querySelectorAll('.tile');

    tiles.forEach(tile => {
        tile.removeEventListener('touchstart', startMove);
        tile.removeEventListener('mousedown', startMove);
    });

    // window.addEventListener('orientationchange', endMove);
}

const disableTapZoom = () => {

    const preventDefault = (e) => e.preventDefault();

    document.body.addEventListener('touchstart', preventDefault, {passive: false});
    document.body.addEventListener('mousedown', preventDefault, {passive: false});
}

const slideOut = () => {

    let bigBlock = document.querySelector('#t0');
    let cells = document.querySelectorAll('.cell');

    let offset = cells[4].getBoundingClientRect().top - cells[0].getBoundingClientRect().top;
    let distance = window.innerHeight - bigBlock.getBoundingClientRect().top + 10;

    console.log(bigBlock.getBoundingClientRect().top);
    console.log(window.innerHeight)
    console.log(offset);

    let style = window.getComputedStyle(bigBlock);
    let matrix = new DOMMatrix(style.transform);

    bigBlock.classList.add('ai-move');

    // bigBlock.style.transform = `translateY(${Math.round(matrix.m42 - (distance))}px)`;

    bigBlock.style.transition = `all ${0.15 * distance / offset}s ease-in-out`;

    bigBlock.style.transform = `translate(${Math.round(matrix.m41 - (0))}px, ${Math.round(matrix.m42 - (-distance))}px)`;

    bigBlock.addEventListener('transitionend', e => {

        let tile = e.currentTarget;

        tile.classList.remove('ai-move');
        tile.style.removeProperty('transition');
        tile.classList.add('invisible');

        enableReset();

    }, {once: true});

}

const blink = () => {

    console.log('BLINK');

    let resetButton = document.querySelector('.arrows');

    if (resetButton.classList.contains('blink')) return;

    resetButton.classList.add('blink');

    resetButton.addEventListener('animationend', e => {

        let button = e.currentTarget;

        button.classList.remove('blink');

    }, {once: true});
}

const win = () => {

    let bigBlock = document.querySelector('#t0');
    let pos13 = document.querySelectorAll('.cell')[13];

    let rectTile = bigBlock.getBoundingClientRect();
    let rectCell = pos13.getBoundingClientRect();

    return rectTile.top == rectCell.top && rectTile.left == rectCell.left;
}

const aiPlay = ({init = true} = {}) => {

    const makeMove = () => {

        // let tiles = document.querySelectorAll('.tile');
        let cells = document.querySelectorAll('.cell');

        if (win()) {

            console.log('WIN');

            document.body.addEventListener('touchstart', blink);
            document.body.addEventListener('mousedown', blink);

            slideOut();
            return;
        }

        if (moves.length == 0) console.timeEnd('timer2'); //

        if (document.hidden) return;
        if (moves.length == 0) return;

        let [num, from, to] = aiMoves.shift();

        console.log(num, from, to);

        // let tile = tiles[num];
        let tile = document.querySelector(`#t${num}`);

        let style = window.getComputedStyle(tile);
        let matrix = new DOMMatrix(style.transform);
        let rectTile = tile.getBoundingClientRect();
        let rectCell = cells[to].getBoundingClientRect();

        tile.dataset.pos = to;
        tile.classList.add('ai-move');

        tile.addEventListener('transitionend', e => {

            let tile = e.currentTarget;
    
            tile.classList.remove('ai-move');
    
        }, {once: true});
    
        tile.style.transform = `translate(${Math.round(matrix.m41 - (rectTile.left - rectCell.left))}px, ${Math.round(matrix.m42 - (rectTile.top - rectCell.top))}px)`;

        // timer = setTimeout(() => makeMove(), 300);
        timer = setTimeout(() => makeMove(), 150);
    }

    if (init) {
        window.addEventListener('visibilitychange', () => {
            document.hidden ? clearTimeout(timer) : makeMove();
        });
    }

    disableReset();

    // setTimeout(() => {

    console.time('timer2'); //

    let t0 = performance.now(); //


        // moves = bfs();

        // let t1 = performance.now();

        // console.log(`Finished in ${(t1 - t0) / 1000} seconds`);
        // console.log(moves.length);

        // alert(`Finished in ${(t1 - t0) / 1000} seconds`);

        // console.log(moves.slice());

        // setTimeout(makeMove, 1000 - (t1 - t0));

    // }, 100);

    let aiMoves;
    let webWorker;
    let startTime = Date.now();

    try {

        webWorker = new Worker('./js/solver.js');

    } catch (e) {

        aiMoves = moves;

        setTimeout(makeMove, 1000 - (Date.now() - startTime));
    }
    

    webWorker.addEventListener('message', e => {

        console.log("WORKER");

        moves = aiMoves = e.data;

        let t1 = performance.now();

        console.log(`Finished in ${(t1 - t0) / 1000} seconds`);
        console.log(moves.length);

        // alert(`Finished in ${(t1 - t0) / 1000} seconds`);

        console.log(moves.slice());

        setTimeout(makeMove, 1000 - (Date.now() - startTime));

        webWorker.terminate();
    });
}

const aiMode = () => {

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let mode = urlParams.get('mode');
    
    return mode == 'ai';

    // return true;

}

const saveBoard = () => {

    let board = [];
    let tiles = document.querySelectorAll('.tile');

    if (aiMode()) return;
    
    tiles.forEach(tile => board.push(Number(tile.dataset.pos)));

    let boardExp = {

        board,
        expiry: Date.now() + 1000 * 60 * 60 * 24 * 7
    }

    localStorage.setItem('board', JSON.stringify(boardExp));
}

const checkStorage = () => {

    if (aiMode() || localStorage.getItem('board') == null) return null;

    let boardStr = JSON.parse(localStorage.getItem('board'));

    if (Date.now() > boardStr.expiry) return null;

    return boardStr.board;
}

const cover = () => {

    let tiles = document.querySelectorAll('.tile');
    let cell = document.querySelector('.cell');
    let glass = document.querySelector('#glass');

    let rectGlass = glass.getBoundingClientRect();
    let rectCell = cell.getBoundingClientRect();
    let offsetLeft =  rectCell.left - rectGlass.left;
    let offsetTop =  rectCell.top - rectGlass.top;
    
    glass.style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;

    setTimeout(() => {
        glass.classList.add('blur');

        for (let i = 1; i < tiles.length; i++) {
            tiles[i].classList.add('grayscale');
        }

    }, 1000);
}



const init = () => {

    disableTapZoom();
    setBoardSize();
    fillBoard();

    // cover();

    showBoard();
    enableReset();
    enableTouch();

    if (aiMode()) setTimeout(aiPlay, 1000);
}

window.addEventListener('load', () => document.fonts.ready.then(init));