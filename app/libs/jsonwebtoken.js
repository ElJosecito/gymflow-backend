import jwt from "jsonwebtoken";

//generate jwt token

const generateToken = (id) => {
  const payload = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return payload;
};

//validate jwt token
const validateToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access denied");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload.user;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
};

export { generateToken, validateToken };
