import '@/ui/assets/styles/global.css'; // ou o caminho do seu arquivo tailwind.css
import React from 'react';

export const metadata = {
  title: 'Meu App',
  description: 'Descrição do Meu App',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
