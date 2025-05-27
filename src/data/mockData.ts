import { Product, User } from "../types";

// Dados mockados para desenvolvimento
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    description:
      "O mais avançado iPhone com chip A16 Bionic, sistema de câmera Pro e tela Super Retina XDR.",
    price: 7999.99,
    imageUrl:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop",
    category: "smartphones",
    stock: 50,
  },
  {
    id: 2,
    name: "MacBook Pro M2",
    description:
      "MacBook Pro de 13 polegadas com chip M2, 8GB de RAM e 256GB de armazenamento SSD.",
    price: 12999.99,
    imageUrl:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop",
    category: "notebooks",
    stock: 30,
  },
  {
    id: 3,
    name: "Samsung Galaxy S23",
    description:
      "Smartphone Samsung Galaxy S23 com câmera de 50MP, tela Dynamic AMOLED 2X e 5G.",
    price: 4999.99,
    imageUrl:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop",
    category: "smartphones",
    stock: 25,
  },
  {
    id: 4,
    name: "AirPods Pro",
    description:
      "Fones de ouvido sem fio com cancelamento ativo de ruído e qualidade de som excepcional.",
    price: 1899.99,
    imageUrl:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&h=500&fit=crop",
    category: "acessorios",
    stock: 100,
  },
  {
    id: 5,
    name: "Dell XPS 15",
    description:
      "Notebook Dell XPS 15 com Intel Core i7, 16GB RAM, 512GB SSD e tela 4K.",
    price: 8999.99,
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
    category: "notebooks",
    stock: 15,
  },
  {
    id: 6,
    name: "iPad Air",
    description:
      "iPad Air com chip M1, tela Liquid Retina de 10.9 polegadas e suporte ao Apple Pencil.",
    price: 4199.99,
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop",
    category: "tablets",
    stock: 40,
  },
];

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Usuário Teste",
    email: "usuario@exemplo.com",
    password: "$2b$10$1234567890abcdefghijklmnopqrstuvwxyz", // senha123 hasheada
    createdAt: new Date(),
  },
];
