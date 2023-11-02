import { UserModel } from "../model/user.model.js";
import jwt from "jsonwebtoken";

async function adminMiddleware(req, res, next) {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        return res.json({status:401, error: "No auth token" });
      }
  
      const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
     
      const user = await UserModel.findOne({ where: { email: verifiedToken.email } });
    
      if(user.isAdmin == false){
        return res.json({
            status:403,
            error:"you don't have permission to access"
        })
      }
      next();
    } catch (error) {
      console.log(error.message);
      if (error.message == "invalid signature") {
        return res.json({ status: 401, msg: "token is invalid" });
      }
    }
  }

  export default adminMiddleware;