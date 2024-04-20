require('dotenv').config();
const path= require('path');
const fs= require('fs')
const helmet= require('helmet');
const compression= require('compression')
const morgan= require('morgan')
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const resetRoutes = require('./routes/reset');

const Userdetail=require('./models/userdetail');
const Expense=require('./models/expense');
const Income = require('./models/income');
const Order=require('./models/order');
const Download=require('./models/download');
const FPR=require('./models/forgotpasswordrequest');

const accessLogStream= fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    {flags: 'a'}
);

const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined', {stream: accessLogStream}));

app.use(bodyParser.json({ extended: false }));

app.use(adminRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use('/premium',premiumRoutes);
app.use('/password',resetRoutes);
app.use((req,res)=>{
    const hostname=(req.hostname==='localhost'?'localhost:5000':req.hostname)
    res.redirect(`http://${hostname}/login/login.html`);
})


Userdetail.hasMany(Expense);
Expense.belongsTo(Userdetail);

Userdetail.hasMany(Income);
Income.belongsTo(Userdetail);

Userdetail.hasMany(Order);
Order.belongsTo(Userdetail);

Userdetail.hasMany(Download);
Download.belongsTo(Userdetail);

Userdetail.hasMany(FPR);
FPR.belongsTo(Userdetail);

//sequelize.sync({force:true})
sequelize.sync()
.then(result=>{
    //console.log(result);
    app.listen(process.env.PORT_NO || 5000);
})
.catch(err=>console.log(err));