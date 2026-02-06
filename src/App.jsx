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

// --- SECCIÓN: SELECCIÓN DE ÁREAS (Sustituye a DeportesSeleccion) ---
const SeccionInstalaciones = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen pb-24">
      <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-slate-400 text-center pt-4">
        Gestión de Reservas
      </h2>
      
      <div className="grid gap-6">
        {/* SECTOR SOCIAL / INSTALACIONES */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase text-orange-600 ml-2 tracking-widest">Área Social</h3>
          <Link to="/" className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-5 active:scale-95 transition-all">
            <div className="text-4xl bg-orange-50 w-16 h-16 flex items-center justify-center rounded-full shadow-inner">🏡</div>
            <div>
              <h3 className="font-bold text-lg text-slate-800 uppercase tracking-tighter">Instalaciones</h3>
              <p className="text-xs text-slate-500 font-medium">Quinchos y Salones de Eventos</p>
            </div>
          </Link>
        </div>

        {/* SECTOR DEPORTIVO */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase text-primary-900 ml-2 tracking-widest">Área Deportiva</h3>
          <div className="grid gap-3">
            <Link to="/?deporte=padel" className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-95 transition-all">
              <div className="text-2xl">🎾</div>
              <h3 className="font-bold text-slate-800 uppercase text-sm">Pádel Techado</h3>
            </Link>
            <Link to="/?deporte=futbol" className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-95 transition-all">
              <div className="text-2xl">⚽</div>
              <h3 className="font-bold text-slate-800 uppercase text-sm">Canchas de Fútbol</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ACCESO ADMIN ---
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
      Admin
    </button>
  );
};

// --- APP PRINCIPAL ---
export default function App() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito(prev => prev.map(item => item.id === id ? { ...item, cantidad: Math.max(0, item.cantidad - 1) } : item).filter(item => item.cantidad > 0));
  };

  return (
    <ReservationProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
          <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-4 h-20 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-900 rounded-full flex items-center justify-center text-accent-600 font-bold border border-accent-600/30">LM</div>
              <span className="text-xl font-bold tracking-tighter italic uppercase text-primary-950">Las Moras</span>
            </Link>
            <AdminAccessButton />
          </nav>

          <main className="flex-1 pb-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/deportes-seleccion" element={<SeccionInstalaciones />} />
              <Route path="/venue/:id" element={<VenueDetails />} />
              <Route path="/mis-reservas" element={<MyReservations />} />
              <Route path="/shop" element={<Shop carrito={carrito} alAgregar={agregarAlCarrito} alQuitar={quitarDelCarrito} />} />
            </Routes>
          </main>

          <WhatsAppButtons />
          <ChatWidget />

          <footer className="fixed bottom-0 w-full bg-white border-t border-slate-100 p-4 flex justify-around items-center z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
             <Link to="/deportes-seleccion" className="text-slate-400 hover:text-primary-950 flex flex-col items-center">
                <Calendar size={20} />
                <span className="text-[10px] font-bold uppercase mt-1">Instalaciones</span>
             </Link>
             <Link to="/shop" className="text-slate-400 hover:text-primary-950 flex flex-col items-center relative">
                <ShoppingBag size={20} />
                {carrito.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
                  </span>
                )}
                <span className="text-[10px] font-bold uppercase mt-1">Tienda</span>
             </Link>
             <Link to="/mis-reservas" className="text-slate-400 hover:text-primary-950 flex flex-col items-center">
                <Clock size={20} />
                <span className="text-[10px] font-bold uppercase mt-1">Mis Turnos</span>
             </Link>
          </footer>
        </div>
      </Router>
    </ReservationProvider>
  );
}