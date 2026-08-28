// -----------------------------------------------------------------------------
// src/App.jsx
// Componente principal: gerencia telas, seções da loja, carrinho via WhatsApp e suporte.
// -----------------------------------------------------------------------------

import React, { useMemo, useState } from "react";
import { ShoppingBag, Heart, X, Minus, Plus, MessageCircle, ArrowRight } from "lucide-react";
import { products } from "./data/products";

import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import FooterBenefits from "./components/FooterBenefits";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedSubcategory && p.subcategory !== selectedSubcategory)
        return false;
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [selectedCategory, selectedSubcategory, searchQuery]);

  const bestSellers = useMemo(() => {
    return products.filter((p) => p.tag === "MAIS VENDIDO").slice(0, 4);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const addToCart = (item) => {
    const key = `${item.id}-${item.color}-${item.size}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, key, qty: 1 }];
    });
  };

  const updateCartQty = (key, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === key
            ? { ...item, qty: Math.max(1, item.qty + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (key) =>
    setCart((prev) => prev.filter((item) => item.key !== key));

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setCurrentScreen("product");
  };

  const favoriteProducts = products.filter((p) => favorites.has(p.id));
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black flex flex-col font-sans relative">
      <Header
        onLogoClick={() => setCurrentScreen("home")}
        onCartClick={() => setCurrentScreen("cart")}
        onFavoritesClick={() => setCurrentScreen("favorites")}
        cartCount={cartCount}
        favoritesCount={favorites.size}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentScreen("home");
        }}
      />

      <div className="flex-1 pb-16">
        {/* ---------------- HOME ---------------- */}
        {currentScreen === "home" && (
          <div>
            {/* Banner Principal / Hero */}
            {!selectedCategory && !searchQuery && (
              <div className="px-4 pt-4 mb-4">
                <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-end min-h-[180px]">
                  <span className="text-gold text-[10px] font-bold tracking-widest uppercase mb-1">
                    Nova Coleção
                  </span>
                  <h2 className="text-xl font-bold text-white leading-tight uppercase mb-2">
                    Eleve Seu Estilo
                  </h2>
                  <p className="text-zinc-400 text-xs mb-4">
                    Peças exclusivas com caimento de alto padrão.
                  </p>
                  <button className="bg-gold hover:bg-gold-light text-black text-xs font-bold py-2 px-4 rounded-full w-fit">
                    Ver Coleção
                  </button>
                </div>
              </div>
            )}

            {/* Carrossel de Categorias Circulares */}
            <CategoryFilter
              activeCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              activeSubcategory={selectedSubcategory}
              onSelectSubcategory={setSelectedSubcategory}
            />

            {/* Vitrine / Listagem de Produtos */}
            {filteredProducts.length === 0 ? (
              <p className="text-center text-zinc-500 text-sm py-16">
                Nenhum produto encontrado.
              </p>
            ) : (
              <div className="space-y-6">
                {/* Seção Mais Vendidos (quando sem filtro ativo) */}
                {!selectedCategory && !searchQuery && bestSellers.length > 0 && (
                  <div className="px-4">
                    <div className="flex justify-between items-end mb-3">
                      <div>
                        <span className="text-[10px] text-gold font-bold uppercase tracking-wider">
                          Destaques
                        </span>
                        <h3 className="text-base font-bold text-white">
                          Mais Vendidos
                        </h3>
                      </div>
                      <button className="text-xs text-zinc-400 flex items-center gap-1 hover:text-gold">
                        Ver todos <ArrowRight size={12} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {bestSellers.map((product) => (
                        <ProductCard
                          key={`best-${product.id}`}
                          product={product}
                          isFavorite={favorites.has(product.id)}
                          onToggleFavorite={toggleFavorite}
                          onAddToCart={addToCart}
                          onOpenDetail={openProductDetail}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Grid Principal / Catálogo Completo */}
                <div className="px-4">
                  {!selectedCategory && !searchQuery && (
                    <div className="flex justify-between items-end mb-3">
                      <div>
                        <span className="text-[10px] text-gold font-bold uppercase tracking-wider">
                          Em Alta
                        </span>
                        <h3 className="text-base font-bold text-white">
                          Todos os Produtos
                        </h3>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isFavorite={favorites.has(product.id)}
                        onToggleFavorite={toggleFavorite}
                        onAddToCart={addToCart}
                        onOpenDetail={openProductDetail}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <FooterBenefits />
          </div>
        )}

        {/* ---------------- PRODUTO (PDP) ---------------- */}
        {currentScreen === "product" && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            isFavorite={favorites.has(selectedProduct.id)}
            onToggleFavorite={toggleFavorite}
            onBack={() => setCurrentScreen("home")}
            onAddToCart={addToCart}
          />
        )}

        {/* ---------------- CARRINHO ---------------- */}
        {currentScreen === "cart" && (
          <div className="px-4 py-4">
            <h2 className="text-lg font-semibold text-white mb-4">
              Meu Carrinho
            </h2>
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag size={36} className="text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-500 text-sm">
                  Seu carrinho está vazio.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.key}
                      className="flex gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-3"
                    >
                      <div
                        className={`bg-gradient-to-br ${item.images[0]} w-16 h-16 rounded-xl shrink-0`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-sm text-white truncate">
                            {item.name}
                          </p>
                          <button onClick={() => removeFromCart(item.key)}>
                            <X size={16} className="text-zinc-500" />
                          </button>
                        </div>
                        <p className="text-[11px] text-zinc-500 mb-2">
                          {item.color} · {item.size}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-black rounded-full px-2 py-1 border border-zinc-800">
                            <button onClick={() => updateCartQty(item.key, -1)}>
                              <Minus size={12} className="text-zinc-400" />
                            </button>
                            <span className="text-xs text-white w-4 text-center">
                              {item.qty}
                            </span>
                            <button onClick={() => updateCartQty(item.key, 1)}>
                              <Plus size={12} className="text-zinc-400" />
                            </button>
                          </div>
                          <p className="text-gold text-sm font-semibold">
                            {(item.price * item.qty).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resumo e Botões de Ação */}
                <div className="border-t border-zinc-800 pt-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-base font-semibold text-white mb-2">
                    <span>Total:</span>
                    <span className="text-gold text-lg">
                      {cartTotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>

                  {/* Botão Comprar pelo WhatsApp */}
                  <button
                    onClick={() => {
                      const PHONE_NUMBER = "5511963794400"; // Substitua pelo seu número com DDD (ex: 5511999998888)

                      const itemsList = cart
                        .map(
                          (i) =>
                            `• ${i.qty}x ${i.name} (${i.color} / ${i.size}) - R$ ${(
                              i.price * i.qty
                            ).toFixed(2)}`
                        )
                        .join("\n");

                      const totalFormatted = cartTotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      });

                      const message = `Olá! Gostaria de finalizar meu pedido:\n\n${itemsList}\n\n*Total:* ${totalFormatted}`;
                      const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
                        message
                      )}`;

                      window.open(whatsappUrl, "_blank");
                    }}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} /> Comprar pelo WhatsApp
                  </button>

                  {/* Botão Continuar Comprando */}
                  <button
                    onClick={() => setCurrentScreen("home")}
                    className="w-full bg-transparent hover:bg-zinc-900 border border-zinc-700 text-zinc-300 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingBag size={18} /> Continuar Comprando
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ---------------- FAVORITOS ---------------- */}
        {currentScreen === "favorites" && (
          <div className="px-4 py-4">
            <h2 className="text-lg font-semibold text-white mb-4">
              Favoritos
            </h2>
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-20">
                <Heart size={36} className="text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-500 text-sm">
                  Você ainda não favoritou nenhum produto.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {favoriteProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite
                    onToggleFavorite={toggleFavorite}
                    onAddToCart={addToCart}
                    onOpenDetail={openProductDetail}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botão Flutuante de WhatsApp (Suporte Geral) */}
      <a
        href="https://wa.me/5500000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full shadow-lg z-50 transition-transform hover:scale-110 flex items-center justify-center"
        aria-label="Atendimento via WhatsApp"
      >
        <MessageCircle size={24} fill="currentColor" />
      </a>
    </div>
  );
}
