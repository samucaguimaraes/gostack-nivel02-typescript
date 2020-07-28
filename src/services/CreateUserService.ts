import User from '../models/User';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs'

import AppError from '../erros/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User>{
    // Criação do repositorio de usuário com typeorm
    const userRepository = getRepository(User);
    /**
     * Regras:
     *  1- Não posso duplicar email
     *  2- O password tem que ser criptografado
     */
     /** Verificando se já existe usuário com o email informado */
     const checkUserExists = await userRepository.findOne({
       where: { email }
     })

     if(checkUserExists){
       throw new AppError('Email address already used');
     }

     const hashedPassword = await hash(password, 8);

     /** Tudo certo? salvando o user */
     const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
     });

     await userRepository.save(user);
     return user;
  }
}

export default CreateUserService;
