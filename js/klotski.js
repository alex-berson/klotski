const gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gap'));

const touchScreen = () => matchMedia('(hover: none)').matches;

const setBoardSize = () => {

    let minSide = screen.height > screen.width ? screen.width : window.innerHeight;
    let cssBoardSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--board-size'));
    let boardSize = Math.ceil(minSide * cssBoardSize / 4) * 4;

    document.documentElement.style.setProperty('--board-size', boardSize + 'px');
}

const fillBoard = () => {

    let places = [1,0,3,8,11,9,13,14,16,19];
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

const checkMove = (tile1) => {

    let board = document.querySelector('.board');
    let tiles = document.querySelectorAll('.tile');
    let borderWidth = parseInt(getComputedStyle(board).getPropertyValue('border-width'));
    
    let left = true;
    let right = true;
    let up = true;
    let down = true;
    let rectTile1 = tile1.getBoundingClientRect();
    let rectBoard = board.getBoundingClientRect();

    if (rectBoard.left + borderWidth + gap>= rectTile1.left) left = false;
    if (rectBoard.right - borderWidth - gap<= rectTile1.right) right = false;
    if (rectBoard.top + borderWidth + gap>= rectTile1.top) up = false;
    if (rectBoard.bottom - borderWidth - gap<= rectTile1.bottom) down = false;

    for (let tile of tiles) {

        if (tile1 == tile) continue;

        let rectTile = tile.getBoundingClientRect();

        if (rectTile.right + gap== rectTile1.left 
            && ((rectTile.top - gap + 1 <= rectTile1.top && rectTile.bottom + gap - 1 >= rectTile1.top)
            || (rectTile.top - gap + 1 <= rectTile1.bottom && rectTile.bottom + gap - 1 >= rectTile1.bottom)
            || (rectTile.top - gap + 1 >= rectTile1.top && rectTile.bottom + gap - 1 <= rectTile1.bottom))) left = false;

        if (rectTile.left - gap == rectTile1.right
            && ((rectTile.top - gap + 1 <= rectTile1.top && rectTile.bottom + gap - 1 >= rectTile1.top)
            || (rectTile.top - gap + 1 <= rectTile1.bottom && rectTile.bottom + gap - 1 >= rectTile1.bottom)
            || (rectTile.top - gap + 1 >= rectTile1.top && rectTile.bottom + gap - 1 <= rectTile1.bottom))) right = false;
        
        if (rectTile.bottom + gap == rectTile1.top 
            && ((rectTile.left - gap + 1 <= rectTile1.left && rectTile.right + gap - 1 >= rectTile1.left)
            || (rectTile.left - gap + 1 <= rectTile1.right && rectTile.right + gap - 1 >= rectTile1.right)
            || (rectTile.left - gap + 1 >= rectTile1.left && rectTile.right + gap - 1 <= rectTile1.right))) up = false;
         
        if (rectTile.top - gap == rectTile1.bottom
            && ((rectTile.left - gap + 1 <= rectTile1.left && rectTile.right + gap - 1 >= rectTile1.left)
            || (rectTile.left - gap + 1 <= rectTile1.right && rectTile.right + gap - 1 >= rectTile1.right)
            || (rectTile.left - gap + 1 >= rectTile1.left && rectTile.right + gap - 1 <= rectTile1.right))) down = false;
    }

    return [left, right, up, down];
}

const startMove = (e) => {

    console.clear();

    if (document.querySelector('.move') != null) return;

    const tile = e.currentTarget;

    tile.classList.add('move');

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

    let style = window.getComputedStyle(tile);
    let matrix = new WebKitCSSMatrix(style.transform);
    let [left, right, up, down] = checkMove(tile);

    if (dx < 0 && !left) dx = 0;
    if (dx > 0 && !right) dx = 0;
    if (dy < 0 && !up) dy = 0;
    if (dy > 0 && !down) dy = 0;

    if (dx == 0 && dy > 0) {

        for (let y = 1; y <= dy; y++) {

            let [left, right, up, down] = checkMove(tile);

            if (!down || tile.classList.contains('horiz')) break;

            tile.classList.add('vert');

            tile.style.transform = `translate(${matrix.m41 + dx}px, ${matrix.m42 + y}px)`;
        }
    }

    if (dx == 0 && dy < 0) {

        for (let y = -1; y >= dy; y--) {

            let [left, right, up, down] = checkMove(tile);

            if (!up || tile.classList.contains('horiz')) break;

            tile.classList.add('vert');

            tile.style.transform = `translate(${matrix.m41 + dx}px, ${matrix.m42 + y}px)`;
        }
    }

    if (dy == 0 && dx > 0) {

        for (let x = 1; x <= dx; x++) {

            let [left, right, up, down] = checkMove(tile);

            if (!right || tile.classList.contains('vert')) break;

            tile.classList.add('horiz');

            tile.style.transform = `translate(${matrix.m41 + x}px, ${matrix.m42 + dy}px)`;
        }
    }

    if (dy == 0 && dx < 0) {

        for (let x = -1; x >= dx; x--) {

            let [left, right, up, down] = checkMove(tile);

            if (!left || tile.classList.contains('vert')) break;

            tile.classList.add('horiz');

            tile.style.transform = `translate(${matrix.m41 + x}px, ${matrix.m42 + dy}px)`;
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

    let tile = document.querySelector('.move');
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

        if (ox >= rectCell.left - gap  / 2 && ox <= rectCell.right + gap  / 2 && oy >= rectCell.top - gap  / 2 && oy <= rectCell.bottom + gap  / 2) {
            return i;
        }
    }

    return null;
}

const endMove = () => {
        
    let tile = document.querySelector('.move');

    let i = destCell(tile);

    tile.dataset.pos = i;

    let pos = Number(tile.dataset.pos);
    
    cell = document.querySelectorAll('.cell')[pos];
    tile.classList.add('return');        
         
    let event = new Event('transitionend');

    let style = window.getComputedStyle(tile);
    let matrix = new WebKitCSSMatrix(style.transform);
    let rectTile = tile.getBoundingClientRect();
    let rectCell = cell.getBoundingClientRect();

    tile.removeEventListener('touchmove', touchMove);
    document.removeEventListener('mousemove', mouseMove);

    tile.removeEventListener('touchend', endMove);
    tile.removeEventListener('touchcancel', endMove);
    document.removeEventListener('mouseup', endMove);

    let offsetLeft = rectTile.left - rectCell.left;
    let offsetTop = rectTile.top - rectCell.top;

    tile.style.transform = `translate(${Math.round(matrix.m41 - offsetLeft)}px, ${Math.round(matrix.m42 - offsetTop)}px)`;

    tile.addEventListener('transitionend', e => {

        let tile = e.currentTarget;

        tile.classList.remove('return', 'move', 'vert', 'horiz');
        
    }, {once: true});

    if (offsetLeft == 0 && offsetTop == 0) tile.dispatchEvent(event);
}

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
    enableTouch();
}

window.onload = () => document.fonts.ready.then(init());