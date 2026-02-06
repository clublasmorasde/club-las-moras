import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Home as House, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  const nombreSocio = localStorage.getItem('nombreSocio') || 'Socio';

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* 1. HERO SECTION: Bienvenida y Status */}
      <div className="bg-primary-950 pt-16 pb-20 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-600/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        
        <div className="relative z-10">
          <p className="text-accent-500 font-black uppercase text-[10px] tracking-[0.3em] mb-2">Club Las Moras</p>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
            ¡Hola, {nombreSocio}! 👋
          </h1>
          <p className="text-slate-400 text-xs mt-4 font-medium max-w-[250px]">
            Bienvenido al club. ¿Qué vamos a reservar hoy?
          </p>
        </div>
      </div>

      {/* 2. ACCESOS RÁPIDOS (Tarjetas flotantes) */}
      <div className="px-6 -mt-10 grid grid-cols-2 gap-4">
        <Link to="/deportes-seleccion" className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex flex-col items-center text-center border border-white active:scale-95 transition-all">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-3xl mb-3">🎾</div>
          <span className="font-black uppercase italic text-[11px] text-slate-800 tracking-tighter">Reservar Cancha</span>
        </Link>
        <Link to="/venue/quincho-principal" className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex flex-col items-center text-center border border-white active:scale-95 transition-all">
          <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl mb-3">🏡</div>
          <span className="font-black uppercase italic text-[11px] text-slate-800 tracking-tighter">Alquilar Quincho</span>
        </Link>
      </div>

      {/* 3. SECCIÓN DE NOVEDADES / DESTACADOS */}
      <div className="mt-12 px-6">
        <div className="flex justify-between items-end mb-6">
          <h2 className="font-black uppercase italic tracking-tighter text-slate-800 text-xl">Nuestras Sedes</h2>
          <span className="text-[10px] font-bold text-primary-600 uppercase underline">Ver mapa</span>
        </div>

        <div className="space-y-6">
          {/* Card: Sede Pádel */}
          <div className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-lg border border-slate-100">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000" 
                alt="Padel" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black uppercase italic text-slate-800">Complejo de Pádel</h3>
                  <p className="text-xs text-slate-500 font-medium">3 Canchas de vidrio techadas</p>
                </div>
                <div className="bg-slate-50 px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={10} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-[10px] font-black text-slate-800">4.9</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Sede Social */}
          <div className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-lg border border-slate-100">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000" 
                alt="Quincho" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black uppercase italic text-slate-800">Área Social</h3>
                  <p className="text-xs text-slate-500 font-medium">Salón de eventos y Quinchos</p>
                </div>
                <div className="bg-slate-50 px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={10} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-[10px] font-black text-slate-800">5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FOOTER DE BIENVENIDA */}
      <div className="mt-12 px-6 text-center">
        <div className="bg-primary-900/5 p-8 rounded-[3rem] border border-primary-900/10">
          <Trophy className="mx-auto text-primary-900 mb-4" size={32} />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-900 mb-2">Socio Vitalicio</p>
          <p className="text-xs text-slate-600 leading-relaxed italic">
            "Formar parte de Las Moras es más que un deporte, es una comunidad."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;