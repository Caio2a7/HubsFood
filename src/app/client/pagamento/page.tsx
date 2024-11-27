"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";

export default function Payment() {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartData = Cookies.get("cart");
    if (cartData) {
      const parsedCart = JSON.parse(cartData);
      setTotalPrice(parsedCart.reduce((total, item) => total + item.price * item.quantity, 0));
    }
  }, []);

  const handlePayment = (method) => {
    if (method === "pix") {
      router.push("/client/pix");
    } else if (method === "cartao") {
      router.push("/client/cartao");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto py-10 px-6">
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-[#FF7A55] mb-6">Forma de Pagamento</h1>
          <div className="bg-gray-100 w-full p-4 rounded-lg shadow-inner mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Resumo</h2>
            <p className="text-lg">
              <strong>Total:</strong>{" "}
              <span className="text-[#FF7A55] font-bold">R$ {totalPrice.toFixed(2)}</span>
            </p>
          </div>

          <div className="w-full space-y-4">
            <button
              onClick={() => handlePayment("pix")}
              className="w-full bg-[#FF7A55] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#ff4f4f] transition"
            >
              Pagar com Pix
            </button>
            <button
              onClick={() => handlePayment("cartao")}
              className="w-full bg-[#0077FF] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#005BB5] transition"
            >
              Pagar com Cartão de Crédito
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
