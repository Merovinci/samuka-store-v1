// -----------------------------------------------------------------------------
// src/components/Header.jsx
// Cabeçalho com animação de entrada em sequência (Texto + Logo)
// -----------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { ShoppingBag, Heart, Search, Menu } from "lucide-react";

export default function Header({
  onLogoClick,
  onCartClick,
  onFavoritesClick,
  cartCount,
  favoritesCount,
  searchQuery,
  onSearchChange,
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);

  // Dispara a animação assim que o componente carrega na tela
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateHeader(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Lado Esquerdo: Menu Hambúrguer */}
        <button className="text-zinc-400 hover:text-white transition-colors">
          <Menu size={22} />
        </button>

        {/* Centro: Nome + Logo Animada em Sequência */}
        <div
          onClick={onLogoClick}
          className="cursor-pointer flex items-center gap-2 group"
        >
          {/* 1. Nome da Loja (Surge primeiro com Fade In) */}
          <div
            className={`flex flex-col items-center transition-all duration-700 ease-out transform ${
              animateHeader
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
          >
            <span className="font-serif tracking-widest text-gold text-sm font-bold uppercase leading-tight">
              SAMUKA
            </span>
            <span className="text-[9px] tracking-[0.25em] text-zinc-400 uppercase font-light -mt-0.5">
              STORE
            </span>
          </div>

          {/* 2. Logo do Personagem (Surge em 2º lugar com Atraso/Delay) */}
          <div
            className={`w-7 h-7 rounded-full overflow-hidden border border-gold/40 shadow-sm shadow-gold/20 shrink-0 transition-all duration-700 delay-300 ease-out transform ${
              animateHeader
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-75 -translate-x-2"
            }`}
          >
            <img
              src="/logo.png"
              alt="Samuka Store Logo"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                // Caso a imagem ainda não exista, mantém um círculo elegante
                e.target.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Lado Direito: Busca, Favoritos e Carrinho */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Search size={20} />
          </button>

          <button
            onClick={onFavoritesClick}
            className="text-zinc-400 hover:text-gold transition-colors relative"
          >
            <Heart size={20} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={onCartClick}
            className="text-zinc-400 hover:text-gold transition-colors relative"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Campo de Busca Expansível */}
      {showSearch && (
        <div className="mt-3 pt-2 border-t border-zinc-800">
          <input
            type="text"
            placeholder="Buscar por produtos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-gold placeholder-zinc-500"
            autoFocus
          />
        </div>
      )}
    </header>
  );
}
