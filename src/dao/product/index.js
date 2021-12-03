import DaoProductFile from "./daoProductFile.js";
import DaoProductMemory from "./daoProductMemory.js";
import DaoProductMongo from "./DaoProductMongo.js";
import DaoProductFirestore from "./DaoProductFirebase.js";

import productModel from "../../models/product.js";

import { bdType, configBD } from "../../config.js";

let DaoProduct = null

if (bdType == 'MEM')
  DaoProduct = new DaoProductMemory()
else if (bdType == 'FILE')
  DaoProduct = new DaoProductFile(configBD['FILE'] + 'products.json')
else if (bdType == 'MONGO'){
  DaoProduct = new DaoProductMongo(configBD['MONGO'], productModel)
  await DaoProduct.init()
}
else if (bdType == 'FIREBASE')
  DaoProduct = new DaoProductFirestore(configBD['FIREBASE'], 'products')

export default DaoProduct
