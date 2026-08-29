// -----------------------------------------------------------------------------
// src/components/ProductDetail.jsx
// Modal de Detalhes do Produto com seleção de Tamanhos e Cores
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import { X, Heart, Star, Shirt, Check } from "lucide-react";
import { COLOR_PALETTE, formatBRL } from "../data/products";

export default function ProductDetail({
  product,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0] : "Preto"
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[2] || product.sizes[0] : "G"
  );
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const currentImage = Array.isArray(product.images)
    ? product.images[0]
    : product.images[selectedColor] || Object.values(product.images)[0];

  const isGradientPlaceholder =
    typeof currentImage === "string" && currentImage.startsWith("from-");

  const handleAdd = () => {
    onAddToCart({
      ...product,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] flex flex-col justify-between shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Cabeçalho do Modal com Imagem */}
        <div className="relative aspect-square w-full bg-zinc-900 flex items-center justify-center">
          {isGradientPlaceholder ? (
            <div
              className={`w-full h-full bg-gradient-to-br ${currentImage} flex items-center justify-center`}
            >
              <Shirt className="text-gold/70" size={80} strokeWidth={1} />
            </div>
          ) : (
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}

          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Botão Favoritar */}
          <button
            onClick={() => onToggleFavorite(product.id)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black transition-colors z-10"
          >
            <Heart
              size={18}
              className={isFavorite ? "text-gold" : "text-white"}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Informações e Seleções */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">{product.name}</h2>
              <div className="flex items-center gap-1 text-gold text-xs font-semibold">
                <Star size={14} fill="currentColor" />
                <span>4.9</span>
                <span className="text-zinc-500">(128)</span>
              </div>
            </div>
            <p className="text-gold font-extrabold text-xl mt-1">
              {formatBRL(product.price)}
            </p>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              {product.description ||
                "Confeccionada em algodão premium. Toque macio, caimento perfeito e acabamento de alto padrão."}
            </p>
          </div>

          {/* Seletor de Cores */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-zinc-300 mb-2">
                COR: <span className="text-gold">{selectedColor}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: COLOR_PALETTE[color] || "#333" }}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-gold scale-110 shadow-md shadow-gold/20"
                        : "border-zinc-700 hover:scale-105"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Seletor de Tamanho */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-zinc-300 mb-2">
                TAMANHO: <span className="text-gold">{selectedSize}</span>
              </p>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? "bg-gold text-black border-gold shadow-md shadow-gold/20"
                        : "bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Botão Adicionar ao Carrinho */}
        <div className="p-4 border-t border-zinc-900 bg-zinc-950">
          <button
            onClick={handleAdd}
            className="w-full bg-gold hover:bg-gold-light text-black font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm transition-all shadow-lg shadow-gold/10"
          >
            {added ? (
              <>
                <Check size={18} /> Adicionado com Sucesso!
              </>
            ) : (
              `Adicionar ao Carrinho • ${formatBRL(product.price)}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
