import React, { useState, useEffect } from 'react';
import { ShoppingCart, Send, Plus, Minus, User } from 'lucide-react';

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
    if (!nombre) return alert("Por favor, ingresa tu nombre");
    setCargando(true);
    await new Promise(res => setTimeout(res, 800));
    
    const texto = `🌿 *Club Las Moras* 🌿\n👤 Socio: ${nombre}\n---\n🛒 Pedido:\n${carrito.map(i => `${i.cant}x ${i.nombre}`).join('\n')}\n---\n💬 Notas: ${notas || "Sin notas"}\n💰 TOTAL: $${total}`;
    window.open(`https://wa.me/5491123456789?text=${encodeURIComponent(texto)}`);
    setCargando(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans text-slate-900">
      <header className="py-6 text-center">
        <h1 className="text-3xl font-extrabold text-green-700">Club Las Moras 🌿</h1>
        <p className="text-slate-500">Proveeduría Digital</p>
      </header>

      <main className="max-w-md mx-auto space-y-6">
        <section className="grid grid-cols-2 gap-4">
          {PRODUCTOS.map(p => (
            <div key={p.id} className="bg-white p-4 rounded-3xl shadow-sm border-none flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-3xl mb-2">{p.emoji}</div>
              <span className="font-bold text-sm text-center">{p.nombre}</span>
              <span className="text-green-600 font-bold mb-3">${p.precio}</span>
              <button onClick={() => agregar(p)} className="bg-slate-900 text-white p-2 rounded-full shadow-md active:scale-90 transition-transform">
                <Plus size={20} />
              </button>
            </div>
          ))}
        </section>

        {carrito.length > 0 && (
          <section className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100 space-y-4">
            <h2 className="font-bold text-xl flex items-center gap-2">
              <ShoppingCart size={20} /> Tu Pedido
            </h2>
            {carrito.map(i => (
              <div key={i.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl">
                <span>{i.nombre} (x{i.cant})</span>
                <div className="flex gap-2">
                  <button onClick={() => quitar(i.id)} className="bg-white p-1 rounded-lg border shadow-sm"><Minus size={16}/></button>
                  <button onClick={() => agregar(i)} className="bg-white p-1 rounded-lg border shadow-sm"><Plus size={16}/></button>
                </div>
              </div>
            ))}
            <div className="space-y-3 pt-2">
              <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre del Socio" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none" />
              <textarea value={notas} onChange={e => setNotas(e.target.value)} placeholder="Notas (Ej: Gaseosas frías)" className="w-full p-3 rounded-xl border border-slate-200 h-20 outline-none" />
            </div>
            <button 
              onClick={enviarPedido}
              disabled={cargando}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-[0_10px_20px_rgba(22,163,74,0.3)] active:translate-y-1 transition-all flex justify-center items-center gap-2"
            >
              {cargando ? "PROCESANDO..." : <>ENVIAR A WHATSAPP <Send size={18}/></>}
            </button>
            <div className="text-center font-bold text-lg">Total: ${total}</div>
          </section>
        )}
      </main>
    </div>
  );
}
