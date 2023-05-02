import crypto from "crypto";

export const incoderPassword = (password: string) => {
    // const salt = crypto.randomBytes(128).toString("base64");
    return crypto.createHash("sha512").update(password).digest("hex");
};

export const matchPassword = (password: string, hashPassword: string) => {
    return hashPassword == incoderPassword(password);
};
