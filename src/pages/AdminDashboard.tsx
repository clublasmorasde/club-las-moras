import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, onSnapshot, doc, updateDoc, increment, addDoc, writeBatch } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import * as XLSX from 'xlsx';

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "productos"), (snapshot) => {
      const p = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductos(p);
    });
    return () => unsubscribe();
  }, []);

  const registrarCompra = async (producto: any) => {
    const cantidadStr = prompt(`¿Cuántas unidades de ${producto.nombre} compraste?`);
    if (!cantidadStr) return;

    try {
      setLoading(true);
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64
      });

      const storageRef = ref(storage, `tickets/${Date.now()}.jpg`);
      await uploadString(storageRef, image.base64String!, 'base64');
      const photoURL = await getDownloadURL(storageRef);

      const prodRef = doc(db, "productos", producto.id);
      await updateDoc(prodRef, { stock: increment(parseInt(cantidadStr)) });

      await addDoc(collection(db, "compras_tickets"), {
        productoId: producto.id,
        nombre: producto.nombre,
        cantidad: parseInt(cantidadStr),
        fotoTicket: photoURL,
        fecha: new Date()
      });
      alert("¡Stock y Ticket guardados!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        setLoading(true);
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const data: any[] = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        const batch = writeBatch(db);
        data.forEach((fila) => {
          if (fila.id && fila.cantidad !== undefined) {
            const ref = doc(db, "productos", fila.id.toString());
            batch.update(ref, { stock: fila.cantidad });
          }
        });
        await batch.commit();
        alert("¡Inventario actualizado desde Excel!");
      } catch (err) {
        alert("Error al procesar el Excel");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-black uppercase italic text-primary-950 mb-8">Panel de Control</h2>
      
      <div className="bg-white p-6 rounded-3xl border-2 border-dashed border-slate-300 mb-8 text-center">
        <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">Actualización Masiva</p>
        <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} className="text-xs" />
      </div>

      <div className="grid gap-4">
        {productos.map((prod: any) => (
          <div key={prod.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800">{prod.nombre}</h3>
              <p className="text-xs text-slate-500 font-mono">Stock: {prod.stock}</p>
            </div>
            <button onClick={() => registrarCompra(prod)} className="bg-slate-100 p-3 rounded-xl hover:bg-accent-600 transition-colors">
              📸
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;git add .