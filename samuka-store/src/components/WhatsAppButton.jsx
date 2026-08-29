// -----------------------------------------------------------------------------
// src/components/WhatsAppButton.jsx
// Botão Flutuante do WhatsApp
// -----------------------------------------------------------------------------

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "5511963794400"; // Insira seu número com DDD aqui
  const message = encodeURIComponent("Olá! Gostaria de tirar algumas dúvidas sobre os produtos.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
    >
      <MessageCircle size={28} className="fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-sm font-bold pl-0 group-hover:pl-2">
        Falar no WhatsApp
      </span>
    </a>
  );
}
