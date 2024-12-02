export async function getHubs() {
  const response = await fetch("http://localhost:3001/hubs");
  if (!response.ok) {
    throw new Error("Failed to fetch hubs");
  }
  return response.json();
}

export async function getHubById(hubId: number) {
  const response = await fetch(`http://localhost:3001/hubs?id=${hubId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch hub with ID ${hubId}`);
  }
  return response.json();
}
export async function getHubByName(hubName: string) {
  const response = await fetch(`http://localhost:3001/hubs?name=${hubName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch hub with ID ${hubName}`);
  }
  return response.json();
}