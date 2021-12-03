import FirestoreContainer from "../../containers/FirebaseContainer.js"

class DaoProductFirestore extends FirestoreContainer {
  constructor(conn, collection) {
    super(conn, collection)
  }
}

export default DaoProductFirestore
