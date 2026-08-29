// -----------------------------------------------------------------------------
// src/App.jsx
// Aplicação principal com SplashScreen e WhatsAppButton inclusos
// -----------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import FooterBenefits from "./components/FooterBenefits";
import SplashScreen from "./components/SplashScreen";
import WhatsAppButton from "./components/WhatsAppButton";
import PRODUCTS from "./data/products";
import { ShoppingBag, X, Trash2, ArrowRight } from "lucide-react";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [products] = useState(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Controla o tempo de exibição do SplashScreen
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // 2.5 segundos de Splash
    return () => clearTimeout(timer);
  }, []);

  // Alterna produtos favoritos
  const handleToggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Adiciona item ao carrinho
  const handleAddToCart = (productWithDetails) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.id === productWithDetails.id &&
          item.color === productWithDetails.color &&
          item.size === productWithDetails.size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += productWithDetails.quantity || 1;
        return updated;
      }

      return [
        ...prevCart,
        { ...productWithDetails, quantity: productWithDetails.quantity || 1 },
      ];
    });
  };

  // Remove item do carrinho
  const handleRemoveFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Filtra lista por categoria e busca
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "todos" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cálculo total do carrinho
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Finalização do pedido no WhatsApp
  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    let message = "*NOVO PEDIDO - SAMUKA STORE*\n\n";
    cart.forEach((item, i) => {
      message += `${i + 1}. *${item.name}*\n`;
      message += `   Cor: ${item.color} | Tam: ${item.size} | Qtd: ${item.quantity}\n`;
      message += `   Valor: R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    message += `*TOTAL:* R$ ${cartTotal.toFixed(2)}`;

    const phone = "5511963794400";
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-gold selection:text-black flex flex-col justify-between relative">
      {/* 1. Tela de Carregamento Inicial (Splash) */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Container Responsivo Fluido */}
      <div className="w-full max-w-7xl mx-auto min-h-screen flex flex-col justify-between bg-zinc-950 shadow-2xl relative">
        <div>
          {/* Cabeçalho */}
          <Header
            onLogoClick={() => setSelectedCategory("todos")}
            onCartClick={() => setIsCartOpen(true)}
            onFavoritesClick={() => {}}
            cartCount={totalCartItems}
            favoritesCount={favorites.length}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <main className="px-4 sm:px-6 lg:px-8 pb-12">
            {/* Banner Carrossel Automático */}
            <HeroBanner
              onBannerClick={(banner) => console.log("Clicou no banner:", banner.title)}
            />

            {/* Categorias Circular Nav */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Título da Seção */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                {selectedCategory === "todos"
                  ? "Destaques"
                  : selectedCategory}
              </h3>
              <span className="text-xs sm:text-sm text-zinc-500">
                {filteredProducts.length} itens
              </span>
            </div>

            {/* Grid de Produtos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onAddToCart={handleAddToCart}
                  onOpenDetail={setSelectedProduct}
                />
              ))}
            </div>

            {/* Vazio / Busca Sem Resultado */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-zinc-500">
                <p className="text-sm">Nenhum produto encontrado.</p>
              </div>
            )}
          </main>
        </div>

        {/* Rodapé com Benefícios */}
        <FooterBenefits />

        {/* Modal Detalhes do Produto */}
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            isFavorite={favorites.includes(selectedProduct.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* Drawer de Carrinho de Compras */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
            <div className="w-full max-w-md bg-zinc-900 h-full flex flex-col justify-between p-4 sm:p-6 border-l border-zinc-800 animate-in slide-in-from-right duration-300">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-2 text-gold font-bold">
                    <ShoppingBag size={20} />
                    <span>Seu Carrinho</span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-zinc-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Lista de Itens do Carrinho */}
                <div className="divide-y divide-zinc-800 max-h-[60vh] overflow-y-auto mt-2">
                  {cart.length === 0 ? (
                    <p className="text-center text-zinc-500 py-8 text-sm">
                      Seu carrinho está vazio.
                    </p>
                  ) : (
                    cart.map((item, index) => (
                      <div key={index} className="py-3 flex justify-between items-center">
                        <div>
                          <p className="text-xs sm:text-sm text-zinc-200 font-semibold">{item.name}</p>
                          <p className="text-[10px] sm:text-xs text-zinc-400">
                            Cor: {item.color} | Tam: {item.size} | Qtd: {item.quantity}
                          </p>
                          <p className="text-xs sm:text-sm text-gold font-bold mt-0.5">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(index)}
                          className="text-zinc-600 hover:text-red-400 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Botão de Finalizar */}
              {cart.length > 0 && (
                <div className="pt-4 border-t border-zinc-800">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs sm:text-sm text-zinc-400">Total:</span>
                    <span className="text-base sm:text-lg font-bold text-gold">
                      R$ {cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckoutWhatsApp}
                    className="w-full bg-gold hover:bg-gold-light text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors"
                  >
                    Finalizar no WhatsApp <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Botão Flutuante do WhatsApp */}
      <WhatsAppButton />
    </div>
  );
}
