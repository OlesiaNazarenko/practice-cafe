import menu from "./db/menu.js";
import tables from "./db/tables.js";
import workers from "./db/workers.js";

class Cafe {
    constructor({ menu, tables, workers }) {
        this.menu = menu;
        this.tables = tables;
        this.workers = workers;
    }
    getPresentWorkers() {
        this.presentWorkers = this.workers.filter((worker) => worker.isPresent );
    }
    checkTables() {
        this.getPresentWorkers();
        this.tables.forEach((table, idx) => {
            const workerIndex = idx % this.presentWorkers.length;
             table.service = this.presentWorkers[workerIndex].name;
            this.presentWorkers[workerIndex].tables.push(table.table);
        });
    }
    getOrder(tableNum, dishID, quantity) {
        const currTable = this.findTable(tableNum);

        if (!currTable.currentOrder) {
            currTable.currentOrder = {};
        }
        if (currTable.currentOrder[dishID]) {
            return currTable.currentOrder[dishID] += quantity;
        }
        currTable.currentOrder = {...currTable.currentOrder, [dishID]: quantity };
    }
    findTable(tableNum) {
        return this.tables.find((table) => table.table === tableNum)
    }
    addDish(tableNum, dishID) {
        const currTable = this.findTable(tableNum);

        if (!currTable.currentOrder) {
            currTable.currentOrder = {};
        }
        if (currTable.currentOrder[dishID]) {
            return currTable.currentOrder[dishID] += 1;
        }
        currTable.currentOrder = {...currTable.currentOrder, [dishID]: 1 };
    }
    removeDish(tableNum, dishID) {
        const currTable = this.findTable(tableNum);
        if (!currTable.currentOrder || !currTable.currentOrder[dishID]) return;
        currTable.currentOrder[dishID] -= 1;
        currTable.currentOrder = { ...currTable.currentOrder, [dishId]: 0 };
    }
     resetDish(tableNum, dishID) {
        const curTable = this.findTable(tableNum);
        if (!curTable.currentOrder) return;
        if (!curTable.currentOrder[dishID]) return;
        delete curTable.currentOrder[dishID];

    }
    findDish(dishId) {
        this.menu.find(dish => dish.id === dishId);
    }
    prepeareDish(tableNum) {
        const currTable = this.findTable(tableNum);
        if (!currTable.currentOrder) return;
        const menuMap = this.setmenuMap();
        const res = Object.entries(currTable.currentOrder);
        const newRes = res.map(([dishId, quantity]) => `${menuMap[dishId].name} - ${quantity}`);
        currTable.prepearing = newRes;
    }
    setmenuMap() {
        const menuMap = menu.reduce((acc, el) => { acc[el.id] = el; return acc; }, {});
        return menuMap;
    }
    dishFinish(tableNum, dishName, quantity) {
  const currTable = this.findTable(tableNum);
        currTable.prepearing = currTable.prepearing.map( el => {
            const [name, quant] = el.split(" - ")
            if (name === dishName) {
                const newQuantity = Number(quant) - quantity;
                return name + " - " + newQuantity;
             }
            return el;
        }).filter(el => Number(el.split(" - ")[1]) > 0)
    }
    removeDishFinish(tableNum, dishName, quantity) {
    const curTable = this.findTable(tableNum);
    console.log(curTable);
    curTable.prepearing = curTable.prepearing
      .map((el) => {
        const [name, quant] = el.split(' - ');
        if (name === dishName) {
          const newQuantity = Number(quant) - quantity;
          return name + ' - ' + newQuantity;
        }
        return el;
      })
      .filter((el) => Number(el.split(' - ')[1]) > 0);
    }
   
}

const cafe = new Cafe({ menu, tables, workers });
export default cafe;