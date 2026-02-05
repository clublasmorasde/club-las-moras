import React, { useState, useEffect } from 'react';
import { ShoppingCart, Send, Plus, Minus, User, Coffee, Home } from 'lucide-react';

const PRODUCTOS = [
  { id: 1, cat: 'Proveeduría', nombre: 'Gaseosa 1.5L', precio: 1500, emoji: '🥤' },
  { id: 2, cat: 'Proveeduría', nombre: 'Carbón 4kg', precio: 2200, emoji: '🔥' },
  { id: 3, cat: 'Proveeduría', nombre: 'Cerveza Lata', precio: 1200, emoji: '🍺' },
  { id: 4, cat: 'Proveeduría', nombre: 'Hielo Bolsa', precio: 800, emoji: '🧊' },
  { id: 10, cat: 'Instalaciones', nombre: 'Pádel Techado', precio: 5000, emoji: '🎾' },
  { id: 11, cat: 'Instalaciones', nombre: 'Cancha Fútbol', precio: 8000, emoji: '⚽' },
  { id: 12, cat: 'Instalaciones', nombre: 'Alquiler Quincho', precio: 15000, emoji: '🏡' },
  { id: 13, cat: 'Instalaciones', nombre: 'Salón de Eventos', precio: 45000, emoji: '🎉' }
];

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [nombre, setNombre] = useState(localStorage.getItem('nombreSocio') || "");
  const [categoriaActual, setCategoriaActual] = useState('Proveeduría');

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
    <div className="min-h-screen bg-[#F3F4F6] font-sans pb-32">
      {/* HEADER */}
      <header className="p-6 pt-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-[#2D3748]">Club Las Moras</h1>
            <p className="text-[#718096] text-sm mt-1">Reserva tu turno de juego o tu pedido</p>
          </div>
          <button className="bg-[#008080] text-white text-[10px] px-4 py-2 rounded-xl font-bold uppercase shadow-lg shadow-[#008080]/20">
            Tienda & Reservas
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 space-y-8">
        {/* IDENTIFICACIÓN ESTILO CARD NEUMÓRFICA */}
        <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white">
          <div className="flex items-center gap-4">
            <div className="bg-[#008080] p-3 rounded-full text-white shadow-lg">
              <User size={24} />
            </div>
            <div className="flex-1">
              <label className="text-xs text-[#A0AEC0] font-medium block">Nombre del Socio</label>
              <input 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre y Apellido"
                className="w-full bg-transparent border-none p-0 focus:ring-0 font-bold text-[#2D3748] placeholder-[#CBD5E0]"
              />
            </div>
          </div>
        </div>

        {/* SELECTOR DE CATEGORÍAS */}
        <div className="flex gap-4">
          <button 
            onClick={() => setCategoriaActual('Proveeduría')}
            className={`flex-1 py-4 px-6 rounded-[2rem] flex items-center justify-center gap-2 font-bold transition-all shadow-lg ${categoriaActual === 'Proveeduría' ? 'bg-[#008080] text-white shadow-[#008080]/30' : 'bg-white text-[#4A5568] shadow-slate-200'}`}
          >
            <Coffee size={20} /> Proveeduría
          </button>
          <button 
            onClick={() => setCategoriaActual('Instalaciones')}
            className={`flex-1 py-4 px-6 rounded-[2rem] flex items-center justify-center gap-2 font-bold transition-all shadow-lg ${categoriaActual === 'Instalaciones' ? 'bg-[#008080] text-white shadow-[#008080]/30' : 'bg-white text-[#4A5568] shadow-slate-200'}`}
          >
            <Home size={20} /> Instalaciones
          </button>
        </div>

        {/* LISTADO DE PRODUCTOS (LISTA HORIZONTAL) */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#2D3748] ml-2">{categoriaActual} Digital</h2>
          <div className="space-y-3">
            {PRODUCTOS.filter(p => p.cat === categoriaActual).map(p => (
              <div key={p.id} className="bg-white p-4 rounded-3xl shadow-sm border border-white flex items-center gap-4">
                <div className="w-14 h-14 bg-[#F7FAFC] rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                  {p.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#2D3748]">{p.nombre}</h3>
                  <p className="text-[#008080] font-black text-lg">${p.precio}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#A0AEC0] mr-2">
                    ${carrito.find(i => i.id === p.id)?.precio * (carrito.find(i => i.id === p.id)?.cant || 0) || p.precio}
                  </span>
                  <button 
                    onClick={() => agregar(p)}
                    className="bg-[#008080] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-[#008080]/20 active:scale-90 transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* BOTÓN FLOTANTE ESTILO PILL */}
      {carrito.length > 0 && (
        <div className="fixed bottom-8 left-0 right-0 px-6 z-50">
          <div className="max-w-md mx-auto space-y-4">
            <button 
              onClick={enviarPedido}
              className="w-full bg-[#008080] text-white py-5 rounded-[2.5rem] font-bold text-xl flex justify-between items-center px-10 shadow-2xl shadow-[#008080]/40 group active:scale-95 transition-all"
            >
              <span>ENVIAR PEDIDO</span>
              <Send size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-center">
              <span className="text-3xl font-black text-[#008080] drop-shadow-sm">${total}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
