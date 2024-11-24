import { Vendor } from "@/ui/types/vendor";
import { getVendorById } from "@/services/vendors/vendorGET";
import { getProductById } from "@/services/products/productGET";
import Link from "next/link";

// Página do Vendedor
export default async function VendorPage({ params }: { params: { hubId: string; vendorId: string } }) {
  const hubId = parseInt(params.hubId, 10); // Obtendo o ID do Hub da URL
  const vendorId = parseInt(params.vendorId, 10); // Obtendo o ID do Vendedor da URL

  // Buscando o vendedor pelo ID
  const vendorArray = await getVendorById(vendorId);
  const vendor:Vendor = vendorArray && vendorArray.length > 0 ? vendorArray[0] : null;

  if (!vendor) {
    return <p>Vendedor não encontrado.</p>;
  }

  // Buscando os produtos do vendedor usando os IDs contidos em `vendor.products`
  const productPromises = vendor.products.map((productId: number) => getProductById(productId));
  const productsArray = await Promise.all(productPromises);

  // Acessamos o primeiro item de cada array de produtos
  const products = productsArray.map((productArr: any) => productArr[0]);

  return (
    <div>
      <h1>{vendor.name}</h1>
      <p>{vendor.description}</p>
      <h2>Produtos</h2>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong>: {product.description} - Preço: R${product.price}
              <Link href={`/hubs/${hubId}/vendors/${vendor.id}/product/${product.id}`} passHref>
                <button>Ver detalhes do produto</button>
              </Link>
            </li>
          ))
        ) : (
          <p>Não há produtos disponíveis para este vendedor.</p>
        )}
      </ul>
      <Link href={`/hubs/${hubId}`} passHref>
        <button>Voltar para o hub</button>
      </Link>
    </div>
  );
}
