"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const cartData = Cookies.get("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    router.push("/client/pagamento"); // Redireciona para a página de seleção de pagamento
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto py-10 px-6">
        {cart.length === 0 ? (
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">Seu carrinho está vazio</h2>
            <a href="/" className="text-[#FF6B6B] font-medium hover:underline">
              Continue comprando
            </a>
          </div>
        ) : (
          <>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Itens no Carrinho</h2>
              <ul>
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-4 border-b border-gray-200 last:border-none"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.imagePath ? item.imagePath : "/imagens/restaurante.png"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md shadow-md"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                        <p className="text-gray-600 text-sm">R$ {item.price.toFixed(2)}</p>
                        <p className="text-gray-600 text-sm">Quantidade: {item.quantity}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 hover:text-red-700 ms-10 font-medium"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center mt-8">
              <div className="text-xl font-bold text-gray-800">Total: R$ {totalPrice.toFixed(2)}</div>
              <button
                onClick={handleCheckout}
                className="bg-[#FF6B6B] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#ff4f4f] transition"
              >
                Ir para Pagamento
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
