class PacMan extends Entity {
  constructor(map, x, y) {
    super();
    this.game = map;
    this.type = "pacman";
    this.x = x;
    this.y = y;
  }

  play() {
    // Find the neighboring blocks that pacman can move to
    let candidateBlocks = [];
    for (let i = this.x - 1; i <= this.x + 1; i++) {
      for (let j = this.y - 1; j <= this.y + 1; j++) {
        if (i >= 0 && i < game.sizeX
          && j >= 0 && j < game.sizeY
          && !(i == this.x && j == this.y)
          && game.map[i][j].type != "wall") {
          candidateBlocks.push({ x: i, y: j });
        }
      }
    }

    // Move to a block according to pacman's direction
    if (this.direction == "up"
      && (candidateBlocks
        .find(p => (p.x == this.x - 1 && p.y == this.y))) != null) {
      if (game.map[this.x - 1][this.y].entity != null)
        game.gameActive = false;
      this.move(this.x - 1, this.y);
    }
    else if (this.direction == "right"
      && (candidateBlocks
        .find(p => (p.x == this.x && p.y == this.y + 1))) != null) {
      if (game.map[this.x][this.y + 1].entity != null)
        game.gameActive = false;
      this.move(this.x, this.y + 1);
    }
    else if (this.direction == "down"
      && (candidateBlocks
        .find(p => (p.x == this.x + 1 && p.y == this.y))) != null) {
      if (game.map[this.x + 1][this.y].entity != null)
        game.gameActive = false;
      this.move(this.x + 1, this.y);
    }
    else if (this.direction == "left"
      && (candidateBlocks
        .find(p => (p.x == this.x && p.y == this.y - 1))) != null) {
      if (game.map[this.x][this.y - 1].entity != null)
        game.gameActive = false;
      this.move(this.x, this.y - 1);
    }

    // Update pacman location
    game.pacmanLocation.x = this.x;
    game.pacmanLocation.y = this.y;

    // Pick up point - remove it from the maze
    if (game.map[this.x][this.y].type == "point") {
      game.map[this.x][this.y].type = "empty";
      game.pointsLeft--;
      if (game.pointsLeft == 0)
        game.gameActive = false;
    }
  }
}
