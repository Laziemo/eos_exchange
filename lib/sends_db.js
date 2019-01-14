/*
EOS Exchange Services::Sends_dB

Developed at ThroughBit Technologies Pvt. Ltd.
HYFERx Project
*/
//-<..>===========================================================~|
'use strict';
//-o_o===modules===================================================|
const mongoose = require('mongoose');

const sendsSchema = require('../models/sends');
const looper = require('./async_loop');

//-o_o===init======================================================|
mongoose.connect("mongodb://localhost:27017/sends",{"useNewUrlParser": true}, (error)=>{
  if(error){
  console.log("MongoDb is not connected.");
  }
  else{
    console.log("Successfully connected to MongoDb");
  }
});

const ObjectId=mongoose.Types.ObjectId;
//-o_o===update====================================================|
let update = (send_data)=>{
  return new Promise((resolve,reject)=>{
    try{
        console.log(`ENTRY: sends_db.update():\n${JSON.stringify(send_data,null,2)}`)
        const sends = new sendsSchema({
            "order_id":   send_data.order_id,
            "trx_id":     send_data.trx_id,
            "block_num":  send_data.block_num,
            "to":         send_data.from,
            "quantity":   send_data.quantity,
            "memo":       send_data.memo
        });

        sends.save((e)=>{
            if(e!=null){
                console.log("Error writing to db. Try again!");
                reject(e);
            }
            else {
                console.log(`Added data of trx:${send_data.trx_id} to dB.`)
                resolve("DONE");
            }
        });
    }

    catch(e){
        console.log(`Caught outside o))): ${e}`);
        reject("Error", e);
    }
  });
};
//-o_o===update====================================================|
let check = (order_id)=>{
    return new Promise((resolve,reject)=>{
    try{
        sendsSchema.findOne({order_id:order_id})//search db for order with this orderId
        .exec((err,data)=>{
            if(data===null){
                console.log(`Order:${order_id} does not exist. We will GOT...`);   
                const response = {
                    "message": "NEED",
                    "order_id": order_id
                }         
                resolve(response);
            }

            else if (data!==null){
                console.log(`GOT trx.\nData: ${data}`);
                const response = {
                    "message": "GOT",
                    "order_id": order_id,
                    "trx_id": data.trx_id
                }         
                resolve(response);
            }

            else if (err !== null){
                console.log(`Demn error!`);
                reject(`GOT error while searching for an element in sendsDB: \n${err}`);
            }
        });
    }
  
      catch(e){
          console.log(`Caught outside o))): ${e}`);
          reject("Error", e);
      }
    });
  };
//-o_o===exports===================================================|
module.exports={update,check};
//-o_o===fin=======================================================|