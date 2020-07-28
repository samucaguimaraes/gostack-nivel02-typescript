import User from '../models/User';
import path from 'path';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import fs from 'fs';

import AppError from '../erros/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService{
/**
 * Regra: Além de subir, caso ja tenha uma imagem essa tem que ser deletada
 */
  public async execute({user_id, avatarFilename} : Request ): Promise<User>{
    const usersRepository = getRepository(User);

    /** Validando se existe o usuário */
    const user = await usersRepository.findOne(user_id);

    if(!user){
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if(user.avatar){
      /** Deletando o avatar anterior */
      // Montando a url do avatar já existente
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // Verificando com fs do node se existe
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      // Se existir? apaga-se
      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // Atualizando novo avatar
    user.avatar = avatarFilename;
    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;


