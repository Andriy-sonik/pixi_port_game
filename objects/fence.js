export default class Fence {
  constructor(x, y, width = 5, height = 100) {
    this.fence = new PIXI.Graphics();
    this.fence.beginFill(0x00ffcc33);
    this.fence.drawRect(x, y, width, height);
    this.fence.endFill();
  }

  setPortContainer(container) {
    this.container = container;
    container.addChild(this.fence); // Додаємо fence до container
  }
}
