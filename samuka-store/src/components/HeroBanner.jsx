// -----------------------------------------------------------------------------
// src/components/HeroBanner.jsx
// Carrossel Automático de Destaques / Peças Quentes
// -----------------------------------------------------------------------------

import React, { useState, useEffect } from "react";

const BANNERS = [
  {
    id: 1,
    tag: "NOVA COLEÇÃO",
    title: "ELEVE SEU ESTILO",
    subtitle: "Peças exclusivas com caimento de alto padrão.",
    image: "/products/banner1.png", // Imagem do banner 1
    buttonText: "Ver Coleção",
  },
  {
    id: 2,
    tag: "EM DESTAQUE",
    title: "KITS EXCLUSIVOS",
    subtitle: "Combine e monte o visual perfeito.",
    image: "/products/banner2.png", // Imagem do banner 2
    buttonText: "Conferir Kits",
  },
  {
    id: 3,
    tag: "OFERTA IMPERDÍVEL",
    title: "MAIS VENDIDOS",
    subtitle: "As peças mais procuradas da semana.",
    image: "/products/banner3.png", // Imagem do banner 3
    buttonText: "Aproveitar",
  },
];

export default function HeroBanner({ onBannerClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Alterna o slide automaticamente a cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const currentBanner = BANNERS[currentIndex];

  return (
    <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 my-4 shadow-lg group">
      {/* Imagem de Fundo Dinâmica */}
      {currentBanner.image && (
        <img
          src={currentBanner.image}
          alt={currentBanner.title}
          className="absolute inset-0 w-full h-full object-cover object-right opacity-60 transition-all duration-700 ease-in-out group-hover:scale-105"
        />
      )}

      {/* Sombreamento para leitura dos textos */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent p-5 flex flex-col justify-center z-10">
        <span className="text-[10px] font-bold text-gold tracking-widest uppercase">
          {currentBanner.tag}
        </span>
        <h2 className="text-xl font-extrabold text-white tracking-wide mt-1 drop-shadow-md">
          {currentBanner.title}
        </h2>
        <p className="text-xs text-zinc-300 mt-1 max-w-[65%] line-clamp-2">
          {currentBanner.subtitle}
        </p>

        <button
          onClick={() => onBannerClick && onBannerClick(currentBanner)}
          className="mt-3 w-fit bg-gold hover:bg-gold-light text-black text-xs font-bold px-4 py-2 rounded-xl transition-all duration-300 shadow-md shadow-gold/20"
        >
          {currentBanner.buttonText}
        </button>
      </div>

      {/* Indicadores de Páginas (Bolinhas do Carrossel) */}
      <div className="absolute bottom-3 right-4 z-20 flex gap-1.5">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "w-5 bg-gold"
                : "w-1.5 bg-zinc-600 hover:bg-zinc-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
