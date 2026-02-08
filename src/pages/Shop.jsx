import React, { useState } from 'react';

// --- COMPONENTE DE LA TIENDA ---
const Shop = ({ carrito, alAgregar, alQuitar }) => {
    const [activeCategory, setActiveCategory] = useState('all');

    const productos = [
        { id: 'prov-1', name: 'Gaseosa Coca-Cola 1.5L', price: 1200, category: 'drinks', emoji: '🥤' },
        { id: 'prov-2', name: 'Bolsa Carbón 4kg', price: 2500, category: 'utilidades', emoji: '🔥' },
        { id: 'prov-3', name: 'Hielo en Bolsa', price: 900, category: 'utilidades', emoji: '🧊' },
        { id: 'prov-4', name: 'Agua Mineral 500ml', price: 600, category: 'drinks', emoji: '💧' }
    ];

    const categorias = [
        { id: 'all', label: 'Todo' },
        { id: 'drinks', label: 'Bebidas' },
        { id: 'utilidades', label: 'Parrilla' }
    ];

    const filtrados = activeCategory === 'all' 
        ? productos 
        : productos.filter(p => p.category === activeCategory);

    const enviarPedido = () => {
        const nombreSocio = localStorage.getItem('nombreSocio') || "Socio";
        const detalle = carrito.map(item => `- ${item.cantidad}x ${item.name}`).join('%0A');
        const total = carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
        
        const mensaje = `Hola! Soy ${nombreSocio}. Quiero pedir:%0A${detalle}%0A*Total: $${total}*`;
        window.open(`https://wa.me/543855953934?text=${mensaje}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-32">
            <div className="bg-primary-950 text-white p-8 pt-12 text-center rounded-b-[3rem] shadow-xl">
                <h1 className="text-3xl font-black uppercase italic tracking-tighter">Proveeduría</h1>
                <p className="text-accent-500 text-[10px] uppercase tracking-[0.3em] font-bold mt-2">Club Las Moras</p>
            </div>

            {/* Filtros */}
            <div className="flex justify-center gap-2 mt-6 overflow-x-auto px-4">
                {categorias.map(cat => (
                    <button 
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'bg-primary-950 text-accent-500' : 'bg-white text-slate-400'}`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Grid de Productos Optimizado */}
            <div className="grid grid-cols-2 gap-4 p-4 mt-4">
                {filtrados.map(prod => {
                    const enCarrito = carrito.find(item => item.id === prod.id);
                    // Usamos un componente interno para que cada tarjeta tenga su propio estado "verMas"
                    return <ProductCard key={prod.id} prod={prod} enCarrito={enCarrito} alAgregar={alAgregar} alQuitar={alQuitar} />;
                })}
            </div>

            {/* Botón Flotante de Finalizar */}
            {carrito.length > 0 && (
                <div className="fixed bottom-24 left-0 w-full px-6 z-50">
                    <button 
                        onClick={enviarPedido}
                        className="w-full bg-green-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-2xl animate-bounce"
                    >
                        Pedir por WhatsApp (${carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0)})
                    </button>
                </div>
            )}
        </div>
    );
};

// Sub-componente para manejar el estado individual de "Ver Más"
const ProductCard = ({ prod, enCarrito, alAgregar, alQuitar }) => {
    const [verMas, setVerMas] = useState(false);

    return (
        <div className="bg-white p-5 rounded-[2.5rem] shadow-sm flex flex-col items-center border border-slate-100 transition-all hover:shadow-md">
            <div className="text-4xl mb-2 bg-slate-50 w-20 h-20 flex items-center justify-center rounded-full shadow-inner">
                {prod.emoji}
            </div>
            
            <h3 className="text-[11px] font-black text-center uppercase mb-1 text-slate-800 leading-tight">
                {prod.name}
            </h3>
            
            <span className="text-emerald-600 font-black text-base mb-3">${prod.price}</span>
            
            <div className="flex items-center gap-4 bg-slate-50 p-1 rounded-full border border-slate-200 mb-4">
                <button onClick={() => alQuitar(prod.id)} className="w-10 h-10 bg-white shadow-sm rounded-full font-black text-primary-950 hover:bg-red-50 active:scale-90 transition-all">-</button>
                <span className="font-black text-sm w-4 text-center">{enCarrito ? enCarrito.cantidad : 0}</span>
                <button onClick={() => alAgregar(prod)} className="w-10 h-10 bg-primary-950 text-accent-500 shadow-lg rounded-full font-black hover:bg-black active:scale-90 transition-all">+</button>
            </div>

            <button 
                onClick={() => setVerMas(!verMas)}
                className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary-950 transition-colors"
            >
                {verMas ? "↑ Menos info" : "↓ Más info"}
            </button>

            {verMas && (
                <div className="mt-3 text-center animate-in fade-in slide-in-from-top-1">
                    <p className="text-[10px] text-slate-500 italic leading-relaxed">
                        Producto oficial de proveeduría. Entrega inmediata en el club.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Shop;