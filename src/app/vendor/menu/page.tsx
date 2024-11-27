"use client";

import { useState, useEffect } from "react";
import { getProductsByVendor } from "@/services/products/productGET";
import { createProduct } from "@/services/products/productPOST";
import { updateProduct } from "@/services/products/productPUT";
import { deleteProduct } from "@/services/products/productDELETE";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";

export default function VendorMenuPage() {
  const [clientId, setClientId] = useState<number | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingChanges, setPendingChanges] = useState<any[]>([]); // Para salvar alterações
  const [modalOpen, setModalOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    available: true,
  });

  useEffect(() => {
    setClientId(1); // Mock do vendorId. Substitua pela lógica real.
  }, []);

  useEffect(() => {
    if (!clientId) return;

    const fetchProducts = async () => {
      try {
        const allProducts = await getProductsByVendor(clientId);
        console.log("Produtos carregados:", allProducts); // Log para verificar
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
      }
    };

    fetchProducts();
  }, [clientId]);

  const handleAddProduct = () => {
    const newProductData = { ...newProduct, id: Date.now(), temporary: true };
    setProducts((prev) => [...prev, newProductData]);
    setFilteredProducts((prev) => [...prev, newProductData]);
    setPendingChanges((prev) => [
      ...prev,
      () =>
        createProduct(
          newProduct.name,
          newProduct.description,
          newProduct.price,
          clientId!,
          "Sem Categoria",
          newProduct.available
        ),
    ]);
    setNewProduct({ name: "", description: "", price: 0, quantity: 0, available: true });
    setModalOpen(false);
  };

  const handleFieldChange = (productId: number, field: string, value: any) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, [field]: value } : product
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);

    const product = updatedProducts.find((p) => p.id === productId);

    setPendingChanges((prev) => {
      // Remove alterações duplicadas para o mesmo produto
      const filtered = prev.filter((change: any) => change.productId !== productId);
      return [
        ...filtered,
        () =>
          updateProduct(
            productId,
            product.name,
            product.description,
            product.price,
            "Sem Categoria",
            product.available
          ),
      ];
    });
  };

  const handleDeleteProduct = (productId: number) => {
    console.log("Marcando produto para exclusão:", productId); // Log para debug
    setProducts((prev) => prev.filter((product) => product.id !== productId));
    setFilteredProducts((prev) => prev.filter((product) => product.id !== productId));
    setPendingChanges((prev) => [...prev, () => deleteProduct(productId)]);
  };

  const handleSaveChanges = async () => {
    console.log("Iniciando o salvamento das alterações...");
    try {
      for (const change of pendingChanges) {
        await change(); // Executa cada alteração
      }
      alert("Alterações salvas com sucesso!");
      setPendingChanges([]); // Limpa as alterações pendentes
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      alert("Erro ao salvar as alterações.");
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) || product.description.toLowerCase().includes(lowerQuery)
    );
    setFilteredProducts(results);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-6">
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <p className="text-gray-700">
            <strong>Aviso:</strong> Alterações feitas nesta página afetam diretamente o menu exibido para os clientes.
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Pesquisar produtos..."
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#FF7A55]"
          />
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#FF7A55] text-white px-6 py-3 rounded-lg shadow hover:bg-[#ff9770] transition font-semibold"
          >
            Adicionar Produto
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={product.imagePath || "/imagens/restaurante.png"}
                alt={product.name}
                className="h-40 w-full object-cover rounded-md mb-4"
              />
              <label className="block text-gray-700 font-semibold mb-1">Nome</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => handleFieldChange(product.id, "name", e.target.value)}
                className="w-full mb-2 p-2 border rounded-lg focus:outline-none"
              />
              <label className="block text-gray-700 font-semibold mb-1">Descrição</label>
              <textarea
                value={product.description}
                onChange={(e) => handleFieldChange(product.id, "description", e.target.value)}
                className="w-full mb-2 p-2 border rounded-lg focus:outline-none"
              ></textarea>
              <label className="block text-gray-700 font-semibold mb-1">Preço</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => handleFieldChange(product.id, "price", parseFloat(e.target.value))}
                className="w-full mb-2 p-2 border rounded-lg focus:outline-none"
              />
              <label className="block text-gray-700 font-semibold mb-1">Quantidade</label>
              <input
                type="number"
                value={product.quantity || 0}
                onChange={(e) => handleFieldChange(product.id, "quantity", parseInt(e.target.value))}
                className="w-full mb-2 p-2 border rounded-lg focus:outline-none"
              />
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  Deletar
                </button>
                <button
                  onClick={() => handleFieldChange(product.id, "available", !product.available)}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    product.available ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                  }`}
                >
                  {product.available ? "Disponível" : "Indisponível"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSaveChanges}
            className="bg-[#FF7A55] text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-[#ff9770] transition"
          >
            Salvar Alterações
          </button>
        </div>
      </main>
      <Footer />

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Adicionar Novo Produto</h2>
            <label className="block text-gray-700 font-semibold mb-1">Nome do Produto</label>
            <input
              type="text"
              placeholder="Nome do Produto"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full mb-2 p-3 border rounded-lg"
            />
            <label className="block text-gray-700 font-semibold mb-1">Descrição</label>
            <textarea
              placeholder="Descrição"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full mb-2 p-3 border rounded-lg"
            ></textarea>
            <label className="block text-gray-700 font-semibold mb-1">Preço</label>
            <input
              type="number"
              placeholder="Preço"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              className="w-full mb-2 p-3 border rounded-lg"
            />
            <label className="block text-gray-700 font-semibold mb-1">Quantidade</label>
            <input
              type="number"
              placeholder="Quantidade"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
              className="w-full mb-4 p-3 border rounded-lg"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddProduct}
                className="bg-[#FF7A55] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#ff9770] transition"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
