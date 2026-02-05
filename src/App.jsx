import React, { useState, useEffect } from 'react';
import { ShoppingCart, Send, Plus, Minus, User, MapPin, Home, Coffee } from 'lucide-react';

const PRODUCTOS = [
  // --- PROVEEDURÍA ---
  { id: 1, cat: 'Proveeduría', nombre: 'Gaseosa 1.5L', precio: 1500, emoji: '🥤' },
  { id: 2, cat: 'Proveeduría', nombre: 'Carbón 4kg', precio: 2200, emoji: '🔥' },
  { id: 3, cat: 'Proveeduría', nombre: 'Cerveza Lata', precio: 1200, emoji: '🍺' },
  { id: 4, cat: 'Proveeduría', nombre: 'Hielo Bolsa', precio: 800, emoji: '🧊' },
  
  // --- INSTALACIONES ---
  { id: 10, cat: 'Instalaciones', nombre: 'Alquiler Cancha Padel', precio: 5000, emoji: '🎾' },
  { id: 11, cat: 'Instalaciones', nombre: 'Alquiler Cancha Fútbol', precio: 8000, emoji: '⚽' },
  { id: 12, cat: 'Instalaciones', nombre: 'Alquiler Quincho', precio: 15000, emoji: '🏡' },
  { id: 13, cat: 'Instalaciones', nombre: 'Salón de Eventos', precio: 45000, emoji: '🎉' }
];

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [nombre, setNombre] = useState(localStorage.getItem('nombreSocio') || "");
  const [notas, setNotas] = useState("");

  const agregar = (p) => {
    const existe = carrito.find(item => item.id === p.id);
    if (existe) {
      setCarrito(carrito.map(item => item.id === p.id ? {...item, cant: item.cant + 1} : item));
    } else {
      setCarrito([...carrito, { ...p, cant: 1 }]);
    }
  };

  const quitar = (id) => {
    const item = carrito.find(i => i.id === id);
    if (item?.cant > 1) {
      setCarrito(carrito.map(i => i.id === id ? {...i, cant: i.cant - 1} : i));
    } else {
      setCarrito(carrito.filter(i => i.id !== id));
    }
  };

  const total = carrito.reduce((acc, p) => acc + (p.precio * p.cant), 0);

  const enviarPedido = () => {
    if (!nombre) return alert("Por favor, ingresa tu nombre de socio");
    const texto = `🌿 *Club Las Moras*\n👤 *Socio:* ${nombre}\n---\n🛒 *Pedido:*\n${carrito.map(i => `• ${i.cant}x ${i.nombre}`).join('\n')}\n---\n💰 *TOTAL:* $${total}`;
    window.open(`https://wa.me/5491123456789?text=${encodeURIComponent(texto)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* HEADER CON LOGO */}
      <header className="bg-white p-6 text-center shadow-sm border-b border-slate-100 sticky top-0 z-20">
        <div className="flex flex-col items-center gap-2">
          {/* Si tienes una URL de logo, reemplaza 'https://via.placeholder.com/80' por tu link */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-green-600">
             <span className="text-3xl font-bold text-green-700 italic text-center">LM</span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">Club Las Moras</h1>
          <div className="bg-green-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">
            Tienda & Reservas
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-8">
        {/* IDENTIFICACIÓN */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Identificación del Socio</label>
          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre y Apellido"
              className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-green-500 outline-none font-bold"
            />
          </div>
        </div>

        {/* LISTADO POR CATEGORÍAS */}
        {['Instalaciones', 'Proveeduría'].map(categoria => (
          <section key={categoria} className="space-y-4">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 px-2 italic">
               {categoria === 'Instalaciones' ? <Home size={20}/> : <Coffee size={20}/>}
               {categoria.toUpperCase()}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {PRODUCTOS.filter(p => p.cat === categoria).map(p => (
                <div key={p.id} className="bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col items-center text-center">
                  <div className="text-4xl mb-2 bg-slate-50 w-16 h-16 flex items-center justify-center rounded-full shadow-inner">{p.emoji}</div>
                  <h3 className="font-bold text-slate-700 text-sm leading-tight h-8 flex items-center">{p.nombre}</h3>
                  <p className="text-green-600 font-black text-lg mt-1">${p.precio}</p>
                  <button onClick={() => agregar(p)} className="mt-3 bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center active:scale-90 transition-transform shadow-lg">
                    <Plus size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* CARRITO FLOTANTE O FIJO ABAJO */}
      {carrito.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-30">
          <div className="max-w-md mx-auto bg-white rounded-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 border border-green-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 font-black text-xs uppercase tracking-widest">Total acumulado</span>
              <span className="text-2xl font-black text-green-700">${total}</span>
            </div>
            <button 
              onClick={enviarPedido}
              className="w-full bg-green-600 text-white py-5 rounded-2xl font-black text-lg flex justify-center items-center gap-3 shadow-lg shadow-green-200 active:translate-y-1 transition-all"
            >
              ENVIAR PEDIDO <Send size={20}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
