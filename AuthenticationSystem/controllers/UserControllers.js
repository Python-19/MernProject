import UserModel from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

  const UserRegistration = async (req,res)=>{
    const {name,email,password,password_confirmation,tc} =req.body //coming request fromfrontend
    const user =await UserModel.findOne({email:email}) //if email exist
    if(user){
      res.send({"status":"failed", "message":"Email already exists"}) //show error messge
    }else{
      if(name && email && password && password_confirmation && tc){
        if(password === password_confirmation){
          try {
              const salt = await bcrypt.genSalt(10);
              const hashPassword =await bcrypt.hash(password,salt)
              const doc = new UserModel({
                name: name,
                email: email,
                password: hashPassword,
                tc: tc,
              });
            await doc.save()
            const saved_user =await UserModel.findOne({email:email})
            //Generate Jwt Token
            const token = jwt.sign(
              { userID: saved_user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn : '5d'}
            );
             res.status(201).send({ status: "successful", message: "Registerd successfuly","token":token });
          } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"unable to Register"})
          }
        }else{
          res.send({"status":"failed","message":"password and confirm_Password doesn't match"})
        }
      }else{
        res.send({"staus":"failed","message":"All fields are frequired"})
      }
    }
  }
  const UserLogin=async(req,res) =>{
    try{
      const {email,password}=req.body
      console.log("Email:", email);
      console.log("Password:", password);
      if(email && password){
        const user = await UserModel.findOne({email:email})
        if(user!=null){
          const isMatch = await bcrypt.compare(password,user.password)
          if(user.email === email && isMatch){
            //Generate Jwt Token
            const token = jwt.sign({userID:user._id},
              process.env.JWT_SECRET_KEY,
              {expiresIn:'5d'}
              )
            res.send({"status":"success","message":"Login Success","token":token})
          }else{
            res.send({"status":"failed","message":"Email or Password is not valid"})
          }
        }else{
          res.send({"status":"failed","message":"You are not a Registered User"})
        }
      }else{
        res.send({"status":"failed","message":"All fields are required"})
      }

    }catch(error){
      console.log(error)
      res.send({"status":"failed","message":"Unable to login"})
    }

  }
  const UpdateUserPassword =async(req,res)=>{
    const {password,password_confirmation} =req.body
    if(password && password_confirmation){
      if (password !== password_confirmation) {
        res.send({
          status: "failed",
          message: "New password and Confirm New Password doesn't match",
        })
      }else{
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password,salt)
        //console.log(req.user)
        await UserModel.findByIdAndUpdate(req.user._id,{$set:{
          password:newHashPassword
        }})//add new hash password
        res.send({"status":"success","message":"password change successfuly"})
      }
    }
    
    else{
      res.send({"status":"failed","message":"All Feilds are Required"})
    }
  }
 const LoggedUser =async(req,res)=>{//logged user detail
  res.send({"user":req.user})
 }
 const SendUserPasswordResetEmail=async(req,res)=>{
  const{email}=req.body
  if(email){
    const user=await UserModel.findOne({email:email})
    
    if(user){
      const secret = user._id + process.env.JWT_SECRET_KEY;
      const token=jwt.sign({userID:user._id},secret,{
        expiresIn:"15m"
      })
      const link = `http://127.0.0.1:3000/api/user/reset/${user._id} /${token}`
      console.log(link)
      res.send({"status":"success","message":"password Reset Email Sent... Please Check Your Email"})
    }else{
      res.send({"status":"failed","message":"Email Doesnot Exist"})
    }
  }else{
    res.send({"status":"failed","message":"Email Feild is Required "})
  }
 }
 const UserPasswordReset=async(req,res)=>{
  const{password,password_confirmation}=req.body
  const{id,token}=req.params 
  const user=await UserModel.findByIdAndUpdate(id)
  const new_secret=user._id +process.env.JWT_SECRET_KEY
  try{
    jwt.verify(token,new_secret)
    if(password && password_confirmation){
      if(password !== password_confirmation){
        res.send({"status":"failed","message":"new password and Confirm New password doesn't match"})
      }else{
        const salt=await bcrypt.genSalt(10) 
        const newHashPassword=await bcrypt.hash(password,salt)
        await UserModel.findByIdAndUpdate(user._id,{$set:{
          password:newHashPassword
        }})
        res.send({
          status: "success",
          message: "password reset Successfuly",
        });
      }
    }else{
      res.send({"status":"failed","message":"All Feilds are required"})
    }
  }catch(error){

  }
 }

export {
  UserRegistration,
  UserLogin,
  UpdateUserPassword,
  LoggedUser,
  SendUserPasswordResetEmail,
  UserPasswordReset,
};