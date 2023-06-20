import { categoryRepository } from "../repositories/categoryRepository"
import { BadRequestError, NotFoundError } from "../helpers/api-erros";
import { patrimonyRepository } from "../repositories/patrimonyRepository";

export class CategoryService {
  async createCategory(nome: string, descricao: string) {
    const categoryExists = await categoryRepository.findOne({ where: { nome_categoria: nome } });
    if (categoryExists) {
      throw new BadRequestError("Categoria já cadastrada");
    }

    const newCategory = categoryRepository.create({
      nome_categoria: nome,
      descricao: descricao,
    });

    await categoryRepository.save(newCategory);
  }

  async getAllCategories() {
    return await categoryRepository.find();
  }

  async getCategoryById(id_categoria: string) {
    const category = await categoryRepository.findOne({ where: { id_categoria } });
  
    if (!category) {
      throw new NotFoundError('Categoria não encontrada');
    }
  
    return category.nome_categoria; // Retorna apenas o nome da categoria
  }

  async updateCategoryById(id_categoria: string, nome: string, descricao: string) {
    const category = await categoryRepository.findOne({ where: { id_categoria } });

    if (!category) {
      throw new NotFoundError('Categoria não encontrada');
    }

    category.nome_categoria = nome;
    category.descricao = descricao;

    await categoryRepository.save(category);
  }

  async updateCategory(criteria: any, nome: string, descricao: string) {
    const category = await categoryRepository.findOne({ where: criteria });

    if (!category) {
        throw new NotFoundError('Categoria não encontrada');
    }

    category.nome_categoria = nome;
    category.descricao = descricao;

    await categoryRepository.save(category);
    return category;
}

  async deleteCategory(id_categoria: string) {
    // Verificar se existem patrimônios associados à categoria
    const patrimonios = await patrimonyRepository.find({
      where: {
        category: {
          id_categoria: id_categoria
        }
      }
    });

    if (patrimonios.length > 0) {
      throw new Error('Há patrimônios relacionados a essa categoria. Antes de excluí-la, atualize a categoria dos patrimônios relacionados.');
    }

    // Excluir a categoria
    const category = await categoryRepository.findOne({ where: { id_categoria } });
    if (!category) {
      throw new NotFoundError('Categoria não encontrada');
    }

    await categoryRepository.remove(category);
  }
}
