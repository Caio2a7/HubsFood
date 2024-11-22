import { Hub } from "../types/hub";

const hubs: Hub[] = [
  {
    id: 1,
    name: "Downtown Food Hub",
    location: {
      street: "123 Main St",
      city: "Downtown",
      state: "NY",
      zip: "10001",
    },
    vendors: [
      {
        id: 1,
        name: "Pizza Place",
        description: "Best pizzas in town",
        hub: 1,
        products: [], 
        totalProducts: 0, 
      },
      {
        id: 2,
        name: "Sushi World",
        description: "Fresh sushi rolls",
        hub: 1,
        products: [],
        totalProducts: 0,
      },
    ],
  },
  {
    id: 2,
    name: "Uptown Food Hub",
    location: {
      street: "456 Broadway",
      city: "Uptown",
      state: "NY",
      zip: "10002",
    },
    vendors: [
      {
        id: 3,
        name: "Burger Joint",
        description: "Juicy burgers",
        hub: 2,
        products: [],
        totalProducts: 0,
      },
      {
        id: 4,
        name: "Taco Corner",
        description: "Authentic tacos",
        hub: 2,
        products: [],
        totalProducts: 0,
      },
    ],
  },
];


// Fetch all hubs
export async function getHubs(): Promise<Hub[]> {
  return hubs;
}

// Fetch hub by ID
export async function getHubById(id: number): Promise<Hub | undefined> {
  return hubs.find((hub) => hub.id === id);
}


export const preloadHubs = () => {
  void getHubs();
};
