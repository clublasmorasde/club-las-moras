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

            {/* Grid de Productos */}
            <div className="grid grid-cols-2 gap-4 p-4 mt-4">
                {filtrados.map(prod => {
                    const enCarrito = carrito.find(item => item.id === prod.id);
                    return (
                        <div key={prod.id} className="bg-white p-4 rounded-[2rem] shadow-sm flex flex-col items-center border border-slate-100">
                            <div className="text-4xl mb-2 bg-slate-50 w-16 h-16 flex items-center justify-center rounded-full">{prod.emoji}</div>
                            <h3 className="text-[10px] font-bold text-center uppercase mb-1">{prod.name}</h3>
                            <span className="text-green-600 font-black text-sm mb-3">${prod.price}</span>
                            
                            <div className="flex items-center gap-3">
                                <button onClick={() => alQuitar(prod.id)} className="w-8 h-8 bg-slate-100 rounded-full font-bold">-</button>
                                <span className="font-bold text-sm">{enCarrito ? enCarrito.cantidad : 0}</span>
                                <button onClick={() => alAgregar(prod)} className="w-8 h-8 bg-primary-950 text-white rounded-full font-bold">+</button>
                            </div>
                        </div>
                    );
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

export default Shop;