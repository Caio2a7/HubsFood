import { Product } from "@/ui/types/product";
import { getProductById } from "@/services/products/productGET";
import Footer from "@/ui/components/Footer";
import ProductActions from "./productActions";
import Header from "@/ui/components/Header";

export default async function ProductPage({
  params,
}: {
  params: { hubId: string; vendorId: string; productId: string };
}) {
  const hubId = parseInt(params.hubId, 10);
  const vendorId = parseInt(params.vendorId, 10);
  const productId = parseInt(params.productId, 10);

  const productArray = await getProductById(productId);
  const product = productArray && productArray.length > 0 ? productArray[0] : null;

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div className="bg-gradient-to-b from-orange-50 to-gray-100 min-h-screen flex flex-col">
      <Header />
      <header className="bg-[#f17575] text-white p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/imagens/icon_midway.png" alt="Imagem do Hub" className="w-36 h-38 object-cover" />
            <div>
              <h2 className="text-lg font-bold">Hub: Nome do Hub</h2>
              <p className="text-sm">Telefone: (84) 9 8888-8888</p>
              <p className="text-sm">Horário de funcionamento: 10h às 20h</p>
              <p className="text-sm font-semibold text-green-300">Aberto</p>
            </div>
          </div>
          <a
            href="https://wa.me/5584988888888"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 bg-white text-[#f17575] font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Iniciar Chat
          </a>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={product.image || "/imagens/restaurante.png"}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold text-[#f17575]">{product.name}</h1>
            <p className="text-gray-700 mt-4">{product.description}</p>
            <p className="text-lg font-semibold text-[#FF3700] mt-6">Preço: R${product.price}</p>

            {/* Passando o produto inteiro como prop */}
            <ProductActions product={product} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
