import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Send, Plus, Coffee, Home, ChevronRight } from 'lucide-react';

const INSTALACIONES = [
  { id: 101, cat: 'Salones', nombre: 'Salón Blanco', desc: 'Capacidad 400 personas - Eventos Grandes', precio: 80000, emoji: '🏛️' },
  { id: 102, cat: 'Salones', nombre: 'Salón Gris', desc: '120m² - Ideal eventos medianos', precio: 45000, emoji: '🏢' },
  { id: 201, cat: 'Canchas', nombre: 'Pádel Techado', desc: 'Cancha de cristal, iluminación LED', precio: 6000, emoji: '🎾' },
  { id: 202, cat: 'Canchas', nombre: 'Fútbol 6', desc: 'Césped sintético profesional', precio: 12000, emoji: '⚽' },
];

const HORARIOS = ["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

export default function App() {
  const [nombre, setNombre] = useState("");
  const [categoriaActual, setCategoriaActual] = useState('Canchas');
  const [seleccion, setSeleccion] = useState<any>(null); // Instalación seleccionada para reservar
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const enviarReserva = () => {
    if (!nombre || !fecha || !hora || !seleccion) {
      return alert("Por favor completa: Nombre, Fecha, Hora e Instalación");
    }
    const texto = `🌿 *RESERVA - CLUB LAS MORAS*\n👤 *Socio:* ${nombre}\n📍 *Lugar:* ${seleccion.nombre}\n📅 *Fecha:* ${fecha}\n⏰ *Hora:* ${hora}\n💰 *Precio:* $${seleccion.precio}`;
    window.open(`https://wa.me/5491123456789?text=${encodeURIComponent(texto)}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-10">
      {/* HEADER ESTILO APP PREMIUM */}
      <header className="bg-white p-6 pt-12 shadow-sm rounded-b-[3rem]">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-[#1E293B] tracking-tight">Club Las Moras</h1>
            <p className="text-[#64748B] text-sm font-medium">Central de Reservas & Proveeduría</p>
          </div>
          <div className="w-12 h-12 bg-[#008080] rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">LM</div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 mt-8 space-y-6">
        {/* PASO 1: SOCIO */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-slate-100 p-3 rounded-2xl text-[#64748B]">
            <User size={20} />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identificación</span>
            <input 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del socio"
              className="w-full bg-transparent border-none p-0 focus:ring-0 font-bold text-slate-700"
            />
          </div>
        </div>

        {/* PASO 2: CATEGORÍAS */}
        <div className="flex gap-3">
          {['Canchas', 'Salones'].map(cat => (
            <button 
              key={cat}
              onClick={() => { setCategoriaActual(cat); setSeleccion(null); }}
              className={`flex-1 py-4 rounded-2xl font-bold transition-all ${categoriaActual === cat ? 'bg-[#008080] text-white shadow-lg' : 'bg-white text-slate-500 shadow-sm'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LISTADO DE INSTALACIONES */}
        <div className="space-y-4">
          <h2 className="font-bold text-slate-800 ml-2 italic">Selecciona una opción:</h2>
          {INSTALACIONES.filter(i => i.cat === categoriaActual).map(inst => (
            <div 
              key={inst.id}
              onClick={() => setSeleccion(inst)}
              className={`bg-white p-4 rounded-3xl border-2 transition-all cursor-pointer ${seleccion?.id === inst.id ? 'border-[#008080] bg-[#F0FDFA]' : 'border-transparent shadow-sm'}`}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm">{inst.emoji}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{inst.nombre}</h3>
                  <p className="text-xs text-slate-500">{inst.desc}</p>
                  <p className="text-[#008080] font-bold mt-1">${inst.precio}</p>
                </div>
                <ChevronRight className={seleccion?.id === inst.id ? 'text-[#008080]' : 'text-slate-300'} />
              </div>
            </div>
          ))}
        </div>

        {/* PASO 3: CALENDARIO Y HORARIOS (Solo si seleccionó algo) */}
        {seleccion && (
          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-[#CCECEC] space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-4">
              <label className="flex items-center gap-2 font-bold text-slate-700"><Calendar size={18}/> ¿Qué día vienes?</label>
              <input 
                type="date" 
                onChange={(e) => setFecha(e.target.value)}
                className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-[#008080] font-bold text-slate-600"
              />
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 font-bold text-slate-700"><Clock size={18}/> Selecciona el horario</label>
              <div className="grid grid-cols-3 gap-2">
                {HORARIOS.map(h => (
                  <button
                    key={h}
                    onClick={() => setHora(h)}
                    className={`py-3 rounded-xl font-bold text-sm transition-all ${hora === h ? 'bg-[#008080] text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={enviarReserva}
              className="w-full bg-[#008080] text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-[#008080]/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              RESERVAR AHORA <Send size={20}/>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
