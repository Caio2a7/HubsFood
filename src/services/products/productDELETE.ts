import axios from "axios";

const API_URL = "http://localhost:3001"; // Altere se necessário para produção

// Função para deletar um produto
export const deleteProduct = async (productId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${productId}`);
    return response.data; // Retorna a resposta após exclusão
  } catch (error) {
    console.error("Erro ao excluir o produto:", error);
    throw new Error("Não foi possível excluir o produto.");
  }
};
