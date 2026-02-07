import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
// SE ELIMINÓ LA IMPORTACIÓN DE RESERVATIONCONTEXT QUE DABA ERROR
import Home from './pages/Home';
import VenueDetails from './pages/VenueDetails';
import MyReservations from './pages/MyReservations';
import Shop from './pages/Shop';
import ChatWidget from './components/ChatWidget';
import WhatsAppButtons from './components/WhatsAppButtons';
import { Calendar, Clock, ShoppingBag } from 'lucide-react';

// --- SECCIÓN 1: SELECCIÓN DE DEPORTES ---
const DeportesSeleccion = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen pb-32">
      <h2 className="text-2xl font-black mb-6 text-primary-950 italic uppercase tracking-tighter text-center">¿Qué jugamos hoy? 🏆</h2>
      <div className="grid gap-4">
        <Link to="/?deporte=padel" className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4 active:scale-95 transition-all">
          <div className="text-4xl bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl">🎾</div>
          <div>
            <h3 className="font-black text-lg text-slate-800 uppercase italic leading-none">Pádel Techado</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Canchas de Vidrio</p>
          </div>
        </Link>
        <Link to="/?deporte=futbol6" className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4 active:scale-95 transition-all">
          <div className="text-4xl bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl">⚽</div>
          <div>
            <h3 className="font-black text-lg text-slate-800 uppercase italic leading-none">Fútbol 6</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Sintético Premium</p>
          </div>
        </Link>
        <Link to="/?deporte=futbol8" className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4 active:scale-95 transition-all">
          <div className="text-4xl bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl">🏟️</div>
          <div>
            <h3 className="font-black text-lg text-slate-800 uppercase italic leading-none">Fútbol 8</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Césped Natural</p>
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
      Admin
    </button>
  );
};

// --- SECCIÓN 3: PANEL DE CONTROL ---
const AdminControlPanel = ({ canchas, toggleCancha }) => {
  return (
    <div className="p-4 max-w-md mx-auto bg-slate-900 min-h-screen text-white pb-32">
      <h1 className="text-xl font-black mb-8 text-yellow-500 text-center uppercase tracking-[0.2em] italic pt-6">Panel de Control 🔒</h1>
      <section className="mb-8 px-2">
        <h2 className="text-[10px] font-black mb-4 border-b border-slate-700 pb-2 text-slate-400 uppercase tracking-widest">Estado de Canchas</h2>
        <div className="grid grid-cols-2 gap-4">
          {canchas.map((cancha) => (
            <button key={cancha.id} onClick={() => toggleCancha(cancha.id)}
              className={`relative p-6 rounded-3xl font-black transition-all active:scale-95 border-2 ${cancha.abierta ? 'bg-green-600/20 border-green-500 text-green-400' : 'bg-red-600/20 border-red-500 text-red-400'}`}>
              <div className="text-lg mb-1">{cancha.nombre}</div>
              <div className="text-[9px] uppercase tracking-widest">{cancha.abierta ? "Abierta" : "Cerrada"}</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- APP PRINCIPAL ---
export default function App() {
  const [nombreSocio, setNombreSocio] = useState(localStorage.getItem('nombreSocio') || '');
  const [inputNombre, setInputNombre] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [canchas, setCanchas] = useState([
    { id: 1, nombre: "Pádel 1", deporte: "Pádel", abierta: true },
    { id: 2, nombre: "Pádel 2", deporte: "Pádel", abierta: true },
    { id: 3, nombre: "Pádel 3", deporte: "Pádel", abierta: true },
    { id: 4, nombre: "Fútbol 6-A", deporte: "Fútbol 6", abierta: true },
    { id: 5, nombre: "Fútbol 6-B", deporte: "Fútbol 6", abierta: true },
    { id: 6, nombre: "Fútbol 8-1", deporte: "Fútbol 8", abierta: true },
    { id: 7, nombre: "Fútbol 8-2", deporte: "Fútbol 8", abierta: true },
  ]);

  const handleIngresar = (e) => {
    e.preventDefault();
    if (inputNombre.trim().length < 3) return alert("Por favor, ingresa tu nombre.");
    localStorage.setItem('nombreSocio', inputNombre);
    setNombreSocio(inputNombre);
  };

  const toggleCancha = (id) => {
    setCanchas(prev => prev.map(c => c.id === id ? { ...c, abierta: !c.abierta } : c));
  };

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

  // --- RENDERIZADO CONDICIONAL: LOGIN O APP ---
  if (!nombreSocio) {
    return (
      <div className="min-h-screen bg-primary-950 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center text-primary-950 text-3xl font-black mb-8 shadow-2xl shadow-accent-600/20">LM</div>
        <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">Club Las Moras</h1>
        <p className="text-slate-400 text-xs font-medium mb-10 uppercase tracking-widest">Bienvenido Socio</p>
        <form onSubmit={handleIngresar} className="w-full max-w-xs space-y-4">
          <input type="text" placeholder="Tu Nombre y Apellido" value={inputNombre} onChange={(e) => setInputNombre(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white font-bold placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-accent-500 text-center" />
          <button type="submit" className="w-full bg-accent-500 text-primary-950 font-black uppercase tracking-widest py-5 rounded-2xl active:scale-95 transition-all">Entrar</button>
        </form>
      </div>
    );
  }

  return (
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
          <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-4 h-20 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-900 rounded-full flex items-center justify-center text-accent-600 font-bold border border-accent-600/30">LM</div>
              <span className="text-xl font-black italic tracking-tighter uppercase text-primary-950">Las Moras</span>
            </Link>
            <AdminAccessButton />
          </nav>

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/deportes-seleccion" element={<DeportesSeleccion />} />
              <Route path="/venue/:id" element={<VenueDetails />} />
              <Route path="/mis-reservas" element={<MyReservations />} />
              {/* SE CORRIGIÓ ESTA RUTA PARA QUE USE EL PANEL DE CONTROL EXISTENTE */}
              <Route path="/admin" element={<AdminControlPanel canchas={canchas} toggleCancha={toggleCancha} />} />
              <Route path="/admin-control" element={<AdminControlPanel canchas={canchas} toggleCancha={toggleCancha} />} />
              <Route path="/shop" element={<Shop carrito={carrito} alAgregar={agregarAlCarrito} alQuitar={quitarDelCarrito} />} />
            </Routes>
          </main>

          <WhatsAppButtons />
          <ChatWidget />

          <footer className="fixed bottom-0 w-full bg-white border-t border-slate-100 p-4 flex justify-around items-center z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
             <Link to="/deportes-seleccion" className="text-slate-400 hover:text-primary-950 flex flex-col items-center">
                <Calendar size={20} />
                <span className="text-[10px] font-black uppercase mt-1">Turnos</span>
             </Link>
             <Link to="/shop" className="text-slate-400 hover:text-primary-950 flex flex-col items-center relative">
                <ShoppingBag size={20} />
                {carrito.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
                  </span>
                )}
                <span className="text-[10px] font-black uppercase mt-1">Tienda</span>
             </Link>
             <Link to="/mis-reservas" className="text-slate-400 hover:text-primary-950 flex flex-col items-center">
                <Clock size={20} />
                <span className="text-[10px] font-black uppercase mt-1">Mis Turnos</span>
             </Link>
          </footer>
        </div>
      </Router>
  );
}