import jwt from "jsonwebtoken"

const genereateToken=(id,res)=>{
    const token=jwt.sign({id},process.env.JWT_SEC,{
        expiresIn:"7d"
    })

    res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",   // OR "none" with secure
  secure: false,    // true only if HTTPS
});
}

export default genereateToken