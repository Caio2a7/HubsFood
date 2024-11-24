import { NextResponse } from 'next/server';

export function middleware(req: any) {
  const token = req.cookies.get('token'); // Pegando o token dos cookies

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url)); // Redireciona para login se não houver token
  }

  // Definindo a URL base
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Envia o token para a API para verificar
  return fetch(`${siteUrl}/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  }).then((res) => {
    if (res.ok) {
      return NextResponse.next(); // Permite o acesso se a verificação for bem-sucedida
    } else {
      return NextResponse.redirect(new URL('/auth/login', req.url)); // Redireciona para login se a verificação falhar
    }
  }).catch((error) => {
    console.error('Erro ao verificar token:', error);
    return NextResponse.redirect(new URL('/auth/login', req.url)); // Se erro na requisição, redireciona para login
  });
}

// Configuração de páginas para usar o middleware
export const config = {
  matcher: ['/client/hubs', '/user/profile'], // Rotas protegidas que precisam de autenticação
};
