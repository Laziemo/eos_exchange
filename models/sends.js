/*
EOS Excahnge Services::Sends Schema

Developed at ThroughBit Technologies Pvt.Ltd
HYFERx Project
*/
//-o_O===init===================================================~|
'use strict';
//-o_o===modules=================================================|
const mongoose = require('mongoose');
//-o_o===schema==================================================|
const Schema = mongoose.Schema;

const sendsSchema = new Schema({
    order_id:   {type: String},
    trx_id :    {type: String},
    block_num:  {type: Number},
    from:       {type: String},
    quantity:   {type: String},
    memo:       {type: String}
});
//-o_o===exports=================================================|
module.exports = mongoose.model('sends', sendsSchema);
//-o_o===fin=====================================================|