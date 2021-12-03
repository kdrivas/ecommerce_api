import DaoBasketFile from "./daoBasketFile.js";
import DaoBasketMemory from "./DaoBasketMemory.js";
import DaoBasketMongo from "./DaoBasketMongo.js";

import basketModel from "../../models/basket.js";

import { bdType, configBD } from "../../config.js";

let DaoBasket

if (bdType == 'MEM')
  DaoBasket = new DaoBasketMemory()
else if (bdType == 'FILE')
  DaoBasket = new DaoBasketFile(configBD['FILE'])
else if (bdType == 'MONGO')
  DaoBasket = new DaoBasketMongo(configBD['MONGO'], basketModel)

export default DaoBasket
