const showBoard = () => document.body.style.opacity = 1;

const setBoardSize = () => {

    let minSide = screen.height > screen.width ? screen.width : window.innerHeight;
    let cssBoardSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--board-size')) / 100;
    let boardSize = Math.ceil(minSide * cssBoardSize / 4) * 4;

    document.documentElement.style.setProperty('--board-size', boardSize + 'px');
}

const fillBoard = () => {

    let positions = [1,0,3,8,11,9,13,14,16,19];
    let cells = document.querySelectorAll('.cell');
    let blocks = document.querySelectorAll('.block');

    for (let [i, n] of positions.entries()) {

        let rectBlock = blocks[i].getBoundingClientRect();
        let rectCell = cells[n].getBoundingClientRect();
        let offsetLeft = rectCell.left - rectBlock.left;
        let offsetTop = rectCell.top - rectBlock.top;
        
        blocks[i].dataset.pos = n;
        blocks[i].style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
    }
}

const checkDirections = (block) => {

    let directions = ['left', 'right', 'up', 'down'];
    let groupedBlocks = directions.map(() => new Set());
    let board = document.querySelector('.board');
    let rectBoard = board.getBoundingClientRect();
    let blocks = document.querySelectorAll('.block');
    let borderWidth = parseInt(getComputedStyle(board).getPropertyValue('border-width'));
    let gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gap'));
    
    const traverse = (currentBlock, i) => {
  
        let rectCurrentBlock = currentBlock.getBoundingClientRect();
        let {left, right, top, bottom} = rectBoard;
        let borderGap = borderWidth + gap;
    
        let touchesEdges = {
            left: left + borderGap >= rectCurrentBlock.left,
            right: right - borderGap <= rectCurrentBlock.right,
            up: top + borderGap >= rectCurrentBlock.top,
            down: bottom - borderGap <= rectCurrentBlock.bottom
        }

        let touchesEdge = touchesEdges[directions[i]];

        groupedBlocks[i].add(currentBlock);
    
        if (touchesEdge) {
            groupedBlocks[i].add(null);
            return;
        }
    
        for (let nextBlock of blocks) {

            if (currentBlock == nextBlock || groupedBlocks[i].has(nextBlock)) continue;
  
            let rectNextBlock = nextBlock.getBoundingClientRect();
  
            let sides = {
                left: ['right', 'left', 'top', 'bottom'],
                right: ['left', 'right', 'top', 'bottom'],
                up: ['bottom', 'top', 'left', 'right'],
                down: ['top', 'bottom', 'left', 'right']
            }

            let [side1, side2, side3, side4] = sides[directions[i]];
    
            let adjacent = rectNextBlock[side1] + (directions[i] == 'right' || directions[i] == 'down' ? -gap : gap) == rectCurrentBlock[side2] &&
                (
                    (rectNextBlock[side3] - gap + 1 <= rectCurrentBlock[side3] && rectNextBlock[side4] + gap - 1 >= rectCurrentBlock[side3]) ||
                    (rectNextBlock[side3] - gap + 1 <= rectCurrentBlock[side4] && rectNextBlock[side4] + gap - 1 >= rectCurrentBlock[side4]) ||
                    (rectNextBlock[side3] - gap + 1 >= rectCurrentBlock[side3] && rectNextBlock[side4] + gap - 1 <= rectCurrentBlock[side4])
                );
    
            if (adjacent) traverse(nextBlock, i);
        }
    }
  
    directions.forEach((_, i) => traverse(block, i));
  
    return groupedBlocks.map(blocks => blocks.has(null) ? null : [...blocks]);
}

