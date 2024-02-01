class UI {
  static canvas = document.getElementById('pacmanCanvas');
  static context = this.canvas.getContext('2d');

  static draw(game) {
    // Clear all
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < 32; i++) {
      for (let j = 0; j < 28; j++) {
        if (game.map[i][j].entity != null) {
          if (game.map[i][j].entity.type == "pacman") {
            // Draw pacman
            this.context.fillStyle = '#000000'; // background
            this.context.fillRect(j * 20, i * 20, 20, 20);
            this.context.fillStyle = '#FFD700'; //pacman
            this.context.beginPath();
            this.context.arc(game.map[i][j].entity.y * 20 + 10, 
              game.map[i][j].entity.x * 20 + 10, 11, 0, 2 * Math.PI);
            this.context.closePath();
            this.context.fill();
          }
          else {
            // Draw ghosts
            this.context.fillStyle = '#000000';
            this.context.fillRect(j * 20, i * 20, 20, 20);
            this.context.fillStyle = '#FF0000';
            this.context.beginPath();
            this.context.arc(game.map[i][j].entity.y * 20 + 10, 
              game.map[i][j].entity.x * 20 + 10, 11, 0, 2 * Math.PI);
            this.context.closePath();
            this.context.fill();
          }
        }
        else if (game.map[i][j].type == "wall") {
          this.context.fillStyle = '#0000FF';
          this.context.fillRect(j * 20, i * 20, 20, 20);
        }
        else if (game.map[i][j].type == "point") {
          this.context.fillStyle = '#000000';
          this.context.fillRect(j * 20, i * 20, 20, 20);
          this.context.fillStyle = '#ebcf34';
          this.context.beginPath();
          this.context.arc(j * 20 + 10, i * 20 + 10, 3, 0, 2 * Math.PI);
          this.context.closePath();
          this.context.fill();
        }
        else if (game.map[i][j].type == "empty") {
          this.context.fillStyle = '#000000';
          this.context.fillRect(j * 20, i * 20, 20, 20);
        }
      }
    }

    if (!game.gameActive) {
      this.context.font = "34px serif";
      this.context.fillStyle = "#ff0000";
      this.context.fillText("Game over", 205, 300);
    }
  }

  static handleUserInput(game) {
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
          game.keyPressed("up");
          break;
        case 'ArrowDown':
          game.keyPressed("down");
          break;
        case 'ArrowLeft':
          game.keyPressed("left");
          break;
        case 'ArrowRight':
          game.keyPressed("right");
          break;
      }
    });
  }
}

function gameLoop() {
  game.playRound();
  UI.draw(game);
  if (!game.gameActive)
    clearInterval(timerId);
}

const game = new Game();
UI.handleUserInput(game);
let timerId = setInterval(gameLoop, 200);
