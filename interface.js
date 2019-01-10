/*
EOS Exchange Services::Interface
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

const req_options = require('./lib/options');
const node_request = require('./lib/node_request');
const eos = require('./lib/eosfx');
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
        console.log(data);

        eos.transfer(data)
        .then((txid)=>{
            console.log(txid);
            res.send(txid);
        })
        .catch((e)=>{
            console.log(e);
            res.send(e);
        });
    }
    catch(e){
      res.send(e);
    }
  });
//-<.GET_INFO.>=======================================================~|
app.post('/get_info',(req,res)=>{
    try{
        const params = {};
        req_options.build('node',params,"chain","get_info")
        .then((options)=>{
            node_request.req(options,"/get_info")
            .then((resp)=>{
                res.send(`${JSON.stringify(resp,null,2)}`);
            })
            .catch((e)=>{
                res.send(`${JSON.stringify(e,null,2)}`);
            });
        })
        .catch((e)=>{
            res.send(`${JSON.stringify(e,null,2)}`);
        });
    }
    catch(e){
        res.send(`${JSON.stringify(e,null,2)}`);    }
  });
//-<.GET_ACCOUNT.>====================================================~|
app.post('/get_account',(req,res)=>{
    try{
        const params = req.body;
        req_options.build('node',params,"chain","get_account")
        .then((options)=>{
            node_request.req(options,"/get_account")
            .then((resp)=>{
                res.send(`${JSON.stringify(resp,null,2)}`);            })
            .catch((e)=>{
                res.send(`${JSON.stringify(e,null,2)}`);

            });
        })
        .catch((e)=>{
            res.send(`${JSON.stringify(e,null,2)}`);

        });
    }
    catch(e){
        res.send(`${JSON.stringify(e,null,2)}`);
    }
  });
//-<.GET_ACTIONS.>====================================================~|
app.post('/get_actions',(req,res)=>{
    try{
        //const params = {"offset":1,"account_name":"stestnettbit","pos":1};
        const params = req.body;
        req_options.build('node',params,"history","get_actions")
        .then((options)=>{
            node_request.req(options,"/get_actions")
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
                res.send(JSON.stringify(receives_array,null,2));
            })
            .catch((e)=>{
                console.log(e)
                res.send(`${JSON.stringify(e,null,2)}`);
            });
        })
        .catch((e)=>{
            res.send(`${JSON.stringify(e,null,2)}`);

        });
    }
    catch(e){
        res.send(`${JSON.stringify(e,null,2)}`);
    }
  });
//-<.GET_TRANSACTIONS.>====================================================~|
app.post('/get_transaction',(req,res)=>{
    try{
        const params = req.body;
        console.log(params);
        req_options.build('node',params,"history","get_transaction")
        .then((options)=>{
            node_request.req(options,"/get_transaction")
            .then((resp)=>{
                res.send(JSON.stringify(resp,null,2));
            })
            .catch((e)=>{
                res.send(`${JSON.stringify(e,null,2)}`);
            });
        })
        .catch((e)=>{
            res.send(`${JSON.stringify(e,null,2)}`);
        });
    }
    catch(e){
        res.send(`${JSON.stringify(e,null,2)}`);
    }
  });

//-<.listen.>=========================================================~|
app.listen(NI_PORT,()=>{
  console.log(`EOS Node Infterface running on port ${NI_PORT}`);
});
//-<.fin.>============================================================~|
