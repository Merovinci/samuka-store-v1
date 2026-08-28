// -----------------------------------------------------------------------------
// src/components/Header.jsx
// Barra superior fixa: logo "SAMUKA STORE", busca expansível e ícones
// interativos de favoritos/carrinho com contadores em tempo real.
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import { Search, Heart, ShoppingBag, X } from "lucide-react";

export default function Header({
  onLogoClick,
  onCartClick,
  onFavoritesClick,
  cartCount,
  favoritesCount,
  searchQuery,
  onSearchChange,
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="sticky top-0 z-20 bg-black/90 backdrop-blur border-b border-zinc-800">
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        {searchOpen ? (
          <div className="flex-1 flex items-center gap-2">
            <Search size={16} className="text-zinc-500 shrink-0" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar produtos..."
              className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
            />
            <button
              onClick={() => {
                setSearchOpen(false);
                onSearchChange("");
              }}
            >
              <X size={18} className="text-zinc-500" />
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={onLogoClick}
              className="flex items-baseline gap-1 shrink-0"
            >
              <span className="font-serif text-lg tracking-wide text-white">
                SAMUKA
              </span>
              <span className="text-[10px] tracking-[0.2em] text-gold">
                STORE
              </span>
            </button>

            <div className="flex items-center gap-4 ml-auto">
              <button onClick={() => setSearchOpen(true)}>
                <Search size={20} className="text-white" />
              </button>

              <button onClick={onFavoritesClick} className="relative">
                <Heart size={20} className="text-white" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>

              <button onClick={onCartClick} className="relative">
                <ShoppingBag size={20} className="text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
