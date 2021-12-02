import DaoProductFile from "./daoProductFile.js";
import DaoProductMemory from "./daoProductMemory.js";
import { bdType, configBD } from "../../config.js";

let DaoProduct = null

if (bdType == 'MEM')
  DaoProduct = new DaoProductMemory()
else if (bdType == 'FILE')
  DaoProduct = new DaoProductFile(configBD['FILE'])

export default DaoProduct
