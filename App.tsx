import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Instagram, Phone, MessageCircle } from 'lucide-react';

// --- COMPONENTES INTEGRADOS (Para evitar errores de archivos faltantes) ---
const Home = () => (
  <div className="p-10 text-center">
    <h1 className="text-3xl font-bold mb-6 text-slate-800">Club Las Moras 🌿</h1>
    <Link to="/deportes-seleccion" className="bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 transition-colors">
      Reservar Cancha
    </Link>
  </div>
);

const Shop = () => <div className="p-10 text-center text-xl">Tienda próximamente... 🛍️</div>;
const MyReservations = () => <div className="p-10 text-center text-xl">Aquí verás tus próximas reservas 📅</div>;

const AdminAccessButton = () => {
  const navigate = useNavigate();
  const handleAdminAccess = () => {
    const user = prompt("Usuario:");
    const pass = prompt("Contraseña:");
    if (user === "JORS" && pass === "FIRULAIS") { navigate('/admin-control'); }
    else { alert("Acceso denegado."); }
  };
  return (
    <button onClick={handleAdminAccess} className="text-xs bg-slate-800 text-white px-3 py-1 rounded">
      Admin
    </button>
  );
};

// --- SECCIÓN: SELECCIÓN DE DEPORTES ---
const DeportesSeleccion = () => (
  <div className="p-6 bg-slate-50 min-h-screen">
    <h2 className="text-2xl font-bold mb-6">¿Qué jugamos hoy? 🏆</h2>
    <div className="grid gap-4">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
        <span className="text-4xl">🎾</span>
        <div><h3 className="font-bold">Pádel Techado</h3><p className="text-sm text-slate-500">Canchas premium</p></div>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
        <span className="text-4xl">⚽</span>
        <div><h3 className="font-bold">Fútbol 6</h3><p className="text-sm text-slate-500">Césped sintético</p></div>
      </div>
    </div>
  </div>
);

// --- APP PRINCIPAL ---
export default function App() {
  const [canchas, setCanchas] = useState([
    { id: 1, nombre: "Pádel 1", deporte: "Pádel", abierta: true },
    { id: 4, nombre: "Fútbol 6-A", deporte: "Fútbol 6", abierta: true },
  ]);

  const toggleCancha = (id: number) => {
    setCanchas(prev => prev.map(c => c.id === id ? { ...c, abierta: !c.abierta } : c));
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold">LM</div>
            <span className="font-bold">Las Moras</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/mis-reservas" className="text-slate-600">Mis Reservas</Link>
            <AdminAccessButton />
          </div>
        </nav>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deportes-seleccion" element={<DeportesSeleccion />} />
            <Route path="/mis-reservas" element={<MyReservations />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/admin-control" element={
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Panel Control 🔒</h1>
                {canchas.map(c => (
                  <button key={c.id} onClick={() => toggleCancha(c.id)} className={`p-4 m-2 rounded ${c.abierta ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {c.nombre}: {c.abierta ? 'Abierta' : 'Cerrada'}
                  </button>
                ))}
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
