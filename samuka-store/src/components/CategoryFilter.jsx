// -----------------------------------------------------------------------------
// src/components/CategoryFilter.jsx
// Carrossel de categorias circulares com suporte responsivo
// -----------------------------------------------------------------------------

import React from "react";
import { CATEGORIES, ACCESSORY_SUBCATEGORIES } from "../data/products";
import { Shirt, Watch, Flame, Gem, Disc } from "lucide-react";

export default function CategoryFilter({
  activeCategory,
  onSelectCategory,
  activeSubcategory,
  onSelectSubcategory,
}) {
  const getCategoryIcon = (id) => {
    switch (id) {
      case "camisetas":
        return <Shirt size={22} />;
      case "moletons":
        return <Flame size={22} />;
      case "calcas":
        return <Disc size={22} />;
      case "jaquetas":
        return <Watch size={22} />;
      case "acessorios":
        return <Gem size={22} />;
      default:
        return <Shirt size={22} />;
    }
  };

  return (
    <div className="mb-6">
      {/* Scroll/Flex de Categorias Circulares */}
      <div className="flex gap-4 sm:gap-6 overflow-x-auto sm:justify-center no-scrollbar px-2 py-2">
        <button
          onClick={() => {
            onSelectCategory(null);
            onSelectSubcategory(null);
          }}
          className="flex flex-col items-center gap-1.5 shrink-0 group"
        >
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center transition-all ${
              !activeCategory
                ? "border-gold bg-gold/10 text-gold scale-105"
                : "border-zinc-800 bg-zinc-900 text-zinc-400 group-hover:border-zinc-700"
            }`}
          >
            <span className="text-xs font-semibold">TUDO</span>
          </div>
          <span
            className={`text-xs font-medium ${
              !activeCategory ? "text-gold" : "text-zinc-400"
            }`}
          >
            Todas
          </span>
        </button>

        {CATEGORIES.map((c) => {
          const isActive = activeCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => {
                onSelectCategory(c.id);
                onSelectSubcategory(null);
              }}
              className="flex flex-col items-center gap-1.5 shrink-0 group"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border overflow-hidden flex items-center justify-center transition-all ${
                  isActive
                    ? "border-gold bg-gold/10 text-gold scale-105"
                    : "border-zinc-800 bg-zinc-900 text-zinc-400 group-hover:border-zinc-700"
                }`}
              >
                {c.image && c.image.startsWith("/") ? (
                  <img
                    src={c.image}
                    alt={c.label}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  getCategoryIcon(c.id)
                )}
              </div>
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-gold" : "text-zinc-400"
                }`}
              >
                {c.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Subcategorias de Acessórios */}
      {activeCategory === "acessorios" && (
        <div className="flex gap-2 overflow-x-auto sm:justify-center no-scrollbar px-2 pt-3">
          <button
            onClick={() => onSelectSubcategory(null)}
            className={`px-3 py-1 rounded-full text-[11px] sm:text-xs shrink-0 border transition-colors ${
              !activeSubcategory
                ? "border-gold text-gold bg-gold/5"
                : "border-zinc-800 text-zinc-500"
            }`}
          >
            Todos
          </button>
          {ACCESSORY_SUBCATEGORIES.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSubcategory(s.id)}
              className={`px-3 py-1 rounded-full text-[11px] sm:text-xs shrink-0 border transition-colors ${
                activeSubcategory === s.id
                  ? "border-gold text-gold bg-gold/5"
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
