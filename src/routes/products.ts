import express from "express";
import { mockProducts } from "../data/mockData";

const router = express.Router();

// GET /api/products - Listar todos os produtos
router.get("/", (req, res) => {
  try {
    const { category, search, limit } = req.query;
    let filteredProducts = [...mockProducts];

    // Filtrar por categoria
    if (category && typeof category === "string") {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === category
      );
    }

    // Filtrar por busca
    if (search && typeof search === "string") {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    // Limitar resultados
    if (limit && typeof limit === "string") {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum)) {
        filteredProducts = filteredProducts.slice(0, limitNum);
      }
    }

    res.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar produtos",
    });
  }
});

// GET /api/products/:id - Buscar produto por ID
router.get("/:id", (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = mockProducts.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado",
      });
    }

    return res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar produto",
    });
  }
});

// GET /api/products/featured - Produtos em destaque
router.get("/featured/list", (req, res) => {
  try {
    // Retorna os primeiros 3 produtos como destaque
    const featuredProducts = mockProducts.slice(0, 3);

    return res.json({
      success: true,
      data: featuredProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar produtos em destaque",
    });
  }
});

export default router;
