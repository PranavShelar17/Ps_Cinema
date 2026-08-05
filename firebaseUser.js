import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { db, auth } from "./firebase";


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

// Auth functions
async function signUpUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}

function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}

export {
  getProductsFromBackend,
  // getSingleProductFromBackend,
  updateBackendProduct,
  deleteBackendProduct,
  addProductToBackend,
  signUpUser,
  loginUser,
  logoutUser,
  subscribeToAuthChanges
};