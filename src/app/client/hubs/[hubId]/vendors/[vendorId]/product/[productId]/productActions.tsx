"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Product } from "@/ui/types/product";

interface ProductActionsProps {
  product: Product; // Produto completo
}

const ProductActions = ({ product }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleAddToCart = () => {
    // Dados do produto que serão armazenados no cookie
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.imagePath,
    };

    // Obtém os itens existentes no carrinho do cookie
    const existingCart = Cookies.get("cart");
    const cart = existingCart ? JSON.parse(existingCart) : [];

    // Adiciona o novo item ao carrinho
    const updatedCart = [...cart, cartItem];

    // Salva o carrinho atualizado no cookie
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 1 }); // Expira em 1 dia

    // Redireciona para a página do carrinho
    router.push("/client/carrinho");
  };

  return (
    <div className="mt-6 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-200 px-4 py-2 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
        >
          -
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="bg-gray-200 px-4 py-2 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-[#f17575] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#ff6b6b] transition"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductActions;
