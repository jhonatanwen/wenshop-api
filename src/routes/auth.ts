import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { mockUsers } from "../data/mockData";
import { LoginRequest, RegisterRequest, User } from "../types";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// POST /api/auth/login - Login do usuário
router.post("/login", async (req, res) => {
  try {
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios",
      });
    }

    // Buscar usuário (em um app real, seria no banco de dados)
    const user = mockUsers.find((u) => u.email === email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    // Para o MVP, vamos aceitar a senha "senha123" diretamente
    const isValidPassword =
      password === "senha123" ||
      (await bcrypt.compare(password, user.password));

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    // Gerar token JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Retornar dados do usuário (sem a senha)
    const { password: _, ...userWithoutPassword } = user;

    return res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
});

// POST /api/auth/register - Registro de novo usuário
router.post("/register", async (req, res) => {
  try {
    const { name, email, password }: RegisterRequest = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Nome, email e senha são obrigatórios",
      });
    }

    // Verificar se usuário já existe
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Usuário já existe com este email",
      });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário (em um app real, seria salvo no banco)
    const newUser: User = {
      id: mockUsers.length + 1,
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    mockUsers.push(newUser);

    // Gerar token JWT
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Retornar dados do usuário (sem a senha)
    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
});

// GET /api/auth/me - Obter dados do usuário autenticado
router.get("/me", (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token não fornecido",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = mockUsers.find((u) => u.id === decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    return res.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido",
    });
  }
});

export default router;
