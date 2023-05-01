import jwt from "jsonwebtoken";
import crypto from "crypto";

interface JwtPayloadProps {
    id: number;
    email: string;
}
const secretKey: string = process.env.NEXT_PUBLIC_JWT_SECRET_KEY ?? "";

export const createdToken = ({ id, email }: JwtPayloadProps) => {
    const token = jwt.sign({ id: id, email: email }, secretKey, {
        expiresIn: -1,
    });

    return token;
};

export const verifiedToken = (token: string) => {
    const replaceToken = token.replace(/^Bearer\s+/, "");

    // const verified = jwt.verify(replaceToken, secretKey);
    const verified = jwt.decode(replaceToken);

    return verified;
};

export const incoderPassword = (password: string) => {
    // const salt = crypto.randomBytes(128).toString("base64");
    return crypto.createHash("sha512").update(password).digest("hex");
};

export const matchPassword = (password: string, hashPassword: string) => {
    return hashPassword == incoderPassword(password);
};
