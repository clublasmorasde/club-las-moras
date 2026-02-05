import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ReservationProvider } from './context/ReservationContext';
import Home from './pages/Home';
import VenueDetails from './pages/VenueDetails';
import MyReservations from './pages/MyReservations';
import AdminDashboard from './pages/AdminDashboard';
import Shop from './pages/Shop';
import ChatWidget from './components/ChatWidget';
import WhatsAppButtons from './components/WhatsAppButtons';
import { Calendar, Clock, ShoppingBag } from 'lucide-react';

// --- SECCIÓN 1: SELECCIÓN DE DEPORTES ---
const DeportesSeleccion = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen pb-24">
      <h2 className="text-2xl font-bold mb-6 text-primary-950">¿Qué jugamos hoy campeón? 🏆</h2>
      <div className="grid gap-4">
        <Link to="/?deporte=padel" className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-95 transition-transform">
          <div className="text-4xl">🎾</div>
          <div>
            <h3 className="font-bold text-lg text-slate-800">Pádel Techado</h3>
            <p className="text-sm text-slate-500">Canchas premium disponibles</p>
          </div>
        </Link>
        <Link to="/?deporte=futbol6" className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-95 transition-transform">
          <div className="text-4xl">⚽</div>
          <div>
            <h3 className="font-bold text-lg text-slate-800">Fútbol 6</h3>
            <p className="text-sm text-slate-500">Césped sintético</p>
          </div>
        </Link>
        <Link to="/?deporte=futbol8" className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-95 transition-transform">
          <div className="text-4xl">🏟️</div>
          <div>
            <h3 className="font-bold text-lg text-slate-800">Fútbol 8</h3>
            <p className="text-sm text-slate-500">Césped natural</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

// --- SECCIÓN 2: ACCESO ADMIN ---
const AdminAccessButton = () => {
  const navigate = useNavigate();
  const handleAdminAccess = () => {
    const user = prompt("Usuario:");
    const pass = prompt("Contraseña:");
    if (user === "JORS" && pass === "FIRULAIS") {
      navigate('/admin-control');
    } else {
      alert("Acceso denegado.");
    }
  };
  return (
    <button onClick={handleAdminAccess} className="px-4 py-2 bg-primary-950 text-accent-500 text-[10px] font-black uppercase tracking-widest rounded-sm border border-accent-600/30">
      Acceso Admin
    </button>
  );
};

