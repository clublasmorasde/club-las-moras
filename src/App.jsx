import React, { useState, useEffect } from 'react';
import { ShoppingCart, Send, Plus, Minus, User, Store } from 'lucide-react';

const PRODUCTOS = [
  { id: 1, nombre: 'Gaseosa 1.5L', precio: 1500, emoji: '🥤' },
  { id: 2, nombre: 'Carbón 4kg', precio: 2200, emoji: '🔥' },
  { id: 3, nombre: 'Cerveza Lata', precio: 1200, emoji: '🍺' },
  { id: 4, nombre: 'Hielo Bolsa', precio: 800, emoji: '🧊' }
];

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [nombre, setNombre] = useState(localStorage.getItem('nombreSocio') || "");
  const [notas, setNotas] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    localStorage.setItem('nombreSocio', nombre);
  }, [nombre]);

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

  const enviarPedido = async () => {
    if (!nombre) return alert("Por favor, ingresa tu nombre de socio");
    setCargando(true);
    
    const texto = `🌿 *Club Las Moras - Proveeduría* 🌿\n👤 *Socio:* ${nombre}\n---\n🛒 *Pedido:*\n${carrito.map(i => `• ${i.cant}x ${i.nombre}`).join('\n')}\n---\n💬 *Notas:* ${notas || "Sin notas"}\n💰 *TOTAL:* $${total}`;
    
    // Reemplaza con el número real de la proveeduría
    const numeroWhatsApp = "5491123456789"; 
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`);
    setCargando(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 p-6 text-center sticky top-0 z-10 shadow-sm">
        <h1 className="text-2xl font-black text-green-700 flex items-center justify-center gap-2">
          Club Las Moras <span className="text-2xl">🌿</span>
        </h1>
        <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mt-1">Proveeduría Digital</p>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-8">
        {/* Identificación del Socio */}
        <section className="bg-white p-5 rounded-3xl shadow-sm space-y-3 border border-slate-50">
          <label className="flex items-center gap-2 text-slate-500 font-semibold text-sm ml-1">
            <User size={16} /> NOMBRE DEL SOCIO
          </label>
          <input 
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Juan Pérez"
            className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-green-500 outline-none transition-all font-medium"
          />
        </section>

        {/* Lista de Productos */}
        <section className="grid grid-cols-2 gap-4">
          {PRODUCTOS.map(p => (
            <div key={p.id} className="bg-white p-5 rounded-[2.5rem] shadow-sm flex flex-col items-center border border-slate-50 hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-3 shadow-inner">
                {p.emoji}
              </div>
              <h3 className="font-bold text-slate-700 text-center text-sm">{p.nombre}</h3>
              <p className="text-green-600 font-black text-lg mt-1">${p.precio}</p>
              
              <button 
                onClick={() => agregar(p)}
                className="mt-4 bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform"
              >
                <Plus size={24} />
              </button>
            </div>
          ))}
        </section>

        {/* Carrito de Compras */}
        {carrito.length > 0 && (
          <section className="bg-white rounded-[3rem] shadow-2xl p-6 border border-green-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-2xl text-green-700">
                <ShoppingCart size={24} />
              </div>
              <h2 className="font-black text-xl text-slate-800">Tu Pedido</h2>
            </div>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {carrito.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-3xl">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700">{item.nombre}</span>
                    <span className="text-xs text-slate-400 font-bold">${item.precio} c/u</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                    <button onClick={() => quitar(item.id)} className="text-slate-400 hover:text-red-500 p-1"><Minus size={18}/></button>
                    <span className="font-black text-slate-700 w-4 text-center">{item.cant}</span>
                    <button onClick={() => agregar(item)} className="text-green-600 p-1"><Plus size={18}/></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <textarea 
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="¿Alguna nota especial? (Ej: Gaseosas bien frías)"
                className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-green-500 outline-none text-sm min-h-[80px]"
              />
              
              <div className="flex justify-between items-center px-2 py-2">
                <span className="text-slate-400 font-bold">TOTAL A PAGAR</span>
                <span className="text-3xl font-black text-green-700">${total}</span>
              </div>

              <button 
                onClick={enviarPedido}
                disabled={cargando}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-[2rem] font-black text-lg shadow-[0_15px_30px_rgba(22,163,74,0.3)] active:translate-y-1 transition-all flex justify-center items-center gap-3 disabled:opacity-50"
              >
                {cargando ? "PROCESANDO..." : <>ENVIAR PEDIDO <Send size={20}/></>}
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
