import {
  WIDTH_DOCK,
  HEIGHT_DOCK,
  PORT_COLOR,
  WIDTH_LINE,
} from "../constants.js";

export default class Dock {
  constructor(x, y) {
    this.dock = new PIXI.Graphics();
    this.dock.x = x;
    this.dock.y = y;
    this.occupied = false;
    this.setColor();
    this.capacity = false;
    this.currentShip = null;
  }

  occupy(ship) {
    if (!this.occupied) {
      this.occupied = true;
      this.capacity = ship.full;
      this.setColor();
      this.currentShip = ship;
      this.currentShip.loadCargo(this);
    }
  }

  vacate() {
    if (this.occupied) {
      this.occupied = false;
      this.setColor();
      // this.currentShip.unloadCargo();
      this.currentShip = null;
    }
  }

  setColor() {
    const alpha = this.capacity ? 1 : 0;
    this.dock.clear();
    this.dock.beginFill(PORT_COLOR, alpha);
    this.dock.lineStyle(WIDTH_LINE, PORT_COLOR);
    this.dock.drawRect(0, 0, WIDTH_DOCK, HEIGHT_DOCK);
    this.dock.endFill();
  }

  setPortContainer(portContainer) {
    portContainer.addChild(this.dock);
  }
}
