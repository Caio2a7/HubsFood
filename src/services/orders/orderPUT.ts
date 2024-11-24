import axios from "axios";

const API_URL = "http://localhost:3001"; // Ajuste conforme necessário

// Função para atualizar o status de um pedido
export const updateOrderStatus = async (orderId: number, status: string) => {
  try {
    const response = await axios.put(`${API_URL}/orders/${orderId}`, { status });
    if (response.status !== 200) {
      throw new Error("Erro ao atualizar o status do pedido.");
    }
    return response.data; // Retorna o pedido atualizado
  } catch (error) {
    console.error("Erro ao atualizar o pedido:", error);
    throw error;
  }
};
