// -----------------------------------------------------------------------------
// src/components/SplashScreen.jsx
// Tela de abertura com efeito Zoom-In e Fade na logo
// -----------------------------------------------------------------------------

import React, { useState, useEffect } from "react";

export default function SplashScreen({ onFinish }) {
  const [exiting, setExiting] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Dispara a animação assim que o componente é montado na tela
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setExiting(true);
    setTimeout(() => {
      onFinish();
    }, 300);
  };

  return (
    <div
      onClick={handleClick}
      className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center cursor-pointer select-none transition-opacity duration-300 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-black pointer-events-none" />

      {/* Imagem com efeito Zoom-In (vem do fundo/pequena e cresce) */}
      <img
        src="/logo.png.jpeg"
        alt="Samuka Store"
        className={`relative w-44 sm:w-56 md:w-64 rounded-2xl shadow-2xl transition-all duration-1000 ease-out transform ${
          animateIn
            ? "opacity-100 scale-100"
            : "opacity-0 scale-50"
        }`}
      />

      {/* Mensagem principal surgindo suavemente */}
      <p
        className={`relative mt-7 text-[11px] sm:text-xs tracking-[0.3em] text-zinc-300 font-bold uppercase text-center px-4 transition-all duration-1000 delay-300 ease-out transform ${
          animateIn
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        ESTILO QUE IMPÕE. QUALIDADE QUE FICA.
      </p>

      {/* Indicador de clique */}
      <p
        className={`relative mt-12 text-[10px] text-zinc-500 uppercase tracking-widest transition-opacity duration-700 delay-700 ${
          animateIn ? "opacity-100 animate-pulse" : "opacity-0"
        }`}
      >
        toque para continuar
      </p>
    </div>
  );
}
