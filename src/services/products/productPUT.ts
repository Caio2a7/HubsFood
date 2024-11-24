import axios from "axios";

const API_URL = "http://localhost:3001"; // Altere se necessário para produção

// Função para atualizar um produto
export const updateProduct = async (
  productId: number,
  name: string,
  description: string,
  price: number,
  category: string,
  available: boolean
) => {
  try {
    const response = await axios.put(`${API_URL}/products/${productId}`, {
      name,
      description,
      price,
      category,
      available,
    });

    return response.data; // Retorna o produto atualizado
  } catch (error) {
    console.error("Erro ao atualizar o produto:", error);
    throw new Error("Não foi possível atualizar o produto.");
  }
};
