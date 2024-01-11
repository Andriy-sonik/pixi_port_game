import {
  SHIP_WIDTH,
  SHIP_HEIGHT,
  SHIP_COLORS,
  OFFSET_BETWEEN_DOCKS,
  WIDTH_DOCK,
  HEIGHT_DOCK,
} from "../constants.js";
import { validationInGate, validationInDock } from "../index.js";

export default class Ship {
  constructor(x, y, type) {
    this.shipGraphics = new PIXI.Graphics();
    this.shipGraphics.x = x;
    this.shipGraphics.y = y;
    this.type = type;
    this.full = false;
    this.inPort =
      (this.full && this.type === "red") ||
      (!this.full && this.type === "green");

    this.changeFill();
  }

  workInPort() {
    this.full = !this.full;
    this.inPort =
      (this.full && this.type === "red") ||
      (!this.full && this.type === "green");

    this.changeFill();
  }

  // Додати метод для зміни заливки
  changeFill() {
    const alpha = this.full ? 1 : 0;
    const fillColor = this.full
      ? this.type === "red"
        ? SHIP_COLORS.RED
        : SHIP_COLORS.GREEN
      : 0x00ffffff;
    const lineColor = this.type === "red" ? SHIP_COLORS.RED : SHIP_COLORS.GREEN;
    this.shipGraphics.clear();
    this.shipGraphics.beginFill(fillColor, alpha);
    this.shipGraphics.lineStyle(2, lineColor);
    this.shipGraphics.drawRect(0, 0, SHIP_WIDTH, SHIP_HEIGHT); // Розміри корабля
    this.shipGraphics.endFill();
  }

  // Метод для руху корабля
  move(posX, posY, callback) {
    const position = { x: this.shipGraphics.x, y: this.shipGraphics.y };
    const tween = new TWEEN.Tween(position);
    tween.to({ x: posX, y: posY }, 1000);
    tween.onUpdate(() => {
      this.shipGraphics.x = position.x;
      this.shipGraphics.y = position.y;
    });
    tween.onComplete(() => {
      if (typeof callback === "function") {
        callback(this);
      }
    });
    tween.start();
  }

  moveToGate({ gate }) {
    this.move(
      gate.x + OFFSET_BETWEEN_DOCKS,
      gate.y + (gate.height - SHIP_HEIGHT) / 2,
      (ship) => validationInGate(ship)
    );
  }

  moveToDock(dock) {
    this.move(
      dock.dock.x + WIDTH_DOCK,
      dock.dock.y + (HEIGHT_DOCK - SHIP_HEIGHT) / 2,
      (ship) => validationInDock(ship, dock)
    );
  }

  moveToBack(app) {
    this.move(
      app.renderer.width - SHIP_WIDTH,
      app.renderer.height / 2 + SHIP_HEIGHT,
      (ship) => app.stage.removeChild(ship.getGraphics())
    );
  }

  loadCargo(dock) {
    this.workInPort();
  }

  unloadCargo() {
    this.workInPort();
  }

  // Метод для отримання графічного представлення корабля
  getGraphics() {
    return this.shipGraphics;
  }
}
