import axios from "axios";

const API_URL = "http://localhost:3001"; // Atualize para produção se necessário

export const updateUser = async (
  userId: string,
  updates: Partial<{
    username: string;
    email: string;
    imagePath: string;
    cardInfo: {
      nameOnCard: string;
      cardNumber: string;
      cvv: string;
      expirationDate: string;
    };
  }>
) => {
  try {
    // Use PATCH para atualizar apenas campos específicos
    const response = await axios.patch(`${API_URL}/users/${userId}`, updates);
    return response.data; // Retorna o usuário atualizado
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error);
    throw new Error("Não foi possível atualizar o usuário.");
  }
};
