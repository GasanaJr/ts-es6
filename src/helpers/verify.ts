import { Request, Response, NextFunction } from "express";
import { checkJwt } from "./token";
import { IUserRequest } from "../interfaces/request";
const verifyToken = (req: IUserRequest,res: Response,next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403).json({message: "No access token found"});
        return
    } else {
        const splitToken = token.split(" ")[1];
        const isValid = checkJwt(splitToken);
        req.user = isValid;
        next();
    }
}

export default verifyToken;
