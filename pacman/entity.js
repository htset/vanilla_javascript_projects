class Entity {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.direction = "left";
    this.type = null;
    this.game = null;
  }

  move(newX, newY) {
    game.map[newX][newY].entity = game.map[this.x][this.y].entity;
    game.map[this.x][this.y].entity = null;
    this.x = newX;
    this.y = newY;
  }
}