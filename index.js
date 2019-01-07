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

// eos = Eos({
//     keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',// private key
//     httpEndpoint: 'http://127.0.0.1:8888',
//     chainId: chain.jungle,
//     });


// const Eos = require('eosjs');
// const eos = Eos({ 
//     keyProvider: : '5Hqst2zn4MSfjMWocGGyfCNPZDaVszet7ZWjEEedgka1fNZJesL',
//     httpEndpoint, 
//     chainId, 
//     RpcError, 
//     JsSignatureProvider 
// });

const { Api, JsonRpc, RpcError } = require('eosjs');
// const EosApi = require('eosjs-api');
const fetch = require('node-fetch');
const { TextEncoder, TextDecoder } = require('util');

//const JsSignatureProvider = require('eosjs/dist/eosjs-jssig');
const JsSignatureProvider = require('eosjs/dist/eosjs-jssig').default; 
//-<.init.>===========================================================~|

const signatureProvider =  new JsSignatureProvider(["5K6ZYo5Yk6vPgjFHwmXU3StRq2hV7bxWr431SCqUBeKAmnoP1K8"]);
//eos = Eos({keyPrefix: 'PUB'})
 
// Read-only instance when 'eosjs' is already a dependency
//eos = Eos.modules.api({/*config*/})
 
// Read-only instance when an application never needs to write (smaller library)
//EosApi = require('eosjs-api')
//eos = EosApi({/*config*/})


const rpc = new JsonRpc('http://jungle2.cryptolions.io:80', { fetch });
const api = new Api({ rpc,signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
//-<.f(x).>===========================================================~|
// console.log("test");
rpc.get_account('stestnettbit').then(console.log);

//-<.f(x).>===========================================================~|
try{
    (async () => {
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
              quantity: '0.01 EOS',
              memo: 'itsvishalplease',
            },
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30,
        });
        console.dir(result);
      })();
}
catch(e){
    if (e instanceof RpcError)
        console.log(JSON.stringify(e.json,null,2));
}
//-<.fin.>============================================================~|
