import Ship from "./objects/ship.js";
import Port from "./objects/port.js";
import Parking from "./objects/parking.js";

import {
  SHIP_WIDTH,
  SHIP_GENERATION_INTERVAL,
  SHIP_STAY_TIME_IN_PORT,
  SIZE_PORT,
  OFFSET_BETWEEN_DOCKS,
} from "../constants.js";

const app = new PIXI.Application({
  width: 1000,
  height: 600,
  background: "#1099bb",
});
document.body.appendChild(app.view);

const port = new Port(app);
const parking = new Parking(SIZE_PORT + OFFSET_BETWEEN_DOCKS, 0, app);

const animate = () => {
  requestAnimationFrame(animate);
  TWEEN.update();
};

export const validationInDock = (ship, dock) => {
  dock.occupy(ship);
  setTimeout(() => {
    dock.vacate(ship);
    ship.moveToGate(port.gate);
  }, SHIP_STAY_TIME_IN_PORT);
};

export const validationInGate = (ship) => {
  const dockCondition = ship.full
    ? (dock) => !dock.occupied && !dock.capacity
    : (dock) => !dock.occupied && dock.capacity;

  const freeDock = port.docks.find(dockCondition);

  if (ship.inPort && freeDock) {
    ship.moveToDock(freeDock);
  } else if (ship.inPort && !freeDock) {
    parking.addShip(ship);
  } else {
    ship.moveToBack(app);

    if (parking.ships.length) {
      const parkingShip = parking.ships[0];
      parkingShip.moveToGate(port.gate);
      parking.removeShip(parkingShip);
      console.log("parking", parkingShip);
    }
  }
};

function generateShip() {
  const startX = app.renderer.width - SHIP_WIDTH;
  const startY = app.renderer.height / 2;

  const shipType = Math.random() < 0.5 ? "red" : "green";

  const ship = new Ship(startX, startY, shipType);
  if (shipType === "red") {
    ship.workInPort();
  }
  app.stage.addChild(ship.getGraphics());

  ship.moveToGate(port.gate);
}

animate();
generateShip();

setInterval(generateShip, SHIP_GENERATION_INTERVAL);
