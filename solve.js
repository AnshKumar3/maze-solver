document.addEventListener("DOMContentLoaded", function() {
    const grid = document.getElementById("grid");
    const size = 100;
    const cells = Array.from(grid.children);
    let startCell, finishCell;

    // Function to find the start and finish cells
    function findStartAndFinishCells() {
        cells.forEach(cell => {
            if (cell.style.backgroundColor === "red") {
                startCell = cell;
            } else if (cell.style.backgroundColor === "green") {
                finishCell = cell;
            }
        });
    }

    // Solve the maze using BFS with delay
    async function solveMaze(start, finish) {
        const queue = [];
        const visited = new Set();
        const parentMap = new Map();

        queue.push(start);
        visited.add(start);

        while (queue.length > 0) {
            const current = queue.shift();

            if (current === finish) {
                await reconstructPath(finish, parentMap);
                return;
            }

            const neighbors = getNeighbors(current);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor) && neighbor.classList.contains("path")) {
                    queue.push(neighbor);
                    visited.add(neighbor);
                    parentMap.set(neighbor, current);
                    neighbor.style.backgroundColor = "blue"; // Mark as visited
                    await delay(0.1); // Pause for 50 milliseconds
                }
            }
        }

        alert("No path found!");
    }

    function getNeighbors(cell) {
        const index = cells.indexOf(cell);
        const x = index % size;
        const y = Math.floor(index / size);
        const neighbors = [];

        if (x > 0) neighbors.push(cells[index - 1]); // left
        if (x < size - 1) neighbors.push(cells[index + 1]); // right
        if (y > 0) neighbors.push(cells[index - size]); // up
        if (y < size - 1) neighbors.push(cells[index + size]); // down

        return neighbors;
    }

    async function reconstructPath(finish, parentMap) {
        let current = finish;
        while (current) {
            current.style.backgroundColor = "blue";
            current = parentMap.get(current);
            await delay(50); // Pause for 50 milliseconds
        }
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Add event listener to the button
    document.getElementById("solveButton").addEventListener("click", function() {
        findStartAndFinishCells();
        if (startCell && finishCell) {
            solveMaze(startCell, finishCell);
        } else {
            alert("Please set both start (red) and finish (green) points.");
        }
    });
});
