import DaoBasketFile from "./daoBasketFile.js";
import DaoBasketMemory from "./DaoBasketMemory.js";
import { bdType, configBD } from "../../config.js";

if (bdType == 'MEM')
  DaoBasket = DaoBasketFile(configBD['MEM'])
else if (bdType == 'MEM')
  DaoBasket = DaoBasketMemory(configBD['MEM'])

export default DaoBasket
