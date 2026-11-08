// Helper untuk membaca progres siswa dari Cloud Firestore.
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

// Menggunakan aplikasi Firebase yang sudah diinisialisasi oleh firebase.js.
const app = getApps()[0];
const db = getFirestore(app);
export async function getStudent(uid) {
  const snap = await getDoc(doc(db, "students", uid));
  return snap.exists() ? snap.data() : null;
}