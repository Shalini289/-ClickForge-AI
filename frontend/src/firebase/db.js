import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy
} from "firebase/firestore";

import { app } from "./config";

const db = getFirestore(app);

//
// ✅ SAVE THUMBNAIL
//
export const saveThumbnail = async (data, userId) => {
  try {
    await addDoc(collection(db, "thumbnails"), {
      ...data,
      userId: userId || "guest",
      createdAt: new Date()
    });
  } catch (error) {
    console.error("Save Error:", error);
  }
};

//
// ✅ GET USER-SPECIFIC HISTORY
//
export const getUserHistory = async (userId) => {
  try {
    const q = query(
      collection(db, "thumbnails"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
};

//
// ✅ GET ALL HISTORY (ADMIN / TESTING)
//
export const getAllHistory = async () => {
  try {
    const snapshot = await getDocs(collection(db, "thumbnails"));

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Fetch All Error:", error);
    return [];
  }
};

//
// ✅ DELETE THUMBNAIL
//
export const deleteThumbnail = async (id) => {
  try {
    await deleteDoc(doc(db, "thumbnails", id));
  } catch (error) {
    console.error("Delete Error:", error);
  }
};