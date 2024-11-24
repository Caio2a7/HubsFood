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
        products: [
          {
            id: 1,
            name: "Margherita Pizza",
            description: "Classic pizza with tomato, mozzarella, and basil",
            price: 12.99,
            available: true, // Adicionando a propriedade 'available'
            category: "Pizza", // Adicionando a categoria
          },
          {
            id: 2,
            name: "Pepperoni Pizza",
            description: "Delicious pizza topped with spicy pepperoni",
            price: 14.99,
            available: true, // Adicionando a propriedade 'available'
            category: "Pizza", // Adicionando a categoria
          },
          {
            id: 3,
            name: "Vegetarian Pizza",
            description: "Pizza with a variety of fresh vegetables",
            price: 13.99,
            available: true, // Adicionando a propriedade 'available'
            category: "Pizza", // Adicionando a categoria
          },
        ],
        totalProducts: 3,
      },
      {
        id: 2,
        name: "Sushi World",
        description: "Fresh sushi rolls",
        hub: 1,
        products: [
          {
            id: 4,
            name: "California Roll",
            description: "Sushi roll with crab, avocado, and cucumber",
            price: 8.99,
            available: true, // Adicionando a propriedade 'available'
            category: "Sushi", // Adicionando a categoria
          },
          {
            id: 5,
            name: "Spicy Tuna Roll",
            description: "Roll with spicy tuna, avocado, and cucumber",
            price: 10.99,
            available: true, // Adicionando a propriedade 'available'
            category: "Sushi", // Adicionando a categoria
          },
          {
            id: 6,
            name: "Dragon Roll",
            description: "Roll with eel, avocado, and cucumber, topped with eel sauce",
            price: 12.99,
            available: true, // Adicionando a propriedade 'available'
            category: "Sushi", // Adicionando a categoria
          },
        ],
        totalProducts: 3,
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
        products: [
          {
            id: 7,
            name: "Classic Burger",
            description: "Beef patty with lettuce, tomato, and cheese",
            price: 9.99,
            available: true, // Adicionando a propriedade 'available'
            category: "Burgers", // Adicionando a categoria
          },
          {
            id: 8,
            name: "Cheeseburger",
            description: "Beef patty with cheddar cheese, lettuce, and tomato",
            price: 10.99,
            available: true, // Adicionando a propriedade 'available'
            category: "Burgers", // Adicionando a categoria
          },
          {
            id: 9,
            name: "Veggie Burger",
            description: "A delicious veggie patty with fresh toppings",
            price: 8.99,
            available: true, // Adicionando a propriedade 'available'
            category: "Burgers", // Adicionando a categoria
          },
        ],
        totalProducts: 3,
      },
      {
        id: 4,
        name: "Taco Corner",
        description: "Authentic tacos",
        hub: 2,
        products: [
          {
            id: 10,
            name: "Beef Taco",
            description: "Seasoned beef with lettuce, cheese, and salsa",
            price: 3.99,
            available: true, // Adicionando a propriedade 'available'
            category: "Tacos", // Adicionando a categoria
          },
          {
            id: 11,
            name: "Chicken Taco",
            description: "Grilled chicken with lettuce, cheese, and salsa",
            price: 4.49,
            available: true, // Adicionando a propriedade 'available'
            category: "Tacos", // Adicionando a categoria
          },
          {
            id: 12,
            name: "Fish Taco",
            description: "Fresh fish with cabbage, salsa, and crema",
            price: 5.49,
            available: true, // Adicionando a propriedade 'available'
            category: "Tacos", // Adicionando a categoria
          },
        ],
        totalProducts: 3,
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
