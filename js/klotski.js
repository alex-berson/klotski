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
    // let style = window.getComputedStyle(tiles[0]);
    // let matrix = new WebKitCSSMatrix(style.transform);

    // if (matrix.m41 != 0) return;

    for (let [i, n] of places.entries()) {

        let rectTile = tiles[i].getBoundingClientRect();
        let rectCell = cells[n].getBoundingClientRect();

        let offsetLeft =  rectCell.left - rectTile.left;
        let offsetTop =  rectCell.top - rectTile.top;

        tiles[i].style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
    }
}


const init = () => {

    setBoardSize();
    fillBoard();

}

window.onload = () => document.fonts.ready.then(init());