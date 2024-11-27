"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center flex-col bg-[#FF9B80] text-center">
      <h1 className="text-4xl font-bold text-white">Ops! Algo deu errado</h1>
      <p className="text-white mt-2">Erro: {error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-6 py-3 bg-white text-[#FF3700] rounded-md hover:bg-[#FFDED5] transition"
      >
        Tentar novamente
      </button>
    </div>
  );
}
