import Link from 'next/link';

const ServerErrorPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#FF9B80] text-center p-6">
      <h1 className="text-6xl font-bold text-white">500</h1>
      <p className="text-xl text-white mt-4">Algo deu errado no servidor. Estamos trabalhando para resolver isso.</p>
      <Link href="/">
        <a className="mt-6 px-6 py-3 text-[#FF3700] bg-white rounded-md hover:bg-[#FFDED5] transition">
          Voltar para a página inicial
        </a>
      </Link>
    </div>
  );
};

export default ServerErrorPage;
