document.addEventListener("DOMContentLoaded", async function() {
    const grid = document.getElementById("grid");
    const size = 100;
    const cells = [];
    let startSet = false;
    let finishSet = false;

    // Create the grid
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        grid.appendChild(cell);
        cells.push(cell);
    }

    // Maze generation using Depth-First Search with delay
    async function generateMaze(x, y) {
        const directions = [
            { dx: 0, dy: -1 }, // up
            { dx: 1, dy: 0 },  // right
            { dx: 0, dy: 1 },  // down
            { dx: -1, dy: 0 }  // left
        ];

        shuffle(directions);

        for (const { dx, dy } of directions) {
            const nx = x + dx * 2;
            const ny = y + dy * 2;

            if (nx >= 0 && ny >= 0 && nx < size && ny < size && cells[ny * size + nx].classList.contains("cell")) {
                cells[ny * size + nx].classList.remove("cell");
                cells[ny * size + nx].classList.add("path");
                cells[(y + dy) * size + (x + dx)].classList.remove("cell");
                cells[(y + dy) * size + (x + dx)].classList.add("path");
                 // Pause for 50 milliseconds
                await generateMaze(nx, ny);
            }
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Add event listeners to mark start and finish points
    cells.forEach(cell => {
        cell.addEventListener("click", function() {
            if (!startSet) {
                cell.style.backgroundColor = "red";
                startSet = true;
            } else if (!finishSet) {
                cell.style.backgroundColor = "green";
                finishSet = true;
            }
        });
    });

    // Start maze generation from the top-left corner
    cells[0].classList.remove("cell");
    cells[0].classList.add("path");
    await generateMaze(0, 0);
});
