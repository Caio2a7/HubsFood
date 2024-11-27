"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { postOrder } from "@/services/orders/orderPOST";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";

export default function CardPage() {
  const [cart, setCart] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartData = Cookies.get("cart");
    if (cartData) {
      const parsedCart = JSON.parse(cartData);
      setCart(parsedCart);
      setTotalPrice(parsedCart.reduce((total, item) => total + item.price * item.quantity, 0));
    }
  }, []);

  const handlePayment = async () => {
    try {
      const clientId = 1; // Substitua pelo ID real do cliente
      for (const item of cart) {
        await postOrder(clientId, item.id);
      }
      setSuccessMessage("Pagamento realizado com sucesso!");
      setCart([]);
      Cookies.remove("cart"); // Limpa o carrinho após o pagamento
    } catch (error) {
      console.error("Erro ao processar o pagamento:", error);
      alert("Erro ao processar o pagamento. Tente novamente.");
    }
  };

  const handleCardSelection = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto py-10 px-6">
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-[#FF7A55] mb-6">Pagamento por Cartão</h1>
          {successMessage ? (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
              {successMessage}
            </div>
          ) : (
            <>
              {/* Resumo do Pedido */}
              <div className="bg-gray-100 w-full p-4 rounded-lg shadow-inner mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-2">Resumo do Pedido</h2>
                <ul className="text-gray-700 mb-2">
                  {cart.map((item, index) => (
                    <li key={index} className="mb-1">
                      {item.name} - {item.quantity}x (R$ {item.price.toFixed(2)})
                    </li>
                  ))}
                </ul>
                <p className="text-lg">
                  <strong>Total a pagar:</strong>{" "}
                  <span className="text-[#FF7A55] font-bold">R$ {totalPrice.toFixed(2)}</span>
                </p>
              </div>

              {/* Seleção do Cartão */}
              <div className="w-full mb-6">
                <label
                  htmlFor="cardDropdown"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Selecione um cartão:
                </label>
                <select
                  id="cardDropdown"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF7A55] focus:outline-none"
                  onChange={(e) => handleCardSelection(e.target.value)}
                >
                  <option value="" disabled selected>
                    Selecione
                  </option>
                  <option value="visa">Visa - **** 1234</option>
                  <option value="mastercard">MasterCard - **** 5678</option>
                  <option value="amex">Amex - **** 9012</option>
                </select>
              </div>

              {/* Detalhes do Cartão */}
              {selectedCard && (
                <div className="bg-gray-100 p-4 rounded-lg shadow-inner w-full mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">Detalhes do Cartão</h2>
                  <p className="text-gray-700">
                    <strong>Cartão Selecionado:</strong> {selectedCard}
                  </p>
                  <p className="text-gray-700">
                    <strong>Nome no Cartão:</strong> João Domingus
                  </p>
                  <p className="text-gray-700">
                    <strong>Data de Expiração:</strong> 12/2026
                  </p>
                </div>
              )}

              {/* Botão de Pagamento */}
              <button
                onClick={handlePayment}
                disabled={!selectedCard}
                className={`${
                  selectedCard
                    ? "bg-[#FF7A55] hover:bg-[#ff4f4f]"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white font-semibold px-6 py-3 rounded-lg transition w-full`}
              >
                Pagar
              </button>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
