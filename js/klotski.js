const gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gap'));

const showBoard = () => document.body.style.opacity = 1;

const touchScreen = () => matchMedia('(hover: none)').matches;

const setBoardSize = () => {

    let minSide = screen.height > screen.width ? screen.width : window.innerHeight;
    let cssBoardSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--board-size'));
    let boardSize = Math.ceil(minSide * cssBoardSize / 4) * 4;

    document.documentElement.style.setProperty('--board-size', boardSize + 'px');
}

const fillBoard = () => {

    let places = [1,0,3,8,11,9,13,14,16,19];
    // let places = [1,0,3,8,11,13,9,10,16,19];
    // let places = [1,0,13,8,14,9,3,7,16,19];


    let cells = document.querySelectorAll('.cell');
    let tiles = document.querySelectorAll('.tile');

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

const checkLeft = (tile1, tiles, rectBoard, borderWidth) => {

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

    traverseLeft(tile1);

    return moveTiles.includes(null) ? null : moveTiles;
}


const checkRight = (tile1, tiles, rectBoard, borderWidth) => {

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

    traverseRight(tile1);


    return moveTiles.includes(null) ? null : moveTiles;
}

const checkUp = (tile1, tiles, rectBoard, borderWidth) => {

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

    traverseUp(tile1);

    return moveTiles.includes(null) ? null : moveTiles;
}

const checkDown = (tile1, tiles, rectBoard, borderWidth) => {

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

    traverseDown(tile1);

    return moveTiles.includes(null) ? null : [...new Set(moveTiles)];
}


const checkMove = (tile1) => {

    let board = document.querySelector('.board');
    let tiles = document.querySelectorAll('.tile');
    let borderWidth = parseInt(getComputedStyle(board).getPropertyValue('border-width'));
    // let rectTile1 = tile1.getBoundingClientRect();
    let rectBoard = board.getBoundingClientRect();
    // let left = right = up = down = [tile1];

    // left = [tile1, tiles[8]];

    let left = checkLeft(tile1, tiles, rectBoard, borderWidth);
    let right = checkRight(tile1, tiles, rectBoard, borderWidth);
    let up = checkUp(tile1, tiles, rectBoard, borderWidth);
    let down = checkDown(tile1, tiles, rectBoard, borderWidth);

    // console.log(left);
    // console.log(right);
    // console.log(up);
    // console.log(down);

    return [left, right, up, down];
}

const startMove = (e) => {

    console.clear();

    if (document.querySelector('.selected') != null) return;

    let tile = e.currentTarget;

    tile.classList.add('selected', 'move');

    checkMove(tile);

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

    // let style = window.getComputedStyle(tile);
    // let matrix = new WebKitCSSMatrix(style.transform);
    let [left, right, up, down] = checkMove(tile);
    let tiles = [...document.querySelectorAll('.move')];
    let cells = document.querySelectorAll('.cell');

    if (dx < 0 && left == null) dx = 0;
    if (dx > 0 && right == null) dx = 0;
    if (dy < 0 && up == null) dy = 0;
    if (dy > 0 && down == null) dy = 0;

    if (dx == 0 && dy > 0) {

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

            if (down == null || tile.classList.contains('left') || tile.classList.contains('right')) break;

            if (length < down.length) break;

            for (let tile of down) {
                tile.classList.add('move');
            }

            let downPlus = [...new Set(down.concat(tiles))];

            // if (down == null || tile.classList.contains('horiz')) break;
            // if (down == null || tile.classList.contains('left') || tile.classList.contains('right')) break;


            // tile.classList.add('vert');
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
                    matrix[i] = new WebKitCSSMatrix(style.transform);  
                }


                // if (length < down.length && i >= length) {
                //     x0++;
                //     x = x0;
                // }

                tile.style.transform = `translate(${matrix[i].m41 + dx}px, ${matrix[i].m42 + y}px)`;
            }          
        }
    }

    if (dx == 0 && dy < 0) {

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

            if (up == null || tile.classList.contains('left') || tile.classList.contains('right')) break;

            if (length < up.length) break;


            for (let tile of up) {
                tile.classList.add('move');
            }

            let upPlus = [...new Set(up.concat(tiles))];

            // if (up == null|| tile.classList.contains('horiz')) break;
            // if (up == null || tile.classList.contains('left') || tile.classList.contains('right')) break;


            // tile.classList.add('vert');
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
                    matrix[i] = new WebKitCSSMatrix(style.transform);  
                }

                // if (length < up.length && i >= length) {
                //     x0--;
                //     x = x0;
                // }

                tile.style.transform = `translate(${matrix[i].m41 + dx}px, ${matrix[i].m42 + y}px)`;
            }       
        }
    }

    if (dy == 0 && dx > 0) {

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

            if (right == null || tile.classList.contains('up') || tile.classList.contains('down')) break;

            if (length < right.length) break;


            for (let tile of right) {
                tile.classList.add('move');
            }

            let rightPlus = [...new Set(right.concat(tiles))];

            // console.log(right);


            // if (right == null|| tile.classList.contains('vert')) break;
            // if (right == null || tile.classList.contains('up') || tile.classList.contains('down')) break;

            // tile.classList.add('horiz');
            tile.classList.add('right');

            // if (tile.classList.contains('left')) {
            //     tile.classList.remove('left');
            //     endMove();
            // }

            for (let [i, tile] of rightPlus.entries()) {

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
                    matrix[i] = new WebKitCSSMatrix(style.transform);  
                }

                // if (length < right.length && i >= length) {
                //     x0++;
                //     x = x0;
                // }

                tile.style.transform = `translate(${matrix[i].m41 + x}px, ${matrix[i].m42 + dy}px)`;
            }
        }
    }

    if (dy == 0 && dx < 0) {

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

            if (left == null || tile.classList.contains('up') || tile.classList.contains('down')) break;

            if (length < left.length) break;

            for (let tile of left) {
                tile.classList.add('move');
            }

            // tiles = [...document.querySelectorAll('.move')];

            let leftPlus = [...new Set(tiles.concat(left))];

            // console.log(left);

            // if (left == null|| tile.classList.contains('vert')) break;

            // console.log(tile);


            // tile.classList.add('horiz');

            tile.classList.add('left');

            // length = length || left.length;

            for (let [i, tile] of leftPlus.entries()) {

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
                        tile.classList.remove('move');
                        continue;
                    }
                }

                if (matrix.length == i) {
                    let style = window.getComputedStyle(tile);
                    matrix[i] = new WebKitCSSMatrix(style.transform);  
                }

                // if (length < left.length && i >= length) {
                //     console.log('X0');
                //     x0--;
                //     x = x0;
                // }

                // console.log(matrix)

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

    let tiles = e == undefined ? document.querySelectorAll('.move:not(.selected)') : document.querySelectorAll('.move');

    // console.log(tiles);

    for (let tile of tiles) {

        let i = destCell(tile);
        // let pos = i;

        // if (!e && Number(tile.dataset.pos) == i) return;

        tile.dataset.pos = i;

        cell = document.querySelectorAll('.cell')[i];
        tile.classList.add('return');        
            
        let event = new Event('transitionend');
        let style = window.getComputedStyle(tile);
        let matrix = new WebKitCSSMatrix(style.transform);
        let rectTile = tile.getBoundingClientRect();
        let rectCell = cell.getBoundingClientRect();

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

        tile.addEventListener('transitionend', e => {

            let tile = e.currentTarget;

            // tile.classList.remove('return', 'selected', 'vert', 'horiz');
            tile.classList.remove('return', 'selected', 'move', 'left', 'right', 'up', 'down', 'vert', 'horiz');

            
        }, {once: true});

        if (offsetLeft == 0 && offsetTop == 0) tile.dispatchEvent(event);   
    }
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

const enableTouch = () => {

    let event = touchScreen() ? 'touchstart' : 'mousedown';
    let tiles = document.querySelectorAll('.tile');

    tiles.forEach(piece => piece.addEventListener(event, startMove));

    window.addEventListener('orientationchange', endMove);
}

const disableTouch = () => {

    let event = touchScreen() ? 'touchstart' : 'mousedown';
    let tiles = document.querySelectorAll('.tile');

    tiles.forEach(piece => piece.removeEventListener(event, startMove));

    window.addEventListener('orientationchange', endMove);
}

const disableTapZoom = () => {

    const preventDefault = (e) => e.preventDefault();
    const event = touchScreen() ? 'touchstart' : 'mousedown';

    document.body.addEventListener(event, preventDefault, {passive: false});
}

const init = () => {

    disableTapZoom();
    setBoardSize();
    fillBoard();
    showBoard();
    enableTouch();

    // endMove();
}

window.onload = () => document.fonts.ready.then(init());