const moveBlock = (block, dx, dy) => {

    let direction, start, step, delta, matrices = [];
    let vertical = Math.abs(dx) < Math.abs(dy);
    let horizontal = Math.abs(dx) > Math.abs(dy);
    let [left, right, up, down] = checkDirections(block);
    let cells = document.querySelectorAll('.cell');
    let blocks = [...document.querySelectorAll('.move:not(.selected')];   
    let directions = {down, up, left, right};
    let opposite = {down:'up',up:'down',left:'right',right:'left'};

    const touchesEdge = (direction) => direction == null || direction.length == 1;

    if (touchesEdge(left) && touchesEdge(right) && touchesEdge(up) && touchesEdge(down) && blocks.length != 0) endMove();
    if (dx < 0 && left == null) dx = 0;
    if (dx > 0 && right == null) dx = 0;
    if (dy < 0 && up == null) dy = 0;
    if (dy > 0 && down == null) dy = 0;

    if (dx == 0 && dy > 0 && vertical) {
        direction = 'down', start = 1, step = 1, delta = dy;
    } else if (dx == 0 && dy < 0 && vertical) {
        direction = 'up', start = -1, step = -1, delta = dy;
    } else if (dy == 0 && dx > 0 && horizontal) {
        direction = 'right', start = 1, step = 1, delta = dx;
    } else if (dy == 0 && dx < 0 && horizontal) {
        direction = 'left', start = -1, step = -1, delta = dx;
    } else {
        return;
    }

    let length = directions[direction].length;

    for (let coord = start; (step > 0 ? coord <= delta : coord >= delta); coord += step) {

        let [left, right, up, down] = checkDirections(block);
        let directions = {down, up, left, right};

        if (directions[direction] == null) break;
        if (length < directions[direction].length) break;

        for (let block of directions[direction]) {
            block.classList.add('move');
        }

        let groupedBlocks = [...new Set(directions[direction].concat(blocks))];
        let changeDirection = block.classList.contains(opposite[direction]) && directions[opposite[direction]] == null;

        block.classList.remove('down','up','right','left');
        block.classList.add(direction);

        if (changeDirection) return;

        for (let [i, block] of groupedBlocks.entries()) {

            let pos = Number(block.dataset.pos);
            let rectBlock = block.getBoundingClientRect();
            let rectCell = cells[pos].getBoundingClientRect();

            if (rectBlock.left == rectCell.left && rectBlock.top == rectCell.top) {
                if (!directions[direction].includes(block)) {
                    block.classList.remove('move');
                    continue;
                }
            }

            if (matrices.length == i) {
                let style = window.getComputedStyle(block);
                matrices[i] = new DOMMatrix(style.transform);  
            }

            let [x, y] = direction == 'down' || direction == 'up' ? [dx, coord] : [coord, dy];

            block.style.transform = `translate(${matrices[i].m41 + x}px, ${matrices[i].m42 + y}px)`;
            
            if (gameOver()) endMove(block);
        }  
    }
}

const startMove = (e) => {

    if (aiMode() || document.querySelector('.selected')) return;

    let block = e.currentTarget;

    block.classList.add('selected', 'move');

    if (e.type == 'touchstart') {

        let n = 0;

        while (e.currentTarget != e.touches[n].target) n++;

        block.dataset.x = e.touches[n].clientX;
        block.dataset.y = e.touches[n].clientY;

        block.addEventListener('touchmove', touchMove);
        block.addEventListener('touchend', endMove);
        block.addEventListener('touchcancel', endMove);

    } else {

        block.dataset.x0 = block.dataset.x = e.clientX
        block.dataset.y0 = block.dataset.y = e.clientY

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', endMove);
    }
}

const touchMove = (e) => {

    let n = 0;
    let block = e.currentTarget;
    
    while (e.currentTarget != e.touches[n].target) n++;

    let dx = e.touches[n].clientX - block.dataset.x;
    let dy = e.touches[n].clientY - block.dataset.y;

    block.dataset.x = e.touches[n].clientX;
    block.dataset.y = e.touches[n].clientY;

    moveBlock(block, dx, dy);
}

const mouseMove = (e) => {

    let block = document.querySelector('.selected');
    let dx = e.clientX - block.dataset.x;
    let dy = e.clientY - block.dataset.y;

    block.dataset.x = e.clientX;
    block.dataset.y = e.clientY;

    moveBlock(block, dx, dy);
}

const destinationCell = (block) => {

    let cells = document.querySelectorAll('.cell');
    let rectBlock = block.getBoundingClientRect();
    let rectCell = cells[0].getBoundingClientRect();
    let size = rectCell.width;
    let ox = rectBlock.left + size / 2;
    let oy = rectBlock.top + size / 2;
    let gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gap'));

    for (let [i, cell] of cells.entries()) {

        let rectCell = cell.getBoundingClientRect();

        if (ox >= rectCell.left - gap / 2 && ox <= rectCell.right + gap / 2 && oy >= rectCell.top - gap  / 2 && oy <= rectCell.bottom + gap  / 2) return i;
    }

    return null;
}

const endMove = (e) => {

    let blocks = document.querySelectorAll(e != undefined ? '.move' : '.move:not(.selected)');

    for (let block of blocks) {

        let i = destinationCell(block);
        let cell = document.querySelectorAll('.cell')[i];      
        let event = new Event('transitionend');
        let style = window.getComputedStyle(block);
        let matrix = new DOMMatrix(style.transform);
        let rectBlock = block.getBoundingClientRect();
        let rectCell = cell.getBoundingClientRect();

        block.dataset.pos = i;
        block.classList.add('return');  

        if (e != undefined) {
            block.removeEventListener('touchmove', touchMove);
            document.removeEventListener('mousemove', mouseMove);
            block.removeEventListener('touchend', endMove);
            block.removeEventListener('touchcancel', endMove);
            document.removeEventListener('mouseup', endMove);
        }

        let offsetLeft = rectBlock.left - rectCell.left;
        let offsetTop = rectBlock.top - rectCell.top;

        block.style.transform = `translate(${matrix.m41 - offsetLeft}px, ${matrix.m42 - offsetTop}px)`;

        block.addEventListener('transitionend', e => {

            let block = e.currentTarget;

            block.classList.remove('return', 'selected', 'move', 'left', 'right', 'up', 'down');

            if (gameOver()) {
                disableTouch();
                slideOut();
            }
            
        }, {once: true});

        if (offsetLeft == 0 && offsetTop == 0) block.dispatchEvent(event);   
    }
}

