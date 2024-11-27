import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#FFDED5] text-center p-6">
      <h1 className="text-6xl font-bold text-[#FF3700]">404</h1>
      <p className="text-xl text-[#FF9B80] mt-4">Ops! A página que você está procurando não foi encontrada.</p>
      <Link href="/">
        <a className="mt-6 px-6 py-3 text-white bg-[#FF3700] rounded-md hover:bg-[#FF9B80] transition">
          Voltar para a página inicial
        </a>
      </Link>
    </div>
  );
};

export default NotFoundPage;
