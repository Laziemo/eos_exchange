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
const CronDog = require('cron').CronJob;
const fs = require('fs');
const req_options = require('./lib/options');
const node_request = require('./lib/node_request');
const looper = require('./lib/async_loop');

let app = express();
const L_PORT=process.env.L_PORT;
console.log(L_PORT);
app.use(helmet());
app.use(helmet.noCache());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));


let tip_block = 0;
fs.readFile('tip_backup.bloc',(err, data)=>{
    if (err) {
        throw err;
    }
    tip_block = data;
});
//-o_o===monitor-=====================================================~|
const job = new CronDog('*/5 * * * * *', ()=>{
    //get actions for stestnettbit
    try{
        const params = {};
        req_options.build('http://127.0.0.1:8877/get_actions',params)
        .then((options)=>{
            node_request.req(options,"/interface/get_actions")
            .then((resp)=>{
                
                let our_trxset = new Array();//contains the list of relavant trxs to update. filtered from request to interface get_actions
                let our_blocks = new Array();//contains a list of blocks that have our transaction
                //console.log(JSON.stringify(resp,null,2));
                //try a filter() alternative to this looper...
                looper.go(resp,(elem,report)=>{//elem is the iterator over resp, report is the reference counting function, call it at the end of the loop
                   
                    if(elem.data.to==="stestnettbit" && tip_block<elem.block_num){
                        our_trxset.push(elem);
                        our_blocks.push(elem.block_num);
                    }
                    report();
                },

                ()=>{ //callback
                    console.log(our_blocks);
                    our_blocks.sort();
                    if (tip_block<our_blocks[our_blocks.length -1]){ // update is required
                        tip_block = our_blocks[our_blocks.length -1];

                        fs.writeFile('tip_backup.bloc', tip_block, (err) => {
                            if (err) throw err;
                            console.log('Updated tip_block for receives to tip_backup.bloc');
                        });

                        update_db(our_trxset);
                    }
                        
                });
            })
            .catch((e)=>{
                console.log("Caught Inside o)");
                console.log(e);
            });
        })
        .catch((e)=>{
            console.log("Caught Inside o))");
            console.log(e);
        });
    }
    catch(e){
        console.log("Caught Outside o)))");
        console.log(e);
    }   
    //check last block 
    //update if requuired
});

job.start();
//-<.f(x).>===========================================================~|
let update_db=(data)=>{
    try{
        req_options.build('http://127.0.0.1:8866/update',data)
        .then((options)=>{
            node_request.req(options,"/update/receivesDB")
            .then((resp)=>{
                console.log(resp);
            })
            .catch((e)=>{
                console.log("Caught Inside o)");
            });
        })
        .catch((e)=>{
            console.log("Caught Inside o))");
        });
    }
    catch(e){
        console.log("Caught Outside o)))");
    }
}
//-<.fin.>============================================================~|