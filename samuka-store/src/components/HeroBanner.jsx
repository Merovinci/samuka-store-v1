// -----------------------------------------------------------------------------
// src/components/HeroBanner.jsx
// Carrossel Automático Responsivo
// -----------------------------------------------------------------------------

import React, { useState, useEffect } from "react";

const BANNERS = [
  {
    id: 1,
    tag: "NOVA COLEÇÃO",
    title: "ELEVE SEU ESTILO",
    subtitle: "Peças exclusivas com caimento de alto padrão.",
    image: "/products/banner1.png.jpg",
    buttonText: "Ver Coleção",
  },
  {
    id: 2,
    tag: "EM DESTAQUE",
    title: "KITS EXCLUSIVOS",
    subtitle: "Combine e monte o visual perfeito.",
    image: "/products/banner2.png.webp",
    buttonText: "Conferir Kits",
  },
  {
    id: 3,
    tag: "OFERTA IMPERDÍVEL",
    title: "MAIS VENDIDOS",
    subtitle: "As peças mais procuradas da semana.",
    image: "/products/banner3.png.webp",
    buttonText: "Aproveitar",
  },
];

export default function HeroBanner({ onBannerClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const currentBanner = BANNERS[currentIndex];

  return (
    <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 my-4 sm:my-6 shadow-lg group">
      {/* Imagem de Fundo Dinâmica (Opacidade 100% para mostrar a peça limpa) */}
      {currentBanner.image && (
        <img
          src={currentBanner.image}
          alt={currentBanner.title}
          className="absolute inset-0 w-full h-full object-cover object-right opacity-100 transition-all duration-700 ease-in-out group-hover:scale-105"
        />
      )}

      {/* Sombreamento leve apenas na esquerda para garantir leitura perfeita dos textos */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent p-5 sm:p-8 flex flex-col justify-center z-10">
        <span className="text-[10px] sm:text-xs font-bold text-gold tracking-widest uppercase drop-shadow">
          {currentBanner.tag}
        </span>
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide mt-1 drop-shadow-lg">
          {currentBanner.title}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-100 mt-1 sm:mt-2 max-w-[80%] sm:max-w-[50%] line-clamp-2 drop-shadow-md font-medium">
          {currentBanner.subtitle}
        </p>

        <button
          onClick={() => onBannerClick && onBannerClick(currentBanner)}
          className="mt-3 sm:mt-5 w-fit bg-gold hover:bg-gold-light text-black text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-gold/20"
        >
          {currentBanner.buttonText}
        </button>
      </div>

      {/* Indicadores de Páginas */}
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
