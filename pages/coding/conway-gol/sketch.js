// Globals ----------------------------------------------------------------
var gridBuffer;
var gridView;
let saveState;
var gridH;
var gridW;
let playpause = 0;
var k = 5;
let canvasW;
let drawMode;
let prevx, prevy;
let gliderStamp;
let selectedStamp = 0;
let rot = 1;
let offsetX = 0;
let offsetY = 0;
let mouseHeld;
let fr = 5;
let staticGrid;
let playbutton;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const initialiseStamps = () => {
    gliderStamp = [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 1]]
    gliderGunStamp = 
    [
        [-17, 0], [-17, 1], [-16, 0], [-16, 1], [-7, 0], [-7, 1], [-7, 2],
        [-6, -1], [-6, 3], [-5, -2], [-5, 4], [-4, -2], [-4, 4], [-3, 1],
        [-2, -1],[-2, 3], [-1, 0], [-1, 1], [-1, 2], [0, 1], [3, -2], 
        [3, -1],[3, 0], [4, -2],[4, -1], [4, 0], [5, -3], [5, 1], [7, -4],
        [7, -3], [7, 1], [7, 2], [17, -2],[17, -1], [18, -2], [18, -1]
    ]
}

// Mini-functions ---------------------------------------------------------
function inRange(x, min, max){
    return min <= x && x < max;
}

function mouseCoords() {
    let x = Math.floor((offsetX) / k);
    let y = Math.floor((offsetY) / k);
    console.log(x,y);
    return [x, y]
}

function lerp(from, to, amt) {
    return from + amt * (to - from)
}

function toggleStamp(stamp) {
    if (selectedStamp == stamp) {
        selectedStamp = 0;
    } else {
        selectedStamp = stamp;
    }
}

function rotateStamp() {
    if (selectedStamp) {
        selectedStamp = selectedStamp.map(x => ([(x[0] * rot), (x[1] * rot * -1)]))
        rot *= -1
    }
}

function clearGrid(event) {
    grid = createGrid(gridW, gridH);
}

function createGrid() {
    // grid = new Array(gridW).fill(Array(gridH).fill(0));
    grid = new ArrayBuffer((gridW / 8) * (gridH));
    gridView = new Uint8Array(grid)
}


// ------------- Read and Write -------------
function atGridCoords(x, y) {
    let bitPos = y * gridW + x;
    let whichByte = Math.floor(bitPos / 8);
    let intIndex = bitPos % 8;
    // console.log(whichByte, intIndex)
    return [whichByte, intIndex];
}

function alterGrid([whichByte, intIndex], value = drawMode) {
    let binary = 2 ** (-intIndex + 7);
    // console.log(binary.toString(2))
    if (value) {
        gridView[whichByte] |= binary;
    } else {
        gridView[whichByte] &= ~binary;
    }
}

function gridValueAt(x, y, grid = gridView) {
    let [byte, bit] = atGridCoords(x, y);
    return (grid[byte] & 128>>bit) ? 1 : 0;
}


// ------------- Generators -------------
function* allAliveCells(grid = gridView) {
    // let bitPos = 8;
    let y = 0;
    let byteXPos = 0;
    gridWidthInBytes = gridW / 8;
    numBytes = gridH * (gridWidthInBytes);
    for (i = 0; i < numBytes; i++) {
        byte = gridView[i];
        if (byteXPos == gridWidthInBytes) { y++; byteXPos = 0 }
        if (byte == 0) { byteXPos++; continue }
        // Enumerates through the bits one by one in reverse
        // Could do it forwards but flip x-axis e.g. x = x*-1+8 
        for (var mask = 1 << 7, bitPos = 0; mask; mask >>= 1, bitPos++) {
            if (byte & mask) {
                x = byteXPos * 8 + bitPos
                yield [x, y];
            }
        }
        byteXPos++
        // a = 9
    }
}

