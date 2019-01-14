/*
EOS Exchange Services::Interface
Developed at ThroughBit Technologies Pvt. Ltd.
HYFERx Project
*/
//-<..>===============================================================~|
'use strict';
//-<.modules.>========================================================~|
const express = require ("express");
const helmet = require('helmet');
const bodyParser = require('body-parser');

const request = require('./lib/node_request');
const eos = require('./lib/eosfx');
const sends_db = require('./lib/sends_db');
const res_fmt = require('./lib/response_format');
const input_check = require('./lib/input_check');


//-<.init.>===========================================================~|
const NI_PORT = 8877;

let app = express();

app.use(helmet());
app.use(helmet.noCache());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//-<.ROOT.>===========================================================~|
app.post('/', (req,res)=>{
    res.send("Hello");
});
//-<.TRANSFER.>=======================================================~|
app.post('/send',(req,res)=>{
    try{
        const data = req.body;
        console.log(`ENTRY at/send (data): ${JSON.stringify(data,null,2)}`);

        input_check.sanitize(data,"send")
        .then((result)=>{
            if (result.status===true){
                
                sends_db.check(data.order_id)
                .then((resp)=>{
                    if(resp.message==="NEED"){
                        eos.transfer(data)
                        .then((structure)=>{
                            //console.log(`NEED: ${JSON.stringify(structure,null,2)}`);
                            let _data = data;
                            _data["trx_id"] = structure.trx_id;
                            sends_db.update(_data)
                            .then((resp)=>{
                                console.log(`At sends_db.update ${JSON.stringify(resp,null,2)}`);
                                res.send(res_fmt.create(true,_data.trx_id));
                            })
                            .catch((e)=>{
                                console.log(`Error: ${e}`);
                                res.send(res_fmt.create(false,e));
                            });
                        })
                        .catch((e)=>{
                            console.log("Transaction Failed!");
                            //do something
                            const structure = {
                                "transaction": data,
                                "status": "fail",
                                "message": e
                            };
                
                            res.send(res_fmt.create(false,structure));
                        });
                    }

                    else if(resp.message==="GOT"){
                        console.log(`Order: ${resp.order_id} EXISTS.`);
                        res.send(JSON.stringify(res_fmt.create(true,resp),null,2));
                    }
                })
                .catch((e)=>{
                    console.log("Error in db Check", e);
                    res.send(JSON.stringify(res_fmt.create(false,e),null,2));
                });
            }
            else{
                const message = `Dirty inputs:${result.message}`;
                console.log(message);
                res.send(JSON.stringify(res_fmt.create(false,message),null,2));
            }
        })
        .catch((e)=>{
            const message = `Error in input_check: ${e}`;
            console.log(message);
            res.send(JSON.stringify(res_fmt.create(false,message),null,2));
        });
        //consider receiving send requests as a set
        //deconstruct data at eosfx with a looper
    }
    catch(e){
        res.send(JSON.stringify(res_fmt.create(false,e),null,2));
    }
  });
//-<.GET_INFO.>=======================================================~|
app.post('/get_info',(req,res)=>{
    try{
        const params = {};
        request.build_options('node',params,"chain","get_info")
        .then((options)=>{
            request.send(options,"/get_info")
            .then((resp)=>{
                res.send(JSON.stringify(res_fmt.create(true,resp),null,2));
            })
            .catch((e)=>{
                res.send(JSON.stringify(res_fmt.create(false,e),null,2));
            });
        })
        .catch((e)=>{
            res.send(JSON.stringify(res_fmt.create(false,e),null,2));
        });
    }
    catch(e){
        res.send(JSON.stringify(res_fmt.create(false,e),null,2));
    }
});
//-<.GET_ACCOUNT.>====================================================~|
app.post('/get_account',(req,res)=>{
    try{
        const params = req.body;
        console.log(`/get_account params: ${JSON.stringify(params,null,2)}`);
        input_check.sanitize(params,"get_account")
        .then((result)=>{
            if(result.status === true){
                request.build_options('node',params,"chain","get_account")
                .then((options)=>{
                    request.send(options,"Get Account")
                    .then((resp)=>{
                        res.send(JSON.stringify(res_fmt.create(true,resp),null,2));
                    })
                    .catch((e)=>{
                        res.send(JSON.stringify(res_fmt.create(false,e),null,2));
                    });
                })
                .catch((e)=>{
                    res.send(JSON.stringify(res_fmt.create(false,e),null,2));
                });     
            }
            else{
                const message = `Dirty inputs:${result.message}`;
                console.log(message);
                res.send(JSON.stringify(res_fmt.create(false,message),null,2));
            }       
        })
        .catch((e)=>{
            const message = `Error in input_check: ${e}`;
            console.log(message);
            res.send(JSON.stringify(res_fmt.create(false,message),null,2));
        });
    }
    catch(e){
        res.send(JSON.stringify(res_fmt.create(false,e),null,2));
    }
  });
//-<.GET_ACTIONS.>====================================================~|
app.post('/get_actions',(req,res)=>{
    try{
        //const params = {"offset":1,"account_name":"stestnettbit","pos":1};
        const params = req.body;
        request.build_options('node',params,"history","get_actions")
        .then((options)=>{
            request.send(options,"Get Actions")
            .then((resp)=>{
                const receives_array = resp.actions.map((elem)=>{

                    const receive = {
                        "trx_id":elem.action_trace.trx_id,
                        "block_num":elem.block_num,
                        "data":{
                            "to":elem.action_trace.act.data.to,
                            "from":elem.action_trace.act.data.from,
                            "quantity":elem.action_trace.act.data.quantity,
                            "memo":elem.action_trace.act.data.memo
                         }
                    };
                   
                    return receive;
                });
                // console.log('\n\n\n**************************************\n\n\n');
                // console.log(resp.actions[0].action_trace.act.data.quantity);
                res.send(JSON.stringify(res_fmt.create(true,receives_array),null,2));
            })
            .catch((e)=>{
                console.log(e)
                res.send(JSON.stringify(res_fmt.create(false,e),null,2));
            });
        })
        .catch((e)=>{
            res.send(JSON.stringify(res_fmt.create(false,e),null,2));
        });
    }
    catch(e){
        res.send(JSON.stringify(res_fmt.create(false,e),null,2));
    }
  });
//-<.GET_TRANSACTIONS.>====================================================~|
app.post('/get_transaction',(req,res)=>{
    try{
        const params = req.body;
        console.log(params);
        request.build_options('node',params,"history","get_transaction")
        .then((options)=>{
            request.send(options,"Get Transaction")
            .then((resp)=>{
                res.send(JSON.stringify(res_fmt.create(true,resp),null,2));
            })
            .catch((e)=>{
                res.send(JSON.stringify(res_fmt.create(false,e),null,2));
            });
        })
        .catch((e)=>{
            res.send(JSON.stringify(res_fmt.create(false,e),null,2));
        });
    }
    catch(e){
        res.send(JSON.stringify(res_fmt.create(false,e),null,2));
    }
  });

//-<.listen.>=========================================================~|
app.listen(NI_PORT,()=>{
  console.log(`EOS Node Infterface running on port ${NI_PORT}`);
});
//-<.fin.>============================================================~|