const totalDistance = (starts, ends) => {

    const adjustedManhattanDistance = (pos, newPos) => {

        let [r1, c1] = [Math.floor(pos / 4), pos % 4];
        let [r2, c2] = [Math.floor(newPos / 4), newPos % 4];
    
        return Math.abs(r2 - r1) + Math.abs(c2 - c1) + 0.01 * Math.min(Math.abs(r2 - r1), Math.abs(c2 - c1));
    }

    let total = 0;

    for (let i = 0; i < starts.length; i++) {
        total += adjustedManhattanDistance(starts[i], ends[i]);
    }

    return total;
}

const resetGame = () => {

    const allPermutations = (arr) => {

        if (arr.length == 0) return [[]];
    
        return arr.flatMap((e, i) => allPermutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(p => [e, ...p]));
    }

    let shapes = [[0],[1,2,3,4],[5],[6,7,8,9]];
    let positions = [[1],[0,3,8,11],[9],[13,14,16,19]];
    let blocks = document.querySelectorAll('.block');
    let cells = document.querySelectorAll('.cell');
    let arrows = document.querySelector('.arrows');
    let bigBlock = blocks[0];

    if ([...blocks].some(block => block.classList.contains('move') || block.classList.contains('ai-move'))) return;

    enableTouch();

    for (let [i, blockNums] of shapes.entries()) {

        let minN;
        let startPositions = [];
        let minDistance = Infinity;
        let allEndPositions = allPermutations(positions[i]);

        for (let num of blockNums) {
            startPositions.push(Number(blocks[num].dataset.pos)); 
        }

        for (let [n, endPositions] of allEndPositions.entries()) {

            let total = totalDistance(startPositions, endPositions);

            if (total < minDistance) [minDistance, minN] = [total, n];
        }

        let endPositions = allEndPositions[minN];

        for (let [n, num] of blockNums.entries()) {

            if (startPositions[n] == endPositions[n]) continue;

            let block = blocks[num];
            let cell = cells[endPositions[n]];  
            let style = window.getComputedStyle(block);
            let matrix = new DOMMatrix(style.transform);
            let rectCell = cell.getBoundingClientRect();
            let rectBlock = block.getBoundingClientRect();
            let offsetTop = rectBlock.top - rectCell.top;
            let offsetLeft = rectBlock.left - rectCell.left;
            
            block.classList.add('return'); 
            arrows.classList.add('rotate');
       
            block.dataset.pos = endPositions[n];
            block.style.transform = `translate(${matrix.m41 - offsetLeft}px, ${matrix.m42 - offsetTop}px)`;
    
            block.addEventListener('transitionend', e => {
    
                let block = e.currentTarget;
    
                block.classList.remove('return');  
                
                block.addEventListener('transitionend', e => {
    
                    let block = e.currentTarget;
        
                    block.style.removeProperty('transition');       
                    
                }, {once: true});
                
            }, {once: true});

            arrows.addEventListener('animationend', e => {
        
                let arrows = e.currentTarget;

                arrows.classList.remove('rotate');       
                
            }, {once: true});
        }
    }

    for (let [i, pos] of positions.flat().entries()) {

        let block = document.querySelector(`[data-pos='${pos}']`);
        block.id = `b${i}`;
    }

    if (bigBlock.classList.contains('invisible')) {

        bigBlock.style.transition = 'opacity 0.2s ease-in-out';
        bigBlock.classList.remove('invisible');

        bigBlock.addEventListener('transitionend', e => {
    
            let block = e.currentTarget;

            block.style.removeProperty('transition');       
            
        }, {once: true});

        document.querySelector('.board').removeEventListener('touchstart', resetGame);
        document.querySelector('.board').removeEventListener('mousedown', resetGame);

        if (aiMode()) {
            disableReset();    
            aiPlay({init: false});
        }
    }
}

const slideOut = () => {

    let bigBlock = document.querySelector('#b0');
    let cells = document.querySelectorAll('.cell');
    let style = window.getComputedStyle(bigBlock);
    let matrix = new DOMMatrix(style.transform);
    let distance = window.innerHeight - bigBlock.getBoundingClientRect().top + 150;
    let offset = cells[4].getBoundingClientRect().top - cells[0].getBoundingClientRect().top;

    bigBlock.classList.add('ai-move');

    bigBlock.style.transition = `all ${0.15 * distance / offset}s ease-in-out`;
    bigBlock.style.transform = `translate(${matrix.m41}px, ${matrix.m42 + distance}px)`;

    bigBlock.addEventListener('transitionend', e => {

        let block = e.currentTarget;

        block.classList.remove('ai-move');
        block.style.removeProperty('transition');
        block.classList.add('invisible');

        document.querySelector('.board').addEventListener('touchstart', resetGame);
        document.querySelector('.board').addEventListener('mousedown', resetGame);

        enableReset();

    }, {once: true});
}

const gameOver = () => {

    let bigBlock = document.querySelector('#b0');
    let exitPosition = document.querySelectorAll('.cell')[13];
    let rectBlock = bigBlock.getBoundingClientRect();
    let rectCell = exitPosition.getBoundingClientRect();

    return rectBlock.top == rectCell.top && rectBlock.left == rectCell.left;
}

const aiPlay = ({init = true} = {}) => {

    const setVisibilityChange = () => window.addEventListener('visibilitychange', handleVisibilityChange);

    const removeVisibilityChange = () => window.removeEventListener('visibilitychange', handleVisibilityChange);

    const handleVisibilityChange = () => {

        if (document.hidden) {
            clearTimeout(timer);
            timer = null;
        } else {
            if (timer == null) makeMove();
        }
    }

    const makeMove = () => {

        if (gameOver()) {
            removeVisibilityChange();
            slideOut();
            return;
        }

        if (document.hidden) return;

        let cells = document.querySelectorAll('.cell');
        let [num, from, to] = moves.shift();
        let block = document.querySelector(`#b${num}`);
        let style = window.getComputedStyle(block);
        let matrix = new DOMMatrix(style.transform);
        let rectBlock = block.getBoundingClientRect();
        let rectCell = cells[to].getBoundingClientRect();

        block.dataset.pos = to;

        block.classList.add('ai-move');

        block.addEventListener('transitionend', e => {

            let block = e.currentTarget;
    
            block.classList.remove('ai-move');
    
        }, {once: true});
    
        block.style.transform = `translate(${matrix.m41 - (rectBlock.left - rectCell.left)}px, ${matrix.m42 - (rectBlock.top - rectCell.top)}px)`;
        timer = setTimeout(() => makeMove(), 300);
    }

    let webWorker, timer, moves;
    let timeDelay = init ? 2000 : 1000;
    let startTime = Date.now();

    setVisibilityChange();
    disableReset();

    try {
        
        webWorker = new Worker('./js/solver.js');

        webWorker.addEventListener('message', e => {

            aiPlay.savedMoves = moves = e.data;
    
            setTimeout(makeMove, timeDelay - (Date.now() - startTime));
    
            webWorker.terminate();
        });

    } catch (e) {

        moves = aiPlay.savedMoves;

        setTimeout(makeMove, timeDelay - (Date.now() - startTime));
    } 
}

const aiMode = () => {

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let mode = urlParams.get('mode');
    
    return mode == 'ai';
}

const enableReset = () => {

    let button = document.querySelector('.reset');

    button.classList.add('enabled');
    button.addEventListener('touchstart', resetGame);
    button.addEventListener('mousedown', resetGame);
}

const disableReset = () => {

    let button = document.querySelector('.reset');

    button.classList.remove('enabled');
    button.removeEventListener('touchstart', resetGame);
    button.removeEventListener('mousedown', resetGame);
}

const enableTouch = () => {

    let blocks = document.querySelectorAll('.block');

    blocks.forEach(block => {
        block.addEventListener('touchstart', startMove);
        block.addEventListener('mousedown', startMove);
    });

    window.addEventListener('orientationchange', endMove);
}

const disableTouch = () => {

    let blocks = document.querySelectorAll('.block');

    blocks.forEach(block => {
        block.removeEventListener('touchstart', startMove);
        block.removeEventListener('mousedown', startMove);
    });
}

const disableTapZoom = () => {

    const preventDefault = (e) => e.preventDefault();

    document.body.addEventListener('touchstart', preventDefault, {passive: false});
    document.body.addEventListener('mousedown', preventDefault, {passive: false});
}

const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js');
}

const init = () => {

    registerServiceWorker();
    disableTapZoom();
    setBoardSize();
    fillBoard();
    showBoard();
    enableReset();
    enableTouch();

    if (aiMode()) setTimeout(aiPlay, 100);
}

window.onload = () => document.fonts.ready.then(init);