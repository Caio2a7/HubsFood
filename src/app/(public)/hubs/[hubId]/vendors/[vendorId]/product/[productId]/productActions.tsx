"use client"; // Este componente é interativo e precisa ser um Client Component

import React, { useState } from "react";

export function ProductActions({ price }: { price: number }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = () => {
    console.log(`Adicionado ao carrinho: ${quantity} unidades. Total: R$${(price * quantity).toFixed(2)}`);
    // Adicione aqui a lógica para integração com o carrinho
  };

  return (
    <div className="flex items-center gap-4 mt-6">
      {/* Botões de quantidade */}
      <div className="flex items-center gap-2">
        <button
          className="bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          onClick={decreaseQuantity}
        >
          -
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button
          className="bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
      {/* Botão de Adicionar ao Carrinho */}
      <button
        className="bg-[#FF3700] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#FF7A55] transition"
        onClick={addToCart}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
