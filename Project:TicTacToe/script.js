// Defining gameboard as a IFEE Module
const gameboard = (function () {
  let grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let flag = 0;
  let Player1;
  let Player2;

  const Player1_name = (name) => {
    Player1 = name;
  };
  const Player2_name = (name) => {
    Player2 = name;
  };

  const readGrid = (i) => {
    return grid[i];
  };

  const printGrid = () => {
    console.table(grid);
  };

  const placeMarker = (i) => {
    if (flag == 0) {
      if (grid[i] == 0) {
        flag = 1;
        showNextMove(Player2);
        grid[i] = 1;
        updateValue();
        checkWin();
      } else {
        console.log("already");
      }
    } else if (flag == 1) {
      if (grid[i] == 0) {
        flag = 0;
        showNextMove(Player1);
        grid[i] = -1;
        updateValue();
        checkWin();
      } else {
        console.log("already");
      }
    }
  };

  const reset = () => {
    grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    flag = 0;
  };

  const checkWin = () => {
    if (
      // ROWS
      grid[0] + grid[1] + grid[2] == 3 ||
      grid[3] + grid[4] + grid[5] == 3 ||
      grid[6] + grid[7] + grid[8] == 3 ||
      //COLUMS
      grid[0] + grid[3] + grid[6] == 3 ||
      grid[1] + grid[4] + grid[7] == 3 ||
      grid[2] + grid[5] + grid[8] == 3 ||
      //DIAGONALS
      grid[0] + grid[4] + grid[8] == 3 ||
      grid[6] + grid[4] + grid[2] == 3
    ) {
      console.log("O wins");
      changeWinner(Player1);
      reset();
    } else if (
      // ROWS
      grid[0] + grid[1] + grid[2] == -3 ||
      grid[3] + grid[4] + grid[5] == -3 ||
      grid[6] + grid[7] + grid[8] == -3 ||
      //COLUMS
      grid[0] + grid[3] + grid[6] == -3 ||
      grid[1] + grid[4] + grid[7] == -3 ||
      grid[2] + grid[5] + grid[8] == -3 ||
      //DIAGONALS
      grid[0] + grid[4] + grid[8] == -3 ||
      grid[6] + grid[4] + grid[2] == -3
    ) {
      console.log("X wins");
      changeWinner(Player2);
      reset();
    }
  };

  return {
    readGrid,
    printGrid,
    placeMarker,
    Player1_name,
    Player2_name,
    reset,
  };
})();

//Welcome Screen Logic

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  const overlay = document.querySelector(".overlay");
  overlay.classList.add("invis");
  gameboard.Player1_name(document.getElementById("player1").value);
  gameboard.Player2_name(document.getElementById("player2").value);
});

// Add event listener to the DOM Grid to display
const boxes = document.getElementsByClassName("boxes");

const addListeners = (() => {
  let i = 0;
  Array.from(boxes).forEach((e) => {
    e.setAttribute("id", i);
    const p = document.createElement("p");
    e.appendChild(p);
    i++;

    e.addEventListener("click", () => {
      const num = e.getAttribute("id");
      TextBox.innerText = gameboard.Player1_name + " to move";
      gameboard.placeMarker(num);
    });
  });
})();

const updateValue = () => {
  let i = 0;
  Array.from(boxes).forEach((e) => {
    const p = e.querySelector("p");
    if (gameboard.readGrid(i) == 1) {
      p.innerText = "O";
    } else if (gameboard.readGrid(i) == -1) {
      p.innerText = "X";
    } else {
      p.innerText = "";
    }
    i++;
    e.appendChild(p);
  });
};

const reset = () => {
  let i = 0;
  Array.from(boxes).forEach((e) => {
    const p = e.querySelector("p");
    gameboard.reset;
    p.innerText = "";
    i++;
    e.appendChild(p);
  });
};

// UI
const TextBox = document.querySelector(".winner").querySelector("h1");
const changeWinner = (name) => {
  TextBox.innerText = name + " Wins";
};

const showNextMove = (name) => {
  TextBox.innerText = name + " to move";
};

const fullReset = document.querySelector(".reset").querySelector("button");
fullReset.addEventListener("click", () => {
  const overlay = document.querySelector(".overlay");
  overlay.classList.remove("invis");
  reset();
});
