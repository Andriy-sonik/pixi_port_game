import { SIZE_GATE, PORT_COLOR, WIDTH_LINE } from "../constants.js";

export default class Gate {
  constructor(x, y) {
    this.gate = new PIXI.Graphics();
    this.gate.position.set(x, y);
    this.gate.beginFill(PORT_COLOR, 0.3);
    this.gate.drawRect(0, 0, WIDTH_LINE, SIZE_GATE);
    this.gate.endFill();
  }

  setPortContainer(portContainer) {
    portContainer.addChild(this.gate); // Додаємо gate до container
  }
}
