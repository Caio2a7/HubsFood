"use client"
import { useState, useEffect } from "react";
import { getProductsByVendor } from "@/services/products/productGET";
import { createProduct } from "@/services/products/productPOST";
import { updateProduct } from "@/services/products/productPUT";
import { deleteProduct } from "@/services/products/productDELETE";
import { getClientIdFromCookie } from "@/ui/utils/getToken";
import Link from "next/link";
import Script from 'next/script';
import Head from 'next/head';
import '@/ui/assets/css/geral/style-header-footer.css';
import '@/ui/assets/css/geral/style-body.css';
import '@/ui/assets/css/paginas/styleperfilEstabelecimento.css';
import '@/ui/assets/css/componentes/style-carousel.css';


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
      <div>
      <div className="header container">
    <div className="container">
        <div>
            <img src="/imagens/logoMenuSuperior.png" alt="" />
        </div>
    </div>

    <div className="user">
        <div className="menu-container">
            <img src="/imagens/userEstabelecimento.png" alt="Foto de Perfil" className="menu-trigger" />
            <div className="menu" id="menu">
                <a href="perfilEstabelecimento.html">Perfil</a>
                <a href="registrocardapioEstabelecimento.html">Cardápio</a>
                <a href="#item3">Pedidos</a>
                <a href="../../templates/areaNaoLogada/index.html">Sair</a>
            </div>
        </div>
        <span>Bob's</span>
    </div>
</div>

<main>
    <div className="escolhaFundo">
        <div className="containerEstabelecimento">
            <div><img src="/imagens/userEstabelecimento.png" alt="Foto de Perfil" /></div>
        </div>
    </div>

    <div className="produtos">
        <div className="tituloGrupoAlimentar">
            <h3>Combo </h3> 
            <img src="/imagens/pinEditar.png" alt="" />
        </div>
        <div className="body-carousel">
            <h3>Hubs Cadastrados</h3>
            <div className="owl-carousel" id="carousel1">
                <div>
                    <img src="/imagens/icon_midway.png" alt="Midway Mall Icon" />
                    <span>Midway Mall</span>
                </div>

                <div>
                    <img src="/imagens/icon_natalShopping.png" alt="Natal Shopping Icon" />
                    <span>Natal Shopping</span>
                </div>

                <div>
                    <img src="/imagens/icon_partage.png" alt="Partage Shopping Icon" />
                    <span>Partage Norte Shopping</span>
                </div>
                <div>
                    <img src="/imagens/icon_praiaShopping.png" alt="Praia Shopping Icon" />
                    <span>Praia Shopping</span>
                </div>
            </div>
            <div className="custom-nav">
                <button className="custom-prev" id="carousel1-prev">← </button>
                <button className="custom-next" id="carousel1-next"> →</button>
            </div>
        </div>
    </div>
</main>

<div className="footer container">
    <div className="logo">
        <img src="/imagens/logoInferior.png" alt="Logo Inferior" />
    </div>

    <div className="container">
        <div>
            <ul>
                <li className="footer-header">Links:</li>
                <li><img src="/imagens/logoInstagram.png" alt="Instagram" /><a href="https://www.instagram.com/"><span>Instagram</span></a></li>
                <li><img src="/imagens/logoPinterest.png" alt="Pinterest" /><a href="https://br.pinterest.com/"><span>Pinterest</span></a></li>
            </ul>
        </div>
        <div>
            <ul>
                <li className="footer-header">Contatos:</li>
                <li><img src="/imagens/pinLocation.png" alt="Pin" /><span>3º piso do Instituto Metrópole Digital</span></li>
                <li><img src="/imagens/pinPhone.png" alt="Phone" /><span>(84) 9 8888-8888</span></li>
                <li><img src="/imagens/pinEmail.png" alt="Email" /><span>hubsfood@gmail.com</span></li>
                <li><img src="/imagens/pinHorario.png" alt="Horário" /><span>24h</span></li>
            </ul>
        </div>
    </div>
</div>

<div className="end">
    <span>Copyright @ 2024 All rights reserved</span>
</div>

      </div>
    </main>
  );
}
