// STATE
let curSize = 16;

// DOM ELEMENTS
const flexContainer = document.querySelector(".flex-container");
const sizeInput = document.querySelector("#size");
const submit = document.querySelector("#submit");
const reset = document.querySelector("#reset");
// Optional: clear the board whenever a new style is selected.
// Disabled on purpose so styles can be mixed in one drawing, like a sketchpad
// const styleRadios = document.querySelectorAll('input[name="style"]');

// LOGIC
function createGrid(size) {
    flexContainer.textContent = "";
    curSize = size;
    const squareSize = `${100 / size}%`;
    for (let i = 0; i < size ** 2; i++) {
        const square = document.createElement("div");
        square.style.width = squareSize;
        square.style.height = squareSize;
        square.classList.add("square");
        square.addEventListener("mouseenter", (e) => {
            if (e.buttons !== 1) return;
            colorSquare(square);
        });
        square.addEventListener("mousedown", () => colorSquare(square));
        flexContainer.appendChild(square);
    }
}

function randomChannel() {
    return Math.floor(Math.random() * 256);
}

function colorSquare(square) {
    const style = document.querySelector('input[name="style"]:checked').value;
    if (style === "solid") {
        square.style.backgroundColor = "black";
        square.dataset.darkness = 10;
    } else if (style === "color") {
        square.style.backgroundColor = `rgb(${randomChannel()}, ${randomChannel()}, ${randomChannel()})`;
        square.dataset.darkness = 0;
    } else {
        const darkness = Math.min(Number(square.dataset.darkness || 0) + 1, 10);
        square.dataset.darkness = darkness;
        square.style.backgroundColor = `rgba(0, 0, 0, ${darkness / 10})`;
    }
}

function resetGrid() {
    createGrid(curSize);
}

// EVENT HANDLERS
function handleSubmit() {
    const size = Number(sizeInput.value);
    if (!Number.isInteger(size) ||
        size < 1 ||
        size > 100) return;
    createGrid(size);
}

// EVENT LISTENERS
submit.addEventListener("click", handleSubmit);
sizeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSubmit();
});
reset.addEventListener("click", resetGrid);

// Optional: wipe the board on style change (see note in DOM ELEMENTS).
// styleRadios.forEach(radio => {
//     radio.addEventListener("change", resetGrid);
// });

// INIT
createGrid(16);