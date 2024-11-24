import axios from "axios";

const API_URL = "http://localhost:3001";

export async function getOrders() {
  const response = await fetch("http://localhost:3001/orders");
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  console.log(response.json())
  return response.json();
}

export async function getOrderById(orderId: number) {
  const response = await fetch(`http://localhost:3001/orders?id=${orderId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch order with ID ${orderId}`);
  }
  const orders = await response.json();
  return orders.length > 0 ? orders[0] : null; 
}

export async function getOrdersByClient(clientId: number) {
  const response = await fetch(`http://localhost:3001/orders?clientId=${clientId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch orders for client with ID ${clientId}`);
  }
  return response.json();
}
  
export const getOrdersByVendor = async (vendorId: number) => {
  try {
    const response = await axios.get(`${API_URL}/orders?vendorId=${vendorId}`);
    if (response.status !== 200) {
      throw new Error("Erro ao buscar pedidos do estabelecimento.");
    }
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os pedidos do vendor:", error);
    throw error;
  }
};