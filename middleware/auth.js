const jwt = require('jsonwebtoken');
const Userdetail= require('../models/userdetail');

const authenticate= async (req, res, next) =>{
    try{
        const token=req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token, 'secretkey');
        console.log(user.userId)
        const userd= await Userdetail.findByPk(user.userId)
            req.user = userd;
            next();
    }
    catch(err){
      console.log('Something went wrong',err)
    }
}
module.exports ={ authenticate};