import cafe from "./classCafe.js"
import createOrderList from './orderList.js';
import tablesTmp from "./../templates/table-tmp.hbs"
import { handleCloseList }  from "./orderList.js";

const refs = {
    body: document.body,
    servicePanel: document.createElement('section'),
    tableList: document.createElement('ul'),
};
refs.servicePanel.insertAdjacentElement("afterbegin", refs.tableList);
refs.body.insertAdjacentElement("afterbegin", refs.servicePanel);
cafe.checkTables();
const tables = cafe.presentWorkers[0].tables;

const getTableMarckup = tablesTmp({ tables: tables })

const handleOpenOrder = (e) => {
    if (e.target.nodeName !== 'BUTTON') return;
  const item = e.target.closest('li');
  const tableNum = item.dataset.id;

  handleCloseList(refs.servicePanel);

  createOrderList(tableNum, refs.servicePanel);
};
refs.tableList.insertAdjacentHTML("afterbegin", getTableMarckup);

refs.tableList.addEventListener("click", handleOpenOrder);