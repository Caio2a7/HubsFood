export async function getVendors() {
  const response = await fetch("http://localhost:3001/vendors");
  if (!response.ok) {
    throw new Error("Failed to fetch vendors");
  }
  return response.json();
}

export async function getVendorById(vendorId: number) {
  const response = await fetch(`http://localhost:3001/vendors?id=${vendorId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch vendor with ID ${vendorId}`);
  }
  return response.json();
}
  