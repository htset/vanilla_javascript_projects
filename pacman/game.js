class Block {
  constructor(type, entity) {
    history.type = type;
    this.entity = entity;
  }
}

class Game {
  constructor() {
    this.map = [];
    this.sizeX = 32;
    this.sizeY = 28;
    this.gameActive = true;
    this.pacmanLocation = null;
    this.pointsLeft = 0;
    this.player = [];

    // Construct maze
    for (let i = 0; i < 32; i++) {
      let line = matrix[i];
      this.map[i] = [];

      for (let j = 0; j < 28; j++) {
        this.map[i].push(new Block());

        this.map[i][j].entity = null;

        if (line[j] == '.') {
          this.map[i][j].type = "point";
          this.pointsLeft++;
        }
        else if (line[j] == '*')
          this.map[i][j].type = "wall";
        if (line[j] == ' ')
          this.map[i][j].type = "empty";
      }
    }

    // Create players
    this.player.push(new PacMan(this, 23, 13));
    this.map[23][13].entity = this.player[0];
    this.pacmanLocation = { x: 23, y: 13 };

    this.player.push(new Ghost(this, 5, 5));
    this.map[5][5].entity = this.player[1];

    this.player.push(new Ghost(this, 5, 20));
    this.map[5][20].entity = this.player[2];

    this.player.push(new Ghost(this, 8, 5));
    this.map[8][5].entity = this.player[3];
  }

  // Update pacman's direction
  keyPressed(key) {
    console.log("Key pressed: " + key);
    this.player[0].direction = key;
  }

  // Play round on every tick
  playRound() {
    for (let i = 0; i < 4; i++)
    this.player[i].play();
  }
}
