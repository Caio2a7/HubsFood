import axios from "axios";

const API_URL = "http://localhost:3001"; // Ajuste conforme necessário

// Função para atualizar parcialmente o status de um pedido
export const patchOrderStatus = async (orderId: number, clientId: number, productId: number, status: string, createdAt: string) => {
  try {
    // Usando PATCH em vez de PUT
    const response = await axios.patch(`${API_URL}/orders/${orderId}`, {
      clientId,       // Não é necessário enviar todos os campos, apenas os que você deseja atualizar
      productId,
      status,         // Apenas o status é alterado
      createdAt,      // O createdAt pode ser enviado se necessário, ou pode ser omitido dependendo da implementação do backend
    });
    
    return response.data; // Retorna o pedido atualizado
  } catch (error) {
    console.error("Erro ao atualizar o pedido:", error);
    throw error; // Lança erro se a requisição falhar
  }
};
