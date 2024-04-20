const Userdetail=require('../models/userdetail');

const bcrypt=require('bcrypt');

const jwt = require('jsonwebtoken');

exports.insertUser = async (req, res, next) => {
  try{
   var myObj=req.body;
   const saltrounds=10;
   bcrypt.hash(myObj.password,saltrounds,async (err,hash)=>{
    if(!err){
      myObj.password=hash;
      await Userdetail.create(myObj)
      console.log('user created');
      res.json();
    }
    else{
      console.log(err)
    }
   }) 
  }
  catch(err){
    console.log('Something went wrong',err)
  }
  };

exports.getUser= async (req,res,next)=>{
  try{
    const email=req.params.email;
    console.log(email);
    const userdetail= await Userdetail.findAll({
        where:{
            email : email
        }
    })
        console.log('Got user details');
        console.log(userdetail[0])
        res.json(userdetail[0])       
  }
  catch(err){
    console.log('Something went wrong',err)
  }
}
function generateAccessToken(id, name){
  return jwt.sign({userId:id, name:name},'secretkey')
}
exports.loginUser = async (req, res, next) => {
  try{
    var myObj=req.body; 
    const userdetail= await Userdetail.findAll({
      where:{
          email : myObj.email
      }
  })
     if(userdetail[0]==undefined){
      res.status(404).json({message:'User does not exist'})
  }
  else{
      var pass= userdetail[0].password
      bcrypt.compare(myObj.password,pass,(err,result)=>{
        if(err){
          res.status(500).json({message:'Something went wrong'})
        }
        if(result===true){
          res.status(200).json({message:'Logged in successfully', token: generateAccessToken(userdetail[0].id, userdetail[0].username)})
        }
        else{
          res.status(401).json({message:'Password  incorrect'}) 
        }
      })  
  }            
  }
  catch(err){
    console.log('Something went wrong',err)
  }
 };

exports.isPremiumUser= (req,res,next) =>{
  res.status(201).json({isPremium: req.user.ispremiumuser}) 


}