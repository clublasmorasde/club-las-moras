import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [nombreSocio, setNombreSocio] = useState(localStorage.getItem('nombreSocio') || "");

  useEffect(() => {
    localStorage.setItem('nombreSocio', nombreSocio);
  }, [nombreSocio]);

  const instalaciones = [
    { id: 'padel', nombre: 'Alquiler Cancha Padel', precio: 5000, emoji: '🎾' },
    { id: 'futbol', nombre: 'Alquiler Cancha Fútbol', precio: 8000, emoji: '⚽' },
    { id: 'quincho', nombre: 'Alquiler Quincho', precio: 5000, emoji: '🏡' },
    { id: 'salon', nombre: 'Salón de Eventos', precio: 15000, emoji: '🎉' },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="text-center mb-10 pt-4">
        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-yellow-500 font-bold border border-yellow-500/30 mx-auto mb-4">LM</div>
        <h1 className="text-2xl font-black uppercase italic text-slate-900">Club Las Moras</h1>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] shadow-lg mb-10">
        <p className="text-[10px] uppercase font-black text-slate-400 mb-3">👤 Identificación de Socio</p>
        <input 
          type="text" 
          value={nombreSocio}
          onChange={(e) => setNombreSocio(e.target.value)}
          placeholder="Nombre y Apellido" 
          className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold"
        />
      </div>

      <h2 className="text-xs font-black uppercase tracking-widest mb-6 px-2">🏠 Instalaciones</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {instalaciones.map((inst) => (
          <div key={inst.id} className="bg-white p-5 rounded-[2.2rem] shadow-sm border border-slate-50 flex flex-col items-center">
            <div className="text-3xl mb-4 bg-slate-50 w-20 h-20 flex items-center justify-center rounded-full">{inst.emoji}</div>
            <h3 className="text-[10px] font-black text-center uppercase text-slate-700 mb-1 leading-tight">{inst.nombre}</h3>
            <span className="text-green-600 font-black text-xs mb-4">${inst.price || inst.precio}</span>
            <Link to={`/venue/${inst.id}`} className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl">+</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;