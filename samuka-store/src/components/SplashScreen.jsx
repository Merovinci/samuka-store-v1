// -----------------------------------------------------------------------------
// src/components/SplashScreen.jsx
// Tela de abertura (Splash) com suporte a clique e animação leve
// -----------------------------------------------------------------------------

import React, { useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [exiting, setExiting] = useState(false);

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

      {/* Imagem com caminho correto da pasta public */}
      <img
        src="/public/logo.png.jpeg"
        alt="Samuka Store"
        className="relative w-44 sm:w-56 md:w-64 rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105"
      />

      {/* Mensagem principal */}
      <p className="relative mt-7 text-[11px] sm:text-xs tracking-[0.3em] text-zinc-300 font-bold uppercase text-center px-4">
        ESTILO QUE IMPÕE. QUALIDADE QUE FICA.
      </p>

      {/* Indicador de clique */}
      <p className="relative mt-12 text-[10px] text-zinc-500 uppercase tracking-widest animate-pulse">
        toque para continuar
      </p>
    </div>
  );
}
