// -----------------------------------------------------------------------------
// src/components/ProductCard.jsx
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
      size: product.sizes ? product.sizes[0] : "G",
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  // Pega a imagem da cor selecionada ou fallback
  const currentImage = Array.isArray(product.images)
    ? product.images[0]
    : product.images[selectedColor] || Object.values(product.images)[0];

  const isGradientPlaceholder =
    typeof currentImage === "string" && currentImage.startsWith("from-");
  const installmentValue = (product.price / 12).toFixed(2).replace(".", ",");

  return (
    <div
      onClick={() => onOpenDetail && onOpenDetail(product)}
      className="bg-bg-soft border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-gold/50 transition-all flex flex-col justify-between group"
    >
      <div>
        {/* Imagem do Produto */}
        <div className="aspect-square relative overflow-hidden bg-zinc-900 flex items-center justify-center">
          {isGradientPlaceholder ? (
            <div
              className={`w-full h-full bg-gradient-to-br ${currentImage} flex items-center justify-center`}
            >
              <Shirt
                className="text-gold/70 group-hover:scale-110 transition-transform duration-300"
                size={42}
                strokeWidth={1.25}
              />
            </div>
          ) : (
            <img
              src={currentImage}
              alt={`${product.name} - ${selectedColor}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}

          {product.tag && (
            <span className="absolute top-2 left-2 bg-black/80 backdrop-blur-md text-gold text-[9px] font-bold tracking-wider px-2 py-1 rounded-md border border-gold/30 uppercase">
              {product.tag}
            </span>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product.id);
            }}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-black/80 transition-colors"
          >
            <Heart
              size={16}
              className={isFavorite ? "text-gold" : "text-white"}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Informações */}
        <div className="p-3">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
            {product.category}
          </p>
          <p className="text-xs text-zinc-200 font-medium truncate mt-0.5">
            {product.name}
          </p>
          <p className="text-gold font-bold text-sm mt-1">
            {formatBRL(product.price)}
          </p>
          <p className="text-[10px] text-zinc-400">
            ou 12x de R$ {installmentValue}
          </p>

          {/* Seletor de Cores */}
          {product.colors && product.colors.length > 1 && (
            <div
              className="flex gap-1.5 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  style={{ backgroundColor: COLOR_PALETTE[c] || "#333" }}
                  title={c}
                  className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                    selectedColor === c
                      ? "border-gold scale-125"
                      : "border-zinc-700 hover:scale-110"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Botão Adicionar Rápido */}
      <div className="p-3 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-1.5 bg-gold hover:bg-gold-light transition-colors text-black text-xs font-semibold py-2 rounded-xl"
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
