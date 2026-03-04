import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,          // REQUIRED for Safari + HTTPS
    sameSite: "none",      // REQUIRED for cross-site cookies
    path: "/",
  });
};

export default generateToken;