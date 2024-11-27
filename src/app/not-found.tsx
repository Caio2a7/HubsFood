export default function NotFound() {
    return (
      <div className="flex h-screen items-center justify-center flex-col bg-[#FFDED5] text-center">
        <h1 className="text-6xl font-bold text-[#FF3700]">404</h1>
        <p className="text-xl text-[#FF9B80] mt-4">Página não encontrada.</p>
        <a
          href="/"
          className="mt-6 px-6 py-3 text-white bg-[#FF3700] rounded-md hover:bg-[#FF9B80] transition"
        >
          Voltar para a página inicial
        </a>
      </div>
    );
  }
  