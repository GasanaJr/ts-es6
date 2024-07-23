import { Request, Response, NextFunction } from "express";
import fs from 'fs'
import path from "path";
import { IUserRequest } from "../interfaces/request";

const getRoles = (): Promise<string[]> => {
    return new Promise((resolve,reject) => {
        const filePath = path.join(__dirname, '../../roles.txt');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            }
            const roles = data.split('\n').map(role => role.trim());
            resolve(roles);
        })
    })
}

const checkRoles = (requiredRole: string) => {
    return async(req: IUserRequest, res: Response, next: NextFunction) => {
        const role = req.user?.role;
        if (!role) {
            return res.status(403).json({message: "No role Provided for this user"});
        }
        const roles = await getRoles();
        if (!roles.includes(role)) {
            return res.status(401).json({message: "Your role is not registered"});
        }

        if (role === requiredRole) {
            next();
        } else {
            return res.status(403).json({message: "Insufficient roles"})
        }
    }
}

export default checkRoles;