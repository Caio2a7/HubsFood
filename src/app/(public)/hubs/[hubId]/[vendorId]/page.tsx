// src/app/(public)/hubs/[hubId]/[vendorId].tsx
import { Vendor } from "@/ui/types/vendor";
import { getVendorById } from "@/ui/utils/vendorsFetcher";

// Página do Vendedor
export default async function VendorPage({ params }: { params: { hubId: string; vendorId: string } }) {
  const vendorId = parseInt(params.vendorId, 10); // Pegando o ID do vendedor da URL
  const vendor: Vendor | undefined = await getVendorById(vendorId); // Pegando o vendedor

  // Caso não encontre o vendedor, podemos exibir uma mensagem de erro
  if (!vendor) {
    return <p>Vendedor não encontrado.</p>;
  }

  return (
    <main>
      <h1>{vendor.name}</h1>
      <p>{vendor.description}</p>
      <h3>Produtos:</h3>
      <ul>
        {vendor.products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>: {product.description} - Preço: ${product.price}
          </li>
        ))}
      </ul>
    </main>
  );
}
