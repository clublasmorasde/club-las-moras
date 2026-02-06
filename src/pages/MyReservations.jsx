import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservations } from '../context/ReservationContext';
import { Calendar, Clock, ChevronLeft, Trash2 } from 'lucide-react';

const MyReservations = () => {
  const navigate = useNavigate();
  const { reservations, removeReservation } = useReservations();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-white p-6 flex items-center gap-4 border-b border-slate-100 pt-12">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-slate-800" />
        </button>
        <h1 className="text-xl font-black uppercase italic tracking-tighter text-slate-800">
          Mis Turnos
        </h1>
      </div>

      <div className="p-6">
        {reservations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="text-5xl mb-4">📅</div>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              No tienes reservas activas
            </p>
            <button 
              onClick={() => navigate('/deportes-seleccion')}
              className="mt-6 text-primary-950 font-black text-xs uppercase underline tracking-tighter"
            >
              Reservar ahora
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map((res) => (
              <div key={res.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                    {res.venueType === 'padel' ? '🎾' : res.venueType === 'futbol' ? '⚽' : '🏡'}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 uppercase text-xs leading-tight">
                      {res.venueName}
                    </h3>
                    <div className="flex gap-3 mt-1">
                      <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                        <Calendar size={10} /> {res.date}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                        <Clock size={10} /> {res.time}hs
                      </span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => removeReservation(res.id)}
                  className="p-3 bg-red-50 text-red-500 rounded-2xl active:scale-90 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 p-6 bg-primary-950 rounded-[2rem] text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-60">Recordatorio</p>
          <p className="text-xs font-medium leading-relaxed">
            Recuerda que debes presentarte 10 minutos antes de tu turno. Para cancelaciones, comunícate con la administración.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyReservations;