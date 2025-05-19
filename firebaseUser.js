import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";


async function getProductsFromBackend() {
  const response = await getDocs(collection(db, "products"));
  let list = [];
  response.forEach((doc) => {
    let obj = { ...doc.data() };
    obj.id = doc.id;
    list.push(obj);
  });
  return list;
}
// async function getSingleProductFromBackend(id) {
//   const docSnap = await getDoc(doc(db, "products", id));
//   if (docSnap.exists()) {
//     console.log(docSnap.data());
//     return docSnap.data();
//   } else {
//     return null;
//   }
// }
async function updateBackendProduct(p) {
  const productRef = doc(db, "products", p.id);
  await updateDoc(productRef, p);
}
async function deleteBackendProduct(product) {
  await deleteDoc(doc(db, "products", product.id));
}

async function addProductToBackend(product) {
  const productRef = await addDoc(collection(db, "products"),product);
  console.log("Document written with ID: ", productRef.id);
  product.id = productRef.id;
  return product;
}

export {
  getProductsFromBackend,
  // getSingleProductFromBackend,
  updateBackendProduct,
  deleteBackendProduct,
  addProductToBackend,
};