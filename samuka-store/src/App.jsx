// -----------------------------------------------------------------------------
// src/App.jsx
// Componente principal: centraliza os estados (currentScreen, selectedCategory,
// cart, favorites, selectedProduct) e integra Header, CategoryFilter,
// ProductCard, ProductDetail e FooterBenefits em uma navegação por estado
// (SPA), sem reload de página.
// -----------------------------------------------------------------------------

import React, { useMemo, useState } from "react";
import { ShoppingBag, Heart, X, Minus, Plus, Check } from "lucide-react";
import { products } from "./data/products";

import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import FooterBenefits from "./components/FooterBenefits";

export default function App() {
  // currentScreen: "home" | "product" | "cart" | "favorites"
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
    <div className="max-w-md mx-auto min-h-screen bg-black flex flex-col font-sans">
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

      <div className="flex-1">
        {/* ---------------- HOME (listagem + filtros) ---------------- */}
        {currentScreen === "home" && (
          <div>
            <div className="pt-4">
              <CategoryFilter
                activeCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                activeSubcategory={selectedSubcategory}
                onSelectSubcategory={setSelectedSubcategory}
              />
            </div>

            {filteredProducts.length === 0 ? (
              <p className="text-center text-zinc-500 text-sm py-16">
                Nenhum produto encontrado.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3 px-4">
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
                      className="flex gap-3 bg-bg-soft border border-zinc-800 rounded-2xl p-3"
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
                          <div className="flex items-center gap-2 bg-black rounded-full px-2 py-1">
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

                <div className="flex justify-between text-base font-semibold text-white mb-5">
                  <span>Total</span>
                  <span className="text-gold">
                    {cartTotal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setCart([]);
                    setCurrentScreen("home");
                  }}
                  className="w-full bg-gold hover:bg-gold-light transition-colors text-black font-semibold py-3 rounded-full flex items-center justify-center gap-2"
                >
                  <Check size={18} /> Finalizar Compra
                </button>
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
    </div>
  );
}
