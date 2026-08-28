// -----------------------------------------------------------------------------
// src/components/ProductCard.jsx
// Card individual de produto: imagem, nome, preço, seletor rápido de cor
// (sem precisar abrir a PDP) e botões de favoritar / adicionar ao carrinho.
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import { Heart, ShoppingBag, Check, Shirt } from "lucide-react";
import { COLOR_PALETTE, formatBRL } from "../data/products";

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onOpenDetail,
}) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart({
      ...product,
      color: selectedColor,
      size: product.sizes[0],
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="bg-bg-soft border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-gold/50 transition-colors flex flex-col"
    >
      {/* Imagem / placeholder visual */}
      <div
        className={`bg-gradient-to-br ${product.images[0]} aspect-square flex items-center justify-center relative`}
      >
        <Shirt className="text-gold/70" size={38} strokeWidth={1.25} />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center"
        >
          <Heart
            size={16}
            className={isFavorite ? "text-gold" : "text-white"}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="p-3 flex flex-col gap-2">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-wide truncate">
            {product.name}
          </p>
          <p className="text-gold font-semibold text-sm mt-0.5">
            {formatBRL(product.price)}
          </p>
        </div>

        {/* Seletor rápido de cor */}
        {product.colors.length > 1 && (
          <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                style={{ backgroundColor: COLOR_PALETTE[c] }}
                title={c}
                className={`w-4 h-4 rounded-full border ${
                  selectedColor === c ? "border-gold" : "border-zinc-700"
                }`}
              />
            ))}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-1.5 bg-gold hover:bg-gold-light transition-colors text-black text-xs font-semibold py-2 rounded-full"
        >
          {justAdded ? (
            <>
              <Check size={14} /> Adicionado
            </>
          ) : (
            <>
              <ShoppingBag size={14} /> Adicionar
            </>
          )}
        </button>
      </div>
    </div>
  );
}
