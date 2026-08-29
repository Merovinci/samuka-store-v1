// -----------------------------------------------------------------------------
// src/components/ProductDetail.jsx
// Modal de Detalhes do Produto com sincronização de Imagem e Cor
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import { X, Heart, Star, Shirt, Check } from "lucide-react";
import { formatBRL } from "../data/products";

// Mapa de cores garantido para a visualização do protótipo
const LOCAL_COLOR_MAP = {
  Preto: "#09090b",
  Branco: "#f4f4f5",
  "Off-White": "#fafaf9",
  Cinza: "#52525b",
  "Cinza Claro": "#d4d4d8",
  Azul: "#1d4ed8",
  "Azul Marinho": "#1e3a8a",
  Vermelho: "#b91c1c",
  Vinho: "#881337",
  Verde: "#15803d",
  "Verde Militar": "#3f6212",
  Amarelo: "#eab308",
  Bege: "#d97706",
  Rosa: "#ec4899",
  Roxo: "#7e22ce",
};

export default function ProductDetail({
  product,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) {
  const [selectedColor, setSelectedColor] = useState(
    product?.colors ? product.colors[0] : "Preto"
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes ? product.sizes[2] || product.sizes[0] : "G"
  );
  const [added, setAdded] = useState(false);

  if (!product) return null;

  // Lógica de seleção dinâmica de Imagem baseada na Cor Selecionada
  const getCurrentImage = () => {
    if (!product.images) return null;

    // Se product.images for um objeto mapeando cores { Preto: "/img1.jpg", Azul: "/img2.jpg" }
    if (typeof product.images === "object" && !Array.isArray(product.images)) {
      return product.images[selectedColor] || Object.values(product.images)[0];
    }

    // Se product.images for um Array de objetos com propriedade de cor [{ color: "Preto", url: "..." }]
    if (Array.isArray(product.images) && typeof product.images[0] === "object") {
      const found = product.images.find((img) => img.color === selectedColor);
      return found ? found.url : product.images[0]?.url;
    }

    // Se for um Array simples de strings, busca o índice da cor correspondente
    if (Array.isArray(product.images)) {
      const colorIndex = product.colors ? product.colors.indexOf(selectedColor) : 0;
      return product.images[colorIndex] || product.images[0];
    }

    return product.images;
  };

  const currentImage = getCurrentImage();

  const isGradientPlaceholder =
    typeof currentImage === "string" && currentImage.startsWith("from-");

  // Cor Hexadecimal para a prévia quando não houver imagem física
  const getBgColor = (colorName) => {
    if (LOCAL_COLOR_MAP[colorName]) return LOCAL_COLOR_MAP[colorName];
    return colorName?.toLowerCase().includes("branc") ? "#ffffff" : "#27272a";
  };

  const activeBg = getBgColor(selectedColor);
  const isLightColor =
    selectedColor === "Branco" ||
    selectedColor === "Off-White" ||
    selectedColor === "Cinza Claro" ||
    selectedColor === "Amarelo";

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
        
        {/* Cabeçalho do Modal com Imagem / Preview Dinâmico */}
        <div
          className="relative aspect-square w-full transition-colors duration-500 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: currentImage ? "transparent" : activeBg }}
        >
          {currentImage ? (
            isGradientPlaceholder ? (
              <div
                className={`w-full h-full bg-gradient-to-br ${currentImage} flex items-center justify-center`}
              >
                <Shirt className="text-amber-400/70" size={80} strokeWidth={1} />
              </div>
            ) : (
              <img
                src={currentImage}
                alt={`${product.name} - ${selectedColor}`}
                className="w-full h-full object-cover transition-all duration-300"
              />
            )
          ) : (
            /* Mockup sem imagem física */
            <Shirt
              size={80}
              strokeWidth={1.2}
              className={`transition-all duration-300 ${
                isLightColor ? "text-zinc-900" : "text-amber-400"
              }`}
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
              className={isFavorite ? "text-amber-400" : "text-white"}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Informações e Seleções */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">{product.name}</h2>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                <Star size={14} fill="currentColor" />
                <span>4.9</span>
                <span className="text-zinc-500">(128)</span>
              </div>
            </div>
            <p className="text-amber-400 font-extrabold text-xl mt-1">
              {formatBRL(product.price)}
            </p>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              {product.description ||
                "Confeccionada em algodão premium. Toque macio, caimento perfeito e acabamento de alto padrão."}
            </p>
          </div>

          {/* Seletor de Cores Dinâmico */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-zinc-300 mb-2">
                COR: <span className="text-amber-400">{selectedColor}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => {
                  const hex = getBgColor(color);
                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: hex }}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "border-amber-400 scale-110 shadow-md shadow-amber-400/20 ring-2 ring-amber-400/40"
                          : "border-zinc-700 hover:scale-105"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Seletor de Tamanho */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-zinc-300 mb-2">
                TAMANHO: <span className="text-amber-400">{selectedSize}</span>
              </p>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? "bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/20"
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
            className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm transition-all shadow-lg shadow-amber-400/10"
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
