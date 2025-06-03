import express from "express";
import { mockProducts } from "../data/mockData";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const {
      category,
      search,
      limit,
      sortBy = "name",
      order = "asc",
    } = req.query;
    let filteredProducts = [...mockProducts];

    if (search && typeof search === "string") {
      const searchTerms = search
        .toLowerCase()
        .split(" ")
        .filter((term) => term.length > 0);

      filteredProducts = filteredProducts.filter((product) => {
        const searchableText = [
          product.name,
          product.description,
          product.category,
        ]
          .join(" ")
          .toLowerCase();

        return searchTerms.every((term) => searchableText.includes(term));
      });
    }

    if (category && typeof category === "string") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (sortBy && typeof sortBy === "string") {
      filteredProducts.sort((a, b) => {
        let aVal: any = a[sortBy as keyof typeof a];
        let bVal: any = b[sortBy as keyof typeof b];

        if (typeof aVal === "string") {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (order === "desc") {
          return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
        }
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      });
    }

    if (limit && typeof limit === "string") {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        filteredProducts = filteredProducts.slice(0, limitNum);
      }
    }

    res.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length,
      filters: {
        search: search || null,
        category: category || null,
        limit: limit ? parseInt(limit as string) : null,
        sortBy,
        order,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar produtos",
    });
  }
});

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

router.get("/featured/list", (req, res) => {
  try {
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
