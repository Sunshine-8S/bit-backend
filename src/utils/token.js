import jwt from "jsonwebtoken";

export function getToken(payload) {
    return new Promise((res, rej) => {
        jwt.sign(payload, "top-ultra-secreto", {expiresIn: "1h"}, (error, token) =>{
            if (error) {
                rej(error);
            } else {
                res(token);
            }
        })
    })
}