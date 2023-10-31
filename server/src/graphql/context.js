import jwt from "jsonwebtoken";

export const context = async ({ req, _res }) => {
  if (req.headers?.authorization) {
    const userId = validateToken(req.headers?.authorization);
    return {
      userId,
    };
  }
};

const validateToken = (authHeader) => {
  let userId;
  const token = authHeader.split(" ")[1];
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET ?? "token";
  jwt.verify(token, ACCESS_TOKEN, (err, decoded) => {
    userId = decoded.userId;
    next();
  });

  return userId;
};
