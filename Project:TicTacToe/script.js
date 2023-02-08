// Defining gameboard as a IFEE Module
const gameboard = (function () {
  let grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const printGrid = () => {
    console.table(grid);
  };

  const place_O = (i) => {
    if (grid[i] == 0) {
      grid[i] = 1;
      checkWin();
    } else {
      console.log("already");
    }
  };

  const place_X = (i) => {
    if (grid[i] == 0) {
      grid[i] = -1;
      checkWin();
    } else {
      console.log("already");
    }
  };

  const checkWin = () => {
    if (
      // ROWS
      grid[0] + grid[1] + grid[2] == 3 ||
      grid[3] + grid[4] + grid[5] == 3 ||
      grid[6] + grid[8] + grid[8] == 3 ||
      //COLUMS
      grid[0] + grid[3] + grid[6] == 3 ||
      grid[1] + grid[4] + grid[8] == 3 ||
      grid[2] + grid[5] + grid[8] == 3 ||
      //DIAGONALS
      grid[0] + grid[4] + grid[8] == 3 ||
      grid[6] + grid[4] + grid[2] == 3
    ) {
      console.log("O wins");
      alert("O wins");
    }

    if (
      // ROWS
      grid[0] + grid[1] + grid[2] == -3 ||
      grid[3] + grid[4] + grid[5] == -3 ||
      grid[6] + grid[8] + grid[8] == -3 ||
      //COLUMS
      grid[0] + grid[3] + grid[6] == -3 ||
      grid[1] + grid[4] + grid[8] == -3 ||
      grid[2] + grid[5] + grid[8] == -3 ||
      //DIAGONALS
      grid[0] + grid[4] + grid[8] == -3 ||
      grid[6] + grid[4] + grid[2] == -3
    ) {
      console.log("X wins");
      alert("X Wins");
    }
  };

  return { grid, printGrid, place_O, place_X };
})();

//Person

// Add event listener to the DOM Grid to display
const boxes = document.getElementsByClassName("boxes");

const addListener = (() => {
  let i = 0;
  Array.from(boxes).forEach((e) => {
    e.setAttribute("id", i);
    const p = document.createElement("p");
    e.appendChild(p);
    i++;

    e.addEventListener("click", () => {
      const num = e.getAttribute("id");
      gameboard.place_O(num);
      updateValue();
    });
  });
})();

const updateValue = () => {
  let i = 0;
  Array.from(boxes).forEach((e) => {
    const p = e.querySelector("p");
    p.innerText = gameboard.grid[i];
    i++;
    e.appendChild(p);
  });
};
