
/*
EOS Exchange Services::Receive Update
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

        //console.log(`GOT from pablos monitoros: ${JSON.stringify(receives_set,null,2)}`);

        //update mongo
        receives_db.update(receives_set)
        .then((resp)=>{
            if(resp==="GOT"){
                console.log(`Receives db updated!`);
                res.send(resp);
            }
        })
        .catch((e)=>{
            console.log(`Error updating db: \n${e}`);
            res.send(e);
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