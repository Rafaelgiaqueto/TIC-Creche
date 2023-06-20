import { userRepository } from "../repositories/userRepository";
import { BadRequestError, NotFoundError } from "../helpers/api-erros";
import bcrypt from "bcrypt";
import { User } from "../entities/User";

export class UserService {
  async createUser(
    nome: string,
    email: string,
    telefone: string,
    senha: string
  ) {
    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new BadRequestError("E-mail já cadastrado!");
    }

    const hashSenha = await bcrypt.hash(senha, 10);

    const newUser = userRepository.create({
      nome,
      email,
      telefone,
      senha: hashSenha,
    });

    await userRepository.save(newUser);
  }

  async getAllUsers() {
    return await userRepository.find();
  }

  async updateUser(
    id: string,
    nome: string,
    email: string,
    telefone: string,
    senha: string
  ) {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }

    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists && userExists.id !== user.id) {
      throw new BadRequestError("E-mail já cadastrado!");
    }

    user.nome = nome;
    user.email = email;
    user.telefone = telefone;
    if (senha) {
      user.senha = await bcrypt.hash(senha, 10);
    }
    await userRepository.save(user);
  }

  async getUserById(id: string) {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }
    const { senha: _, ...userData } = user;
    return userData;
  }

  async deleteUser(id: string) {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }

    await userRepository.remove(user);

    const usersToUpdate = await userRepository
      .createQueryBuilder("user")
      .where("user.id > :id", { id })
      .getMany();

    for (const userToUpdate of usersToUpdate) {
      userToUpdate.id = (parseInt(userToUpdate.id) - 1).toString();
    }

    await userRepository.save(usersToUpdate);
  }
}
