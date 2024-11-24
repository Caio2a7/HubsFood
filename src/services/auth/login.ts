// src/services/auth/login.ts
export const login = async (email: string, password: string) => {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Passa os dados de login
    });
    const data = await response.json();
    if (response.ok) {
      console.log('Token gerado:', data.token);
      return data.token;
    } else {
      console.error('Erro no login:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Erro ao chamar a API:', error);
    return null;
  }
};