function* allCells(grid = gridView) {
    let y = 0;
    let byteXPos = 0;
    gridWidthInBytes = gridW / 8;
    numBytes = gridH * (gridWidthInBytes);
    for (i = 0; i < numBytes; i++) {
        byte = gridView[i];
        if (byteXPos == gridWidthInBytes) { y++; byteXPos = 0 }

        // Enumerates through the bits one by one in reverse
        // Could do it forwards but flip x-axis e.g. x = x*-1+8
        
        //  var mask = 128; mask; mask!=0 128>64>32...
        for (var mask = 1 << 7, bitPos = 0; mask; mask >>= 1, bitPos++) {
            x = byteXPos * 8 + bitPos
            yield [x, y, (byte & mask) ? 1 : 0];
            
        }
        byteXPos++
    }
}


// function* allCells(grid = gridView) {
//     let a = 8;
//     let b = 0;
//     gridWidthInBytes = gridW / 8;
//     numBytes = gridH * (gridWidthInBytes);
    
//     // for (var byteXPos = 0, y=0; byteXPos < numBytes; (byteXPos==gridWidthInBytes) ? byteXPos=0 : byteXPos++) {
//         // byte = gridView[i];
//     for (byteXPos = 0, y=0, i=0; i <= numBytes; (byteXPos==gridWidthInBytes) ? [byteXPos=0, y++, i++] : [byteXPos++, i++]){
//         byte = grid[i]
//         // Enumerates through the bits one by one in reverse
//         //  var mask = 128; mask; mask!=0 128>64>32...
//         for (var mask = 1 << 7, bitPos = 0; mask; mask >>= 1, bitPos++) {
//             x = byteXPos * 8 + bitPos
//             yield [x, y, (byte & mask) ? 1 : 0];
//         }
//     }
// }


// main-functions ---------------------------------------------------------
function drawStampPreview() {
    ctx.fillStyle = "gray";
    let [mx, my] = mouseCoords()
    if (selectedStamp) {
        for (let [x, y] of selectedStamp.map(x => ([(x[0] + mx), (x[1] + my)]))) {
            ctx.fillRect(k * x, k * y, k, k);
        }
    } else {
        ctx.fillRect(k * mx, k * my, k, k);
    }
}

function drawStamp() {
    if (selectedStamp == 0) {
        let [mx, my] = mouseCoords();
        if (!playpause) {
            interpolatePoints(mx, my, prevx, prevy);
            // grid[my][mx] = drawMode;
            alterGrid(atGridCoords(mx, my));
        }
        prevx = mx;
        prevy = my;
    }
    else {
        let [mx, my] = mouseCoords()
        if (!playpause) {
            for (let [x, y] of selectedStamp.map(x => ([(x[0] + mx), (x[1] + my)]))) {
                if (inRange(x, 0, gridW) && inRange(y, 0, gridH)) {
                    alterGrid(atGridCoords(x, y));
                }
            }
        }
    }
}

function drawGrid() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, gridH * k, gridH * k);
    ctx.fillStyle = "white";
    for (let [x, y] of allAliveCells()) {
        ctx.fillRect(k * x, k * y, k, k);
    }
}

function neighbours(ox, oy, grid = gridView) {
    let x = 0;
    let y = 0;
    let numAlive = 0;
    let positionIsValid;
    var neighbours = [[-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]]
    let positions = neighbours.map(n => ([n[0] + ox, n[1] + oy]));
    for (let [x,y] of positions) {
        positionIsValid = (inRange(x, 0, gridW) && inRange(y, 0, gridH));
        if (positionIsValid) {
            numAlive += gridValueAt(x, y, grid);
        }
    }
    return numAlive;
}

function updateGrid() {
    // read from this grid but edit main grid
    staticGrid = new Uint8Array(Array.from(gridView));
    for (let [selfX, selfY, alive] of allCells(staticGrid)) {
        let numAlive = neighbours(selfX, selfY, staticGrid);
        if (!alive) {
            if (numAlive == 3) { alterGrid(atGridCoords(selfX, selfY), 1) }
        } else if (!inRange(numAlive, 2, 4)) { alterGrid(atGridCoords(selfX, selfY), 0) }
    }
}

