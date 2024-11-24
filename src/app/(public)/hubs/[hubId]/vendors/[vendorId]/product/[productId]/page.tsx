import { Product } from "@/ui/types/product";
import { getProductById } from "@/services/products/productGET"; // Supondo que você tenha esse método
import Link from "next/link";

// Página do Produto
export default async function ProductPage({ params }: { params: { hubId: string; vendorId: string; productId: string } }) {
  const hubId = parseInt(params.hubId, 10); // Obtendo o ID do Hub da URL
  const vendorId = parseInt(params.vendorId, 10); // Obtendo o ID do Vendedor da URL
  const productId = parseInt(params.productId, 10); // Obtendo o ID do Produto da URL

  // Buscando o produto pelo ID
  const productArray = await getProductById(productId);
  const product = productArray && productArray.length > 0 ? productArray[0] : null;

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Preço:</strong> R${product.price}</p>
      <Link href={`/hubs/${hubId}/vendors/${vendorId}`} passHref>
        <button>Voltar para o vendedor</button>
      </Link>
    </div>
  );
}
