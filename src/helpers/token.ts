import jsonwebtoken from 'jsonwebtoken';
import { IUser } from '../models/UserModel';

const generateToken = (user: IUser) => {
    return jsonwebtoken.sign({email: user.email, id: user.id}, process.env.TOKEN_SECRET!, {expiresIn: '1d'})
}

export {
    generateToken,
}