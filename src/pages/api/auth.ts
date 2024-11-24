// src/pages/api/auth/verify.ts
import { NextApiRequest, NextApiResponse } from 'next';
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'simple_secret';  // Defina o segredo que você usa para gerar os tokens

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token } = req.body;  // Pegando o token do corpo da requisição

    if (!token) {
      return res.status(400).json({ error: 'Token não fornecido' });
    }

    try {
      // Verificar o token JWT
      console.log(token)
      const decoded = jwt.verify(token.value, JWT_SECRET);  // Verificando o token

      // Aqui você pode verificar a role ou outras informações, se necessário
      if (decoded.role !== 'client') {
        return res.status(403).json({ error: 'Role inválida' });  // Role não permitida
      }

      // Se tudo estiver certo, retorna sucesso
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });  // Erro na verificação do token
    }
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
