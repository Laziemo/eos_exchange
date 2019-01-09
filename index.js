/*
EOS Exchange Services
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

// chain = {
//     main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
//     jungle: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // jungle testnet
//     sys: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
//     };



const { Api, JsonRpc, RpcError } = require('eosjs');
const fetch = require('node-fetch');
const { TextEncoder, TextDecoder } = require('util');
const JsSignatureProvider = require('eosjs/dist/eosjs-jssig').default; 
//-<.init.>===========================================================~|

const signatureProvider =  new JsSignatureProvider([process.env.APK]);

const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
const api = new Api({ rpc,signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
//-<.f(x).>===========================================================~|
// console.log("test");
//-<.f(x).>===========================================================~|
    (async () => {
        try{
          const result = await api.transact({
              actions: [{
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                  actor: 'stestnettbit',
                  permission: 'active',
                }],
              data: {
                  from: 'stestnettbit',
                  to: 'ptestnettbit',
                  quantity: "1 EOS",
                  memo: 'itsvishalplease',
              },
              }]
          }, {
            blocksBehind: 3,
            expireSeconds: 30,
          });
          console.dir(JSON.stringify(result,null,2));
        }
            
        catch(e){
            if (e instanceof RpcError)
                console.log(JSON.stringify(e.json.error.details,null,2));
            else 
                console.log(JSON.stringify(e,null,2));
        }

      })();
//-<.fin.>============================================================~|
