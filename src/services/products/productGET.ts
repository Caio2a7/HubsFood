export async function getProducts() {
  const response = await fetch("http://localhost:3001/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function getProductsByVendor(vendorId:number) {
  const response = await fetch(`http://localhost:3001/products?vendorId=${vendorId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function getProductById(productId: number) {
  const response = await fetch(`http://localhost:3001/products?id=${productId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID ${productId}`);
  }
  return response.json();
}
  