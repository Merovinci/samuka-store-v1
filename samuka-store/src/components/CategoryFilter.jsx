// -----------------------------------------------------------------------------
// src/components/CategoryFilter.jsx
// Barra de categorias (Camisetas, Moletons, Calças, Jaquetas, Acessórios) e,
// quando "Acessórios" está ativo, uma segunda barra com as subcategorias
// (Bonés, Correntes, Óculos, Pulseiras, Cintos). Alterna dinamicamente os
// produtos exibidos via callbacks controlados pelo componente pai (App.jsx).
// -----------------------------------------------------------------------------

import React from "react";
import { CATEGORIES, ACCESSORY_SUBCATEGORIES } from "../data/products";

export default function CategoryFilter({
  activeCategory,
  onSelectCategory,
  activeSubcategory,
  onSelectSubcategory,
}) {
  return (
    <div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-3">
        <button
          onClick={() => {
            onSelectCategory(null);
            onSelectSubcategory(null);
          }}
          className={`px-3 py-1.5 rounded-full text-xs shrink-0 border transition-colors ${
            !activeCategory
              ? "bg-gold text-black border-gold font-semibold"
              : "border-zinc-700 text-zinc-300"
          }`}
        >
          Todas
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              onSelectCategory(c.id);
              onSelectSubcategory(null);
            }}
            className={`px-3 py-1.5 rounded-full text-xs shrink-0 border transition-colors ${
              activeCategory === c.id
                ? "bg-gold text-black border-gold font-semibold"
                : "border-zinc-700 text-zinc-300"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {activeCategory === "acessorios" && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-4">
          <button
            onClick={() => onSelectSubcategory(null)}
            className={`px-3 py-1 rounded-full text-[11px] shrink-0 border transition-colors ${
              !activeSubcategory
                ? "border-gold text-gold"
                : "border-zinc-800 text-zinc-500"
            }`}
          >
            Todos
          </button>
          {ACCESSORY_SUBCATEGORIES.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSubcategory(s.id)}
              className={`px-3 py-1 rounded-full text-[11px] shrink-0 border transition-colors ${
                activeSubcategory === s.id
                  ? "border-gold text-gold"
                  : "border-zinc-800 text-zinc-500"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
