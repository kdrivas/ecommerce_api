import DaoProductFile from "./daoProductFile.js";
import DaoProductMemory from "./daoProductMemory.js";
import DaoProductMongo from "./DaoProductMongo.js";

import productModel from "../../models/product.js";

import { bdType, configBD } from "../../config.js";

let DaoProduct = null

if (bdType == 'MEM')
  DaoProduct = new DaoProductMemory()
else if (bdType == 'FILE')
  DaoProduct = new DaoProductFile(configBD['FILE'])
else if (bdType == 'MONGO'){
  DaoProduct = new DaoProductMongo(configBD['MONGO'], productModel)
  await DaoProduct.init()
}

export default DaoProduct
