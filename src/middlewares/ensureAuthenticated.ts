import { response } from "express";
import {Request, Response, NextFunction} from 'express';
import { verify } from "jsonwebtoken";
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}


export default function ensureAuthenticated(request: Request, response: Response, next:NextFunction): void {
  //Pegar o token da aplicação
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new Error('JWT token is missing');
  }

  /** Quebrando o token em um array com duas posições [type, token] */
  const [ type, token] =  authHeader.split(' ');

  /** Decodificando o token com o verify() */
  try{
    const decoded = verify(token, authConfig.jwt.secret);
    // Desestriturando o decoded e pegando o id do user
    const { sub } =  decoded as TokenPayload;

    // Incluindo o id do user no request sobreescrito @types
    request.user = {
      id: sub,
    };


    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }

}
