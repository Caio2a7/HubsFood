"use client"
import { useState, useEffect } from "react";
import { getProductsByVendor } from "@/services/products/productGET";
import { createProduct } from "@/services/products/productPOST";
import { updateProduct } from "@/services/products/productPUT";
import { deleteProduct } from "@/services/products/productDELETE";
import { getClientIdFromCookie } from "@/ui/utils/getToken";

export default function VendorMenuPage() {
  const [clientId, setClientId] = useState<number | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    available: true,
  });

  const [productToEdit, setProductToEdit] = useState<any | null>(null);

  useEffect(() => {
    // Pega o id do cliente a partir do cookie
    try {
      const id = getClientIdFromCookie();
      setClientId(Number(id));
    } catch (err) {
      setError("Erro ao buscar ID do cliente.");
      setLoading(false);
      return;
    }
  }, []);

  useEffect(() => {
    if (clientId === null) return;
    const fetchProducts = async () => {
      try {
        const allProducts = await getProductsByVendor(clientId);
        setProducts(allProducts);
      } catch (err) {
        setError("Erro ao buscar os produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [clientId]);

  const handleAddProduct = async () => {
    try {
      const createdProduct = await createProduct(
        newProduct.name,
        newProduct.description,
        newProduct.price,
        clientId!,
        newProduct.category,
        newProduct.available
      );
      setProducts([...products, createdProduct]); // Adiciona o produto criado na lista
      setNewProduct({ name: "", description: "", price: 0, category: "", available: true });
    } catch (err) {
      setError("Erro ao adicionar o produto.");
    }
  };

  const handleUpdateProduct = async () => {
    try {
      if (productToEdit) {
        const updatedProduct = await updateProduct(
          productToEdit.id,
          productToEdit.name,
          productToEdit.description,
          productToEdit.price,
          productToEdit.category,
          productToEdit.available
        );
        setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))); // Atualiza o produto na lista
        setProductToEdit(null); // Limpa o formulário de edição
      }
    } catch (err) {
      setError("Erro ao atualizar o produto.");
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId)); // Remove o produto da lista
    } catch (err) {
      setError("Erro ao excluir o produto.");
    }
  };

  if (loading) return <div>Carregando produtos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main>
      <h1>Menu do Vendor</h1>

      <h2>Adicionar Novo Produto</h2>
      <div>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preço"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Categoria"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type="checkbox"
          checked={newProduct.available}
          onChange={() => setNewProduct({ ...newProduct, available: !newProduct.available })}
        />
        <label>Disponível</label>
        <button onClick={handleAddProduct}>Adicionar Produto</button>
      </div>

      {productToEdit && (
        <div>
          <h2>Editar Produto</h2>
          <input
            type="text"
            value={productToEdit.name}
            onChange={(e) => setProductToEdit({ ...productToEdit, name: e.target.value })}
          />
          <input
            type="text"
            value={productToEdit.description}
            onChange={(e) => setProductToEdit({ ...productToEdit, description: e.target.value })}
          />
          <input
            type="number"
            value={productToEdit.price}
            onChange={(e) => setProductToEdit({ ...productToEdit, price: parseFloat(e.target.value) })}
          />
          <input
            type="text"
            value={productToEdit.category}
            onChange={(e) => setProductToEdit({ ...productToEdit, category: e.target.value })}
          />
          <input
            type="checkbox"
            checked={productToEdit.available}
            onChange={() => setProductToEdit({ ...productToEdit, available: !productToEdit.available })}
          />
          <label>Disponível</label>
          <button onClick={handleUpdateProduct}>Atualizar Produto</button>
        </div>
      )}

      <h2>Produtos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <p><strong>{product.name}</strong></p>
            <p>{product.description}</p>
            <p>Preço: {product.price}</p>
            <p>Disponibilidade: {product.available ? 'Disponível' : 'Indisponível'}</p>
            <button onClick={() => setProductToEdit(product)}>Editar</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
