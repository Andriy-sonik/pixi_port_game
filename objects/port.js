import Dock from "./dock.js";
import Fence from "./fence.js";
import Gate from "./gate.js";

import {
  OFFSET_BETWEEN_DOCKS,
  HEIGHT_DOCK,
  SIZE_PORT,
  NUMBER_DOCKS,
  SIZE_GATE,
} from "../constants.js";

export default class Port {
  constructor(app) {
    this.portContainer = new PIXI.Container();
    this.docks = [];
    this.gate = null;

    // Додавання доків
    for (let i = 0; i < NUMBER_DOCKS; i++) {
      const dock = new Dock(0, (HEIGHT_DOCK + OFFSET_BETWEEN_DOCKS) * i);
      dock.setPortContainer(this.portContainer);
      this.docks.push(dock);
    }

    // Додавання воріт
    const centerHeight = (app.renderer.height - SIZE_GATE) / 2;
    this.gate = new Gate(SIZE_PORT, centerHeight);
    this.gate.setPortContainer(this.portContainer);

    const fenceTop = new Fence(SIZE_PORT, 0, 5, centerHeight);
    const fenceBottom = new Fence(
      SIZE_PORT,
      app.renderer.height - centerHeight,
      5,
      centerHeight
    );
    fenceTop.setPortContainer(this.portContainer);
    fenceBottom.setPortContainer(this.portContainer);

    app.stage.addChild(this.portContainer);
  }
}
