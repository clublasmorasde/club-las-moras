import React, { useState } from 'react';
import { ShoppingCart, Send, Plus, Minus, User } from 'lucide-react';

const PRODUCTOS = [
  { id: 1, nombre: 'Gaseosa 1.5L', precio: 1500, emoji: '🥤' },
  { id: 2, nombre: 'Carbón 4kg', precio: 2200, emoji: '🔥' },
  { id: 3, nombre: 'Cerveza Lata', precio: 1200, emoji: '🍺' },
  { id: 4, nombre: 'Hielo Bolsa', precio: 800, emoji: '🧊' }
];

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [nombre, setNombre] = useState("");

  const agregar = (p) => {
    const existe = carrito.find(item => item.id === p.id);
    if (existe) {
      setCarrito(carrito.map(item => item.id === p.id ? {...item, cant: item.cant + 1} : item));
    } else {
      setCarrito([...carrito, { ...p, cant: 1 }]);
    }
  };

  const total = carrito.reduce((acc, p) => acc + (p.precio * p.cant), 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans text-slate-900">
      <header className="py-8 text-center">
        <h1 className="text-3xl font-black text-green-700 uppercase tracking-tighter">Club Las Moras 🌿</h1>
        <p className="text-slate-400 font-bold text-xs mt-1">PROVEEDURÍA DIGITAL</p>
      </header>

      <main className="max-w-md mx-auto space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {PRODUCTOS.map(p => (
            <div key={p.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center">
              <span className="text-4xl mb-2">{p.emoji}</span>
              <span className="font-bold text-slate-700">{p.nombre}</span>
              <span className="text-green-600 font-black mb-4">${p.precio}</span>
              <button onClick={() => agregar(p)} className="bg-slate-900 text-white p-3 rounded-2xl shadow-lg active:scale-95 transition-transform">
                <Plus size={20} />
              </button>
            </div>
          ))}
        </div>

        {carrito.length > 0 && (
          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-green-50 animate-bounce-in">
            <h2 className="font-black text-xl mb-4 flex items-center gap-2 italic"><ShoppingCart /> TU PEDIDO</h2>
            <input 
              placeholder="Tu nombre de socio" 
              className="w-full p-4 bg-slate-50 rounded-2xl mb-4 border-none outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setNombre(e.target.value)}
            />
            <div className="text-2xl font-black text-center py-4 text-green-700">TOTAL: ${total}</div>
            <button className="w-full bg-green-600 text-white py-5 rounded-2xl font-black shadow-lg shadow-green-200 uppercase tracking-widest">
              Enviar Pedido
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
