/*
EOS Exchange Services::Receives_dB

Developed at ThroughBit Technologies Pvt. Ltd.
HYFERx Project
*/
//-<..>===========================================================~|
'use strict';
//-o_o===modules===================================================|
const mongoose = require('mongoose');

const looper = require('./async_loop');
const receivesSchema = require('../models/receives');
//-o_o===init===================================================|
mongoose.connect("mongodb://localhost:27017/receives",{"useNewUrlParser": true}, (error)=>{
  if(error){
  console.log("MongoDb is not connected.");
  }
  else{
    console.log("Successfully connected to MongoDb");
  }
});

const ObjectId=mongoose.Types.ObjectId;
//-o_o===build=====================================================|
let update = (receives_set)=>{
  return new Promise((resolve,reject)=>{
    try{
        looper.go(receives_set,(elem,report)=>{
            receivesSchema.findOne({trx_id:elem.trx_id})//search db for order with this orderId
            .exec((err,data)=>{
                if(data===null){
                    console.log(`Tx:${elem.trx_id} does not exist. We will GOT...`);
                
                    let recs = new receivesSchema({
                        "trx_id":     elem.trx_id,
                        "block_num":  elem.block_num,
                        "from":       elem.data.from,
                        "quantity":   elem.data.quantity,
                        "memo":       elem.data.memo
                    });

                    recs.save((e)=>{
                        if(e!=null){
                            console.log("Error writing to db. Try again!");
                            res.send(e);
                        }
                        else {
                            console.log(`Added trx:${elem.trx_id} to dB.`)
                        }
                    });
                }

                else if (data!==null){
                    console.log(`GOT trx.`)
                }

                else if (err !== null){
                    console.log(`Demn error!`);
                    res.send(`GOT error while searching for an element in receivesDB: \n${err}`);
                }

                report();
            });
        },
        ()=>{
            console.log("Fully updated db!");
            //notify your friends
            resolve ("GOT");
        }); 
    }

    catch(e){
        console.log(`Caught outside o))): ${e}`);
        reject("Error", e);
    }
  });
};
//-o_o===exports===================================================|
module.exports={update};
//-o_o===fin=======================================================|