
/*
EOS Exchange Services::Receive Monitor
Developed at ThroughBit Technologies Pvt. Ltd.
HYFERx Project
*/
//-<..>===============================================================~|
'use strict';
//-<.modules.>========================================================~|
const request = require ("request");
const express = require ("express");
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const receivesSchema = require('./models/receives');
const looper = require('./lib/async_loop');

mongoose.connect("mongodb://localhost:27017/receives",{"useNewUrlParser": true}, (error)=>{
  if(error){
  console.log("MongoDb is not connected.");
  }
  else{
    console.log("Successfully connected to MongoDb");
  }
});
const ObjectId=mongoose.Types.ObjectId;

const ACN_PORT=8866;

let app = express();


app.use(helmet());
app.use(helmet.noCache());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

//-o_o===server-======================================================~|
app.post('/update', (req,res)=>{
    try{
        const receives_set = req.body;

        console.log(`GOT from pablos monitoros: ${JSON.stringify(receives_set,null,2)}`);

        //update mongo
        looper.go(receives_set,(elem,report)=>{
            receivesSchema.findOne({trx_id:elem.trx_id})//search db for order with this orderId
            .exec((err,data)=>{
                if(data===null){
                    console.log(`Tx:${elem.trx_id} does not exist. We will GOT...`);
                
                    let recs = new receivesSchema({
                        trx_id :    elem.trx_id,
                        block_num:  elem.block_num,
                        from:       elem.data.from,
                        quantity:   elem.data.quantity,
                        memo:       elem.data.memo
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

                else if (err != null){
                    console.log(`Demn error!`);
                    res.send(`GOT error while searching for an element in receivesDB`);
                }

                report();
            });
        },
        ()=>{
            console.log("Fully updated db!");
            //notify your friends
        });
    }
   
    catch(e){
        console.log("Caught outside o))).");
        console.log(e);
        res.send(e);
    }
});
//-<.listen.>=========================================================~|
app.listen(ACN_PORT,()=>{
    console.log(`EOS account notify running on port ${ACN_PORT}`);
  });
//-<.fin.>============================================================~|