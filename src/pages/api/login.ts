// src/pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Usando require para pacotes que não são ES6
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'simple_secret';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Pegando o usuário do json-server, por exemplo:
      const user = await fetch(`http://localhost:3001/users?email=${email}`)
        .then((response) => response.json())
        .then((data) => data[0]); // Pegando o primeiro usuário que corresponde ao email

      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado.' });
      }

      // Comparar a senha com o bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Senha incorreta.' });
      }

      // Gerar o token JWT
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Erro no servidor.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
