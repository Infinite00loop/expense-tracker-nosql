
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const FPR = sequelize.define('forgotpasswordrequest', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
 isactive: Sequelize.BOOLEAN
 
 
});

module.exports = FPR;
