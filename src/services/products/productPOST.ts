import axios from "axios";

const API_URL = "http://localhost:3001"; // Altere se necessário para produção

// Função para criar um novo produto
export const createProduct = async (
  name: string,
  description: string,
  price: number,
  vendorId: number,
  category: string,
  available: boolean
) => {
  try {
    const response = await axios.post(`${API_URL}/products`, {
      name,
      description,
      price,
      vendorId,
      category,
      available,
    });

    return response.data; // Retorna o produto criado
  } catch (error) {
    console.error("Erro ao criar o produto:", error);
    throw new Error("Não foi possível criar o produto.");
  }
};
