class Ghost extends Entity {
  constructor(map, x, y) {
    super();
    this.game = map;
    this.type = "ghost";
    this.x = x;
    this.y = y;
  }

  play() {
    // Neighboring block to move to
    let candidateBlocks = [];
    // Distance to pacman from the respective neighbor block
    let distanceToPacman = [];

    for (let i = this.x - 1; i <= this.x + 1; i++)
      for (let j = this.y - 1; j <= this.y + 1; j++) {
        if (i >= 0 && i < game.sizeX
          && j >= 0 && j < game.sizeY
          && !(i == this.x && j == this.y)
          && game.map[i][j].type != "wall") {
          candidateBlocks.push({ x: i, y: j });
          distanceToPacman
            .push(Math.sqrt(Math.pow(i - game.pacmanLocation.x, 2)
              + Math.pow(j - game.pacmanLocation.y, 2)));
        }
      }

    // Get block with the minimum distance to pacman
    let minDistIn = distanceToPacman.indexOf(Math.min(...distanceToPacman));

    if (game.map[candidateBlocks[minDistIn].x][candidateBlocks[minDistIn].y]
        .entity != null) {
      //move only if pacman is there
      if (game.map[candidateBlocks[minDistIn].x][candidateBlocks[minDistIn].y]
          .entity.type == "pacman") {
        //eat pacman
        game.map[candidateBlocks[minDistIn].x][candidateBlocks[minDistIn].y]
          .entity = null;
        game.gameActive = false;
        this.move(candidateBlocks[minDistIn].x, candidateBlocks[minDistIn].y);
      }
    }
    else {
      this.move(candidateBlocks[minDistIn].x, candidateBlocks[minDistIn].y);
    }
  }
}