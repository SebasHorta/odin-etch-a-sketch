// STATE
let curSize = 16;

// DOM ELEMENTS
const flexContainer = document.querySelector(".flex-container");
const sizeInput = document.querySelector("#size");
const submit = document.querySelector("#submit");
const reset = document.querySelector("#reset");

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
            if (e.buttons === 1) square.classList.add('is-hovered');
        });
        flexContainer.appendChild(square);
    }
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
reset.addEventListener("click", () => {
    createGrid(curSize);
});

// INIT
createGrid(16);