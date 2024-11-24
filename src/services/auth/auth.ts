// src/services/auth/auth.ts
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'simple_secret'; // Sua chave secreta

// Função para verificar o token JWT
export const verifyToken = (token: string) => {
  try {
    console.log(`${token}`)
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(`DOCE${decoded}`)
    return decoded; // Retorna os dados do token se for válido
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
};

// Função para verificar a role
export const checkRole = (decoded: any, requiredRole: string) => {
  if (decoded.role !== requiredRole) {
    throw new Error('Acesso não autorizado');
  }
};
