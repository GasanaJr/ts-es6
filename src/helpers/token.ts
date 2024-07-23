import jsonwebtoken from 'jsonwebtoken';
import { IUser } from '../models/UserModel';

const generateToken = (user: IUser) => {
    return jsonwebtoken.sign({email: user.email, id: user.id}, process.env.TOKEN_SECRET!, {expiresIn: '1d'})
}

const checkJwt = (jwt: string) => {
    return jsonwebtoken.verify(jwt, process.env.TOKEN_SECRET!)
}

export {
    generateToken,
    checkJwt,
}