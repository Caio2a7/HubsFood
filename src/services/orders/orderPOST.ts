import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Altere se necessário para produção

// Função para criar um pedido
export const postOrder = async (clientId: number, productId: number) => {
  try {
    // Primeiro, obter todos os pedidos para encontrar o maior ID
    const response = await axios.get(`${API_URL}/orders`);
    const orders = response.data;

    // Encontrar o maior ID existente
    const maxId = orders.length > 0 ? Math.max(...orders.map((order: any) => Number(order.id) || 0)) : 0;
    const newId = maxId + 1;

    // Criar o novo pedido com ID numérico
    const newOrder = {
      id: newId,
      clientId,
      productId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Enviar o novo pedido para o servidor
    const postResponse = await axios.post(`${API_URL}/orders`, newOrder);

    return postResponse.data; // Retorna o pedido criado
  } catch (error) {
    console.error('Erro ao criar o pedido:', error);
    throw new Error('Não foi possível criar o pedido.');
  }
};
