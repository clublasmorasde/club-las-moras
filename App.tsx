import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Instagram, Phone, MessageCircle, MapPin, Menu, X } from 'lucide-react';

// --- COMPONENTES INTEGRADOS ---
const Home = () => (
  <div className="p-10 text-center bg-white min-h-[60vh] flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold mb-4 text-slate-800">Club Las Moras 🌿</h1>
    <p className="text-slate-600 mb-8 max-w-md">Disfruta de las mejores instalaciones para Pádel y Fútbol en un ambiente premium.</p>
    <Link to="/deportes-seleccion" className="bg-green-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-green-700 transition-all transform hover:scale-105">
      Reservar mi Cancha ahora
    </Link>
  </div>
);

const Shop = () => <div className="p-20 text-center text-2xl font-bold text-slate-400">Tienda próximamente... 🛍️</div>;
const MyReservations = () => <div className="p-20 text-center text-2xl font-bold text-slate-400">Aquí aparecerán tus reservas confirmadas 📅</div>;

const DeportesSeleccion = () => (
  <div className="p-6 bg-slate-50 min-h-screen">
    <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">¿Qué jugamos hoy? 🏆</h2>
    <div className="grid gap-6 max-w-lg mx-auto">
      <Link to="/deportes-seleccion" className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 flex items-center gap-5 hover:border-green-500 transition-colors">
        <span className="text-5xl">🎾</span>
        <div><h3 className="font-bold text-xl">Pádel Techado</h3><p className="text-sm text-slate-500">Pistas de cristal premium</p></div>
      </Link>
      <Link to="/deportes-seleccion" className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 flex items-center gap-5 hover:border-green-500 transition-colors">
        <span className="text-5xl">⚽</span>
        <div><h3 className="font-bold text-xl">Fútbol 6</h3><p className="text-sm text-slate-500">Césped sintético nuevo</p></div>
      </Link>
    </div>
  </div>
);

// --- APP PRINCIPAL ---
export default function App() {
  const [canchas, setCanchas] = useState([
    { id: 1, nombre: "Pádel 1", deporte: "Pádel", abierta: true },
    { id: 2, nombre: "Pádel 2", deporte: "Pádel", abierta: true },
    { id: 3, nombre: "Fútbol 6", deporte: "Fútbol", abierta: true },
  ]);

  const toggleCancha = (id: number) => {
    setCanchas(prev => prev.map(c => c.id === id ? { ...c, abierta: !c.abierta } : c));
  };

  const AdminAccess = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
      const user = prompt("Usuario:");
      const pass = prompt("Contraseña:");
      if (user === "JORS" && pass === "FIRULAIS") navigate('/admin-control');
      else alert("Acceso denegado");
    };
    return <button onClick={handleLogin} className="text-xs bg-slate-800 text-white px-3 py-1 rounded">Admin</button>;
  };

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 px-6 h-20 flex justify-between items-center shadow-sm">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-xl">LM</div>
            <span className="font-black text-xl tracking-tight text-slate-800 uppercase">Las Moras</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/mis-reservas" className="text-slate-500 hover:text-slate-900 text-sm font-medium">Reservas</Link>
            <AdminAccess />
          </div>
        </nav>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deportes-seleccion" element={<DeportesSeleccion />} />
            <Route path="/mis-reservas" element={<MyReservations />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/admin-control" element={
              <div className="p-8 max-w-2xl mx-auto text-slate-900">
                <h1 className="text-3xl font-bold mb-8">Panel de Control 🔒</h1>
                <div className="grid gap-4">
                  {canchas.map(c => (
                    <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <span className="font-bold text-lg">{c.nombre}</span>
                      <button onClick={() => toggleCancha(c.id)} className={`px-6 py-2 rounded-full font-bold text-white transition-all ${c.abierta ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                        {c.abierta ? 'ABIERTA' : 'CERRADA'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
