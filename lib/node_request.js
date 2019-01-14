/*
Node Request 

Developed at ThroughBit Technologies Pvt. Ltd.
HYFERx Project
*/
//-<..>===========================================================~|
'use strict';
//-o_o===modules===================================================|
const bodyParser = require('body-parser');
const request = require ('request');
//-o_o===build_options=============================================|
let build_options = (destination,_params,_type,_method)=>{
  return new Promise((resolve,reject)=>{
    try{
        const NODE_PORT = process.env.NODE;
        //   const RPC_AUTH = process.env.RPC_AUTH;
        const nodeurl = `http://127.0.0.1:${NODE_PORT}/v1/${_type}/${_method}`; //EOS FORMAT
        //console.log(nodeurl);

        let options = {
            method: 'POST',
            url: "",
            headers:
            {
            "Content-Type": 'application/json'
            },
            body: {},
            json: true
        };

        if(destination==='node'){
            options.url = nodeurl;
            //options.headers.Authorization = `Basic ${RPC_AUTH}`;
            //options.body.params = new Array();
            options.body = _params;
        }
        else {
            options.url = destination;
            options.body = _params;
        }
        //console.log(options);
        resolve(options);
    }

    catch(e){
        //console.log("Errored while creating options.",e);
        reject(`Errored while creating options:\n${e}`);
    }

  });
};
//-o_o===req=======================================================|
//req(options, endpoint_name for logs, response type)
let send = (options,ep_ref)=>{
  return new Promise((resolve,reject)=>{  
    try{
      request(options,(error,response,body)=>{
        //console.log(body);
        if(error){
          reject(error);
        }
        if(body===undefined){
          reject(body);
        }
        else if(body.error){
          reject(body);
        }
        else{
          resolve(body);
        }
      });
 

    }
    catch(e){
      reject(`Error in request to ${ep_ref}.\n${e}`);
    }
  });
}
//-o_o===exports===================================================|
module.exports={build_options,send};
//-o_o===fin=======================================================|