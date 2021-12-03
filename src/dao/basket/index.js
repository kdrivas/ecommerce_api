import DaoBasketFile from "./daoBasketFile.js";
import DaoBasketMemory from "./DaoBasketMemory.js";
import DaoBasketMongo from "./DaoBasketMongo.js";
import DaoBasketFirebase from "./DaoBasketFirebase.js";

import basketModel from "../../models/basket.js";

import { bdType, configBD } from "../../config.js";

let DaoBasket

if (bdType == 'MEM')
  DaoBasket = new DaoBasketMemory()
else if (bdType == 'FILE')
  DaoBasket = new DaoBasketFile(configBD['FILE'] + 'baskets.json')
else if (bdType == 'MONGO')
  DaoBasket = new DaoBasketMongo(configBD['MONGO'], basketModel)
else if (bdType == 'FIREBASE')
  DaoBasket = new DaoBasketFirebase(configBD['FIREBASE'], 'baskets')

export default DaoBasket
