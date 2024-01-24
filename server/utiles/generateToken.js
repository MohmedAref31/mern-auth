import jsonwebtoken from "jsonwebtoken";

export const generateToken = (payload) => {
  const token = jsonwebtoken.sign(payload, process.env.JWT_SECERT, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return token;
};
