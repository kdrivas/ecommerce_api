import DaoBasketFile from "./daoBasketFile.js";
import DaoBasketMemory from "./DaoBasketMemory.js";
import { bdType, configBD } from "../../config.js";

let DaoBasket

if (bdType == 'MEM')
  DaoBasket = new DaoBasketMemory()
else if (bdType == 'FILE')
  DaoBasket = new DaoBasketFile(configBD['FILE'])

export default DaoBasket
