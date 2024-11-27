import axios from "axios";

const API_URL = "http://localhost:3001"; // Substitua pela URL correta no ambiente de produção

// Função para criar um pedido
export const postOrder = async (clientId: number, productId: number) => {
  try {
    // Obter todas as ordens existentes
    const response = await axios.get(`${API_URL}/orders`);
    const orders = response.data;

    // Encontrar o maior ID
    const maxId = orders.length > 0 ? Math.max(...orders.map((order: any) => Number(order.id) || 0)) : 0;
    const newId = maxId + 1;

    // Criar um novo pedido
    const newOrder = {
      id: newId,
      clientId,
      productId,
      status: "pending", // Status inicial
      createdAt: new Date().toISOString(), // Data atual no formato ISO
    };

    // Enviar o novo pedido para a API
    const postResponse = await axios.post(`${API_URL}/orders`, newOrder);

    // Retornar a resposta do pedido criado
    return postResponse.data;
  } catch (error) {
    console.error("Erro ao criar o pedido:", error);
    throw new Error("Não foi possível criar o pedido.");
  }
};
