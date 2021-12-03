import MongoContainer from "../../containers/MongoContainer.js"

class DaoProductMongo extends MongoContainer {
  constructor(conn, model) {
    super(conn, model)
  }
}

export default DaoProductMongo