// src/services/users/userGET.ts

import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Altere conforme sua API

// Função para buscar o usuário pelo id
export const getUserById = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/users?id=${userId}`);
    
    if (!response.data || response.data.length === 0) {
      throw new Error(`Usuário com id ${userId} não encontrado.`);
    }

    return response.data[0]; // Retorna o primeiro usuário encontrado
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw new Error("Erro ao buscar dados do usuário.");
  }
};