// --- SECCIÓN 3: PANEL DE CONTROL ---
const AdminControlPanel = ({ canchas, toggleCancha }) => {
  return (
    <div className="p-4 max-w-md mx-auto bg-slate-900 min-h-screen text-white pb-32">
      <h1 className="text-2xl font-bold mb-6 text-yellow-500 text-center uppercase tracking-widest pt-4">Panel de Control 🔒</h1>

      {/* PÁDEL */}
      <section className="mb-8">
        <h2 className="text-sm font-bold mb-4 border-b border-slate-700 pb-2 text-slate-400 uppercase">Pádel Techado</h2>
        <div className="grid grid-cols-2 gap-4">
          {canchas.filter((c: any) => c.deporte === "Pádel").map((cancha: any) => (
            <button key={cancha.id} onClick={() => toggleCancha(cancha.id)}
              className={`relative p-6 rounded-2xl font-bold transition-all active:scale-95 ${cancha.abierta ? 'bg-green-600' : 'bg-red-600'}`}>
              {!cancha.abierta && <span className="absolute top-2 right-3">🔒</span>}
              <div className="text-2xl">{cancha.nombre.split(' ')[1]}</div>
              <div className="text-[10px] uppercase opacity-70">{cancha.abierta ? "Abierta" : "Cerrada"}</div>
            </button>
          ))}
        </div>
      </section>

      {/* FÚTBOL 6 */}
      <section className="mb-8">
        <h2 className="text-sm font-bold mb-4 border-b border-slate-700 pb-2 text-green-400 uppercase">Fútbol 6</h2>
        <div className="grid grid-cols-2 gap-4">
          {canchas.filter((c: any) => c.deporte === "Fútbol 6").map((cancha: any) => (
            <button key={cancha.id} onClick={() => toggleCancha(cancha.id)}
              className={`relative p-6 rounded-2xl font-bold transition-all active:scale-95 ${cancha.abierta ? 'bg-green-600' : 'bg-red-600'}`}>
              {!cancha.abierta && <span className="absolute top-2 right-3">🔒</span>}
              <div className="text-xl">{cancha.nombre.split(' ')[1] || cancha.nombre}</div>
              <div className="text-[10px] uppercase opacity-70">{cancha.abierta ? "Libre" : "Ocupada"}</div>
            </button>
          ))}
        </div>
      </section>
      
      <div className="text-center mt-4">
          <Link to="/" className="text-xs text-slate-500 underline uppercase tracking-widest">Volver al inicio</Link>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---
export default function App() {
  const [canchas, setCanchas] = useState([
    { id: 1, nombre: "Pádel 1", deporte: "Pádel", abierta: true },
    { id: 2, nombre: "Pádel 2", deporte: "Pádel", abierta: true },
    { id: 3, nombre: "Pádel 3", deporte: "Pádel", abierta: true },
    { id: 4, nombre: "Fútbol 6-A", deporte: "Fútbol 6", abierta: true },
    { id: 5, nombre: "Fútbol 6-B", deporte: "Fútbol 6", abierta: true },
    { id: 6, nombre: "Fútbol 8-1", deporte: "Fútbol 8", abierta: true },
    { id: 7, nombre: "Fútbol 8-2", deporte: "Fútbol 8", abierta: true },
  ]);

  const toggleCancha = (id: number) => {
    setCanchas(prev => prev.map(c => c.id === id ? { ...c, abierta: !c.abierta } : c));
  };

  return (
    <ReservationProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
          {/* NAVBAR */}
          <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-4 h-20 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-900 rounded-full flex items-center justify-center text-accent-600 font-bold border border-accent-600/30">LM</div>
              <span className="text-xl font-bold tracking-tighter italic uppercase">Las Moras</span>
            </Link>
            <AdminAccessButton />
          </nav>

          {/* CONTENIDO PRINCIPAL */}
          <main className="flex-1 pb-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/deportes-seleccion" element={<DeportesSeleccion />} />
              <Route path="/venue/:id" element={<VenueDetails />} />
              <Route path="/mis-reservas" element={<MyReservations />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin-control" element={<AdminControlPanel canchas={canchas} toggleCancha={toggleCancha} />} />
              <Route path="/shop" element={<Shop />} />
            </Routes>
          </main>

          {/* BOTONES FLOTANTES */}
          <WhatsAppButtons />
          <ChatWidget />

          {/* TAB BAR INFERIOR (Mobile Navigation) */}
          <footer className="fixed bottom-0 w-full bg-white border-t border-slate-100 p-4 flex justify-around items-center z-40 shadow-[0_-5px_15px_rgba(0,0,0,0,0.05)]">
             <Link to="/deportes-seleccion" className="text-slate-400 hover:text-primary-900 flex flex-col items-center">
                <Calendar size={20} />
                <span className="text-[10px] font-bold uppercase mt-1">Reservar</span>
             </Link>
             <Link to="/shop" className="text-slate-400 hover:text-primary-900 flex flex-col items-center">
                <ShoppingBag size={20} />
                <span className="text-[10px] font-bold uppercase mt-1">Tienda</span>
             </Link>
             <Link to="/mis-reservas" className="text-slate-400 hover:text-primary-900 flex flex-col items-center">
                <Clock size={20} />
                <span className="text-[10px] font-bold uppercase mt-1">Mis Turnos</span>
             </Link>
          </footer>
        </div>
      </Router>
    </ReservationProvider>
  );
}
