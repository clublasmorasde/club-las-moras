import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Instagram, Phone, MessageCircle } from 'lucide-react';

// --- COMPONENTES AUXILIARES (Para que no den error) ---
const Home = () => (
  <div className="p-20 text-center">
    <h1 className="text-4xl font-bold mb-4">Bienvenido al Club Las Moras 🌿</h1>
    <Link to="/deportes-seleccion" className="bg-primary-
