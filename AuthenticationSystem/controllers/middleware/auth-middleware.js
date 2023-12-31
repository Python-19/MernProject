import jwt from 'jsonwebtoken'
import UserModel from '../../models/User.js'
 var checkUserAuth =async(req,res,next)=>{
  let token
  const {authorization} = req.headers
  if(authorization && authorization.startsWith('Bearer')){
    try{
      //Get Token from Header
      token =authorization.split(' ')[1]
      console.log("Token",token)
      //Verify Token
      const {userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)
      console.log(userID)
      //Get User from Token
      req.user =await UserModel.findById(userID).select('-password')
      next()
    }catch(error){
      res.status(401).send({"Status":"failed","message":"Unauthorized User"})
    }
  }
  if(!token){
    res.status(401).send({"status":"failed","message":"Unauthorized User,No Token"})
    }
 }
export default checkUserAuth;