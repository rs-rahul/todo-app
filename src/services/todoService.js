import { firebaseConfig } from "../../config/firebase";

import { COLLECTION } from "../constants/collection";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const getTodos = () => {
  return db
    .collection(COLLECTION.TODOS)
    .get()
    .then((querySnapshot) => querySnapshot.docs);
};

export const addTodo = (todo) => {
  return db.collection(COLLECTION.TODOS).add({ ...todo });
};

export const deleteTodo = (id) => {
  return db.collection(COLLECTION.TODOS).doc(id).delete();
};
