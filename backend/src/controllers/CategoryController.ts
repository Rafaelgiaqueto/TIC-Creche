import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";

const categoryService = new CategoryService();

export class CategoryController {
  async createCategory(req: Request, res: Response) {
    const { nome_categoria, descricao } = req.body;

    try {
      await categoryService.createCategory(nome_categoria, descricao);
      return res.status(201).json({ message: "Categoria criada com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAllCategories();
      return res.json(categories);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async getCategoryById(req: Request, res: Response) {
    const { id_categoria } = req.params;
  
    try {
      const category = await categoryService.getCategoryById(id_categoria);
      return res.json({ nome_categoria: category }); // Retorna um objeto JSON com o nome da categoria
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }

  async updateCategoryById(req: Request, res: Response) {
    const { id_categoria } = req.params;
    const { nome_categoria, descricao } = req.body;

    try {
      await categoryService.updateCategoryById(id_categoria, nome_categoria, descricao);
      return res.json({ message: "Categoria atualizada com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async updateCategory(req: Request, res: Response) {
    const { nome_categoria, descricao } = req.body;

    try {
        await categoryService.updateCategory({ nome_categoria }, nome_categoria, descricao);
        return res.json({ message: "Categoria atualizada com sucesso!" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
  

  async deleteCategory(req: Request, res: Response) {
    const { id_categoria } = req.params;

    try {
      await categoryService.deleteCategory(id_categoria);
      return res.status(200).json({ message: "Categoria excluída com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
}
