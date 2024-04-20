const Razorpay= require('razorpay');
const Order= require('../models/order')

exports.purchasepremium = async(req,res) =>{
    try{
        var rzp = new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        console.log(rzp.key_id,rzp.key_secret);
        const amount= 2500;

        rzp.orders.create({amount, currency: "INR"}, async (err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            await req.user.createOrder({ orderid: order.id, status:'PENDING'})
                return res.status(201).json({order, key_id: rzp.key_id});   
        })
    }
    catch(err){
        console.log(err);
        res.status(403).json({message: 'Something went wrong', error:err})
    }
}
exports.updateTransactionStatus = async (req,res) =>{
    try{
        const { payment_id, order_id} = req.body;
        const order= await Order.findOne({ where: {  orderid: order_id}});
        await order.update({ paymentid: payment_id, status:'SUCCESSFUL'});
        await req.user.update({ispremiumuser:true})
        return res.status(202).json({success:true, message:"Transaction Successful"})
    }
    catch(err){
        console.log(err);
        res.status(403).json({message: 'Something went wrong', error:err})
    }
}