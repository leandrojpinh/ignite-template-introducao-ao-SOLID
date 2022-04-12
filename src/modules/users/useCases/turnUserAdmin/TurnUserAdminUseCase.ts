import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const userExists = this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    userExists.admin = true;
    userExists.updated_at = new Date();
    const updatedUser = this.usersRepository.turnAdmin(userExists);

    return updatedUser;
  }
}

export { TurnUserAdminUseCase };
