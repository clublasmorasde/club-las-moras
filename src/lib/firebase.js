import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Aquí pegas el objeto que copiaste en el paso 1
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos las herramientas que vamos a usar
export const db = getFirestore(app);      // Para la base de datos (Inventario/Ventas)
export const storage = getStorage(app);    // Para las fotos de los tickets