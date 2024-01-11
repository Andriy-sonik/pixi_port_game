import {
  PORT_COLOR,
  SHIP_HEIGHT,
  OFFSET_BETWEEN_DOCKS,
  SHIP_WIDTH,
} from "../constants.js";

export default class Parking {
  constructor(x, y, app) {
    this.parking = new PIXI.Graphics();
    this.parking.position.set(x, y);
    this.parking.beginFill(PORT_COLOR, 0);
    this.parking.drawRect(0, 0, 400, 200);
    this.parking.endFill();
    this.ships = [];
    this.rows = 6;
    this.columns = Infinity;

    app.stage.addChild(this.parking);
  }

  addShip(ship) {
    this.ships.push(ship);
    this.updateShipLayout();
  }

  removeShip(ship) {
    const index = this.ships.indexOf(ship);
    if (index !== -1) {
      this.ships.splice(index, 1);
      this.updateShipLayout();
    }
  }

  updateShipLayout() {
    for (let i = 0; i < this.ships.length; i++) {
      const row = i % this.rows;
      const column = Math.floor(i / this.rows);

      const ship = this.ships[i];
      const x = this.parking.x + column * (SHIP_WIDTH + OFFSET_BETWEEN_DOCKS);
      const y = this.parking.y + row * (SHIP_HEIGHT + OFFSET_BETWEEN_DOCKS);

      const tween = new TWEEN.Tween({
        x: ship.getGraphics().x,
        y: ship.getGraphics().y,
      });
      tween.to({ x, y }, 1200);
      tween.onUpdate((obj) => {
        ship.getGraphics().x = obj.x;
        ship.getGraphics().y = obj.y;
      });
      tween.start();
    }
  }
}
