import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronLeft } from 'lucide-react';

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  // Simulamos datos según el ID que viene de la URL
  const esQuincho = id.includes('quincho');
  const titulo = esQuincho ? 'Reserva de Quincho' : 'Reserva de Salón';
  const precio = esQuincho ? 5000 : 15000;

  const handleReserva = () => {
    if (!fecha || !hora) {
      alert("Por favor selecciona fecha y hora");
      return;
    }
    const nombreSocio = localStorage.getItem('nombreSocio') || "Socio";
    const mensaje = `Hola! Soy ${nombreSocio}. Quiero reservar el ${titulo} para el día ${fecha} a las ${hora}.`;
    window.open(`https://wa.me/543855953934?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header con botón volver */}
      <div className="bg-white p-4 flex items-center gap-4 border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-slate-600" />
        </button>
        <h1 className="font-black uppercase tracking-tighter text-slate-800 italic">{titulo}</h1>
      </div>

      <div className="p-6">
        {/* Card Principal */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white mb-6">
          <div className="text-5xl mb-6 text-center">
            {esQuincho ? '🏡' : '🎉'}
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest block mb-2">
                Seleccionar Fecha
              </label>
              <div className="relative">
                <input 
                  type="date" 
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 pl-12 font-bold text-slate-800 focus:ring-2 focus:ring-primary-500"
                />
                <Calendar className="absolute left-4 top-4 text-slate-400" size={20} />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest block mb-2">
                Horario de Inicio
              </label>
              <div className="relative">
                <input 
                  type="time" 
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 pl-12 font-bold text-slate-800 focus:ring-2 focus:ring-primary-500"
                />
                <Clock className="absolute left-4 top-4 text-slate-400" size={20} />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Precio Final</p>
              <p className="text-2xl font-black text-green-600">${precio.toLocaleString()}</p>
            </div>
            <button 
              onClick={handleReserva}
              className="bg-primary-950 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-all"
            >
              Reservar
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em] px-6 leading-relaxed">
          Al reservar, te contactaremos por WhatsApp para coordinar el pago y la entrega de llaves.
        </p>
      </div>
    </div>
  );
};

export default VenueDetails;