function interpolatePoints(x, y, prevx, prevy) {
    let xdiff = Math.abs((x - prevx));
    let ydiff = Math.abs((y - prevy));
    let max = Math.max(xdiff, ydiff);
    if (xdiff > 1 || ydiff > 1) {
        for (let i = 1; i < max; i++) {
            let amt = 1 / max;
            newx = lerp(prevx, x, amt * i);
            newy = lerp(prevy, y, amt * i);
            alterGrid(atGridCoords(Math.round(newx, 0), Math.round(newy, 0)))
        }
    }
}


// Setup & Draw -----------------------------------------------------------
function addEventListeners(){
    document.addEventListener('mousemove', onMouseMove);
    addEventListener('mousedown', mousePressed);
    addEventListener('mouseup', (event) => { mouseHeld = false });
    addEventListener('keydown', (event) => { if (event.key === " ") { playpause = -playpause + 1 } });
    addEventListener('keydown', (event) => { if (event.key === "c" && (event.ctrlKey)) { clearGrid(event); event.preventDefault(); } });
    addEventListener('keydown', (event) => { if (event.key === "i") { updateGrid() } });
    addEventListener('keydown', (event) => { if (event.key === "s") { saveState = Array.from(gridView) } });
    addEventListener('keydown', (event) => { if (event.key === "d") { gridView = Array.from(saveState) } });
    addEventListener('keydown', (event) => { if (event.key === "g") { toggleStamp(gliderStamp) } });
    addEventListener('keydown', (event) => { if (event.key === "h") { toggleStamp(gliderGunStamp) } });
    addEventListener('keydown', (event) => { if (event.key === "r") { rotateStamp() } });
    // addEventListener('keydown', (event) => { if (event.key === "p" && (event.ctrlKey)) { console.log(gridView);; event.preventDefault(); } });
    // Code timing function
    addEventListener('keydown', (event) => { if (event.key === "l" && (event.ctrlKey)) { timeCode(); event.preventDefault(); } });
}

function setup() {
    canvasW = canvas.offsetWidth;
    canvasH = canvas.offsetHeight;
    canvas.height = canvasH;
    canvas.width = canvasW;
    gridH = 800;
    gridW = 800;
    grid = createGrid((gridW / 8) * gridH);
    k = canvasW / gridW;

    initialiseStamps()
    addEventListeners()
}

const repeat = () => {
    setInterval(draw, 1 / fr);
}

function draw() {
    drawGrid();
    drawStampPreview();

    if (playpause) {
        playbutton.className = "button toggled";
        fr = 60;
        updateGrid();
    } else {
        playbutton.className = "button";
        fr = 60;
    }

    if (mouseHeld === true) {
        drawStamp();
    }

}

// ---------------- Execution ----------------
setup();
repeat();

function mousePressed(event) {
    if (mouseOnGrid) {
        mouseHeld = true
        let [mx, my] = mouseCoords()
        if (!playpause) {
            drawMode = -gridValueAt(mx, my) + 1;
            // console.log(gridValueAt(mx,my));
            prevx = mx;
            prevy = my;
        }
    }
}

function onMouseMove(e) {
    console.log(e);
    if (e.target.id == "canvas") {
        mouseOnGrid = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        console.log("offset=", offsetX, offsetY);
    } else {
        mouseOnGrid = false;
    }
}


// Debug ------------------------------------------------------------------
function timeCode() {
    var startTime = performance.now()

    for (reps = 0; reps < 20000; reps++) {
    }

    var endTime = performance.now()
    console.log(`New code took ${endTime - startTime} milliseconds`)

    var startTime = performance.now()

    for (reps = 0; reps < 20000; reps++) {

    }

    var endTime = performance.now()
    console.log(`Old code took ${endTime - startTime} milliseconds`)
}
