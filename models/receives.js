/*
Receives model for EOS

Developed at ThroughBit Technologies Pvt.Ltd
HYFERx Project
*/
//-o_O===init===================================================~|
'use strict';
//-o_o===modules=================================================|
const mongoose = require('mongoose');
//-o_o===schema==================================================|
const Schema = mongoose.Schema;

const receivesSchema = new Schema({
    trx_id :    {type: String},
    block_num:  {type: Number},
    from:       {type: String},
    quantity:   {type: String},
    memo:       {type: String}
});
//-o_o===exports=================================================|
module.exports = mongoose.model('receives', receivesSchema);
//-o_o===fin=====================================================|