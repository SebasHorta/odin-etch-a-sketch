// DOM ELEMENTS
const flexContainer = document.querySelector(".flex-container");
const sizeInput = document.querySelector("#size");
const submit = document.querySelector("#submit");

function createGrid(size) {
    flexContainer.textContent = "";
    const squareSize = `${100 / size}%`;
    for (let i = 0; i < size ** 2; i++) {
        const square = document.createElement("div");
        square.style.width = squareSize;
        square.style.height = squareSize;
        square.classList.add("square");
        flexContainer.appendChild(square);
    }
}

function handleSubmit() {
    const size = Number(sizeInput.value);
    if (!Number.isInteger(size) ||
        size < 1 ||
        size > 100) return;
    createGrid(size);
}

submit.addEventListener("click", handleSubmit);
sizeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSubmit();
});

createGrid(16);