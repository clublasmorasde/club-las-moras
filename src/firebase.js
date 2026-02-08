import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // PEGA AQUÍ TUS DATOS DE LA CONSOLA
};

const app = initializeApp(firebaseConfig);

// Exportamos las herramientas para usarlas en Shop.jsx y App.jsx
export const db = getFirestore(app);      // Base de datos (Inventario y Ventas)
export const storage = getStorage(app);    // Almacén de fotos (Tickets de compra)