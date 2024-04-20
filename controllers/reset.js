const bcrypt= require('bcrypt');
const Sib = require('sib-api-v3-sdk')
const { v4: uuidv4 } = require('uuid');
const Userdetail=require('../models/userdetail');
const FPR=require('../models/forgotpasswordrequest');


exports.forgotpassword = async (req,res,next)=>{
    try{
        const useremail= req.body.email
        const client = Sib.ApiClient.instance
        const apikey = client.authentications['api-key']
        apikey.apiKey = process.env.API_KEY
        const tranEmailApi = new Sib.TransactionalEmailsApi()
        const uuid= uuidv4()
        const hostname=(req.hostname==='localhost'?'localhost:5000':req.hostname)
        const url=`http://${hostname}/password/resetpassword/`+uuid;
        const user= await Userdetail.findOne({ where : { email: useremail}})
        await user.createForgotpasswordrequest({id: uuid,isactive: true});
        console.log(url)

        const sender ={
            email: useremail,
        }
        const receivers = [
            {
                email: useremail,
            }
        ]
        const result=await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject:` Reset your password`,
            textContent: `Please click on this link to reset your password. {{params.reseturl}}`,
            params: {
                reseturl: url,
            }
        })
        res.json();
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
   
}
exports.resetpassword = async (req,res,next)=>{
    try{
        const uid= req.params.uid
        const request= await FPR.findByPk(uid)
        console.log('hi')
        if(request){
            if(request.isactive){
                const hostname=(req.hostname==='localhost'?'localhost:5500':req.hostname)
                res.redirect(`http://${hostname}/reset/newpassword.html?uuid=${uid}`)
            }
            else{
                throw new Error("Reset link expired");

            }
        }
        else{
            throw new Error("Reset request not found");
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}
exports.newpassword=async (req,res,next)=>{
    try{
        const saltrounds=10;
        const myObj=req.body;
        bcrypt.hash(myObj.password,saltrounds,async (err,hash)=>{
          if(!err){
            myObj.password=hash;
            const request=await FPR.findByPk(myObj.uuid);
            if(request.isactive){
                const user=await Userdetail.findByPk(request.userdetailId);
                user.password=myObj.password;
                await user.save();
                request.isactive=false;
                await request.save();
                res.json();
            }
            else{
                throw new Error("Reset Link expired")
            }
          }
        })
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}