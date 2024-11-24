import axios from 'axios';
import bcrypt from 'bcryptjs';

const API_URL = 'http://localhost:3001/users'; // URL para o json-server

export const register = async (email: string, password: string, role: string) => {
  try {
    // Criptografando a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Primeiro, obter todos os usuários para encontrar o maior ID
    const response = await axios.get(API_URL);
    const users = response.data;

    // Encontrar o maior ID existente
    const maxId = users.length > 0 ? Math.max(...users.map((user: any) => Number(user.id) || 0)) : 0;
    const newId = maxId + 1;

    // Criar o novo usuário com ID numérico
    const newUser = {
      id: newId,
      email,
      password: hashedPassword,
      role,
    };

    // Envia os dados do novo usuário para o json-server
    const postResponse = await axios.post(API_URL, newUser);

    // Se o registro foi bem-sucedido, redireciona para o login
    if (postResponse.status === 201) {
      console.log('Usuário registrado com sucesso!');
      return { success: true, message: 'Registro realizado com sucesso. Redirecionando para o login.' };
    }
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return { success: false, message: 'Erro ao registrar usuário. Tente novamente.' };
  }
};
