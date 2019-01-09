/*
Node Request 
Response from node contains:

Developed at ThroughBit Technologies Pvt. Ltd.
HYFERx Project
*/
//-<..>===========================================================~|
'use strict';
//-o_o===modules===================================================|
const bodyParser = require('body-parser');
const request = require ('request');
//-o_o===req=======================================================|
//req(options, endpoint_name for logs, response type)
let req = (options,ep_name)=>{
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
      reject(`Error in request to ${ep_name}.\n${e}`);
    }
  });
}
//-o_o===exports===================================================|
module.exports={req};
//-o_o===fin=======================================================|