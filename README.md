# eos_exchange

## interface.js

Makes API calls to an EOS node for the following methods:

**/get_info**

**/get_account {"account_name":"stestnettbit"}**

**/get_actions {"pos":-1,  "offset":1, "account_name":"stestnettbit"}**

Uses eosjs to sign transactions and send via:

**/send {"orderId":"TBIT123R098SJ",from":"stestnettbit","to":"ptestnettbit","quantity":"1.0000 EOS","memo":"vizordskizzord"}**

## CURL TESTS:

Direct to NODE:
```
curl -X POST "http://127.0.0.1:$NODE/v1/chain/get_account" --data '{"account_name":"stestnettbit"}'
```

To Interface:
```
curl --header  "Content-Type: application/json" --request POST "http://127.0.0.1:8877/get_account" --data '{"account_name: "stestnettbit"}'
```
```
curl --header  "Content-Type: application/json" --request POST "http://127.0.0.1:8877/send" --data '{"orderId":"TBIT123R098SJ","from":"stestnettbit","to":"ptestnettbit","quantity":"1.0000 EOS","memo":"vizordskizzord"}'
```

## monitor.js

Cron tab makes get_actions rpc calls every 5 seconds and calls update.js with a set of new receives.

## update.js

Listens for requests from monitor.js to update a local mongodb.

### REQUIRED UPGRADES:

- Formalize responses


### NOTES:

**Environment Variables**

export NODE=*port defined in config.ini::http-server-address*


{ 
"actions": [ 
    { 
    "account": "eosio.token", 
    "authorization": [{
        "actor": "stestnettbit", 
        "permission": "active"
        }], 
    "data": "00000000007015d640420f000000000004454f5300000000046d656d6f", 
    "name": "transfer" 
    }],
"context_free_actions": [], 
"expiration": "2018-05-09T07:35:24", 
"max_kcpu_usage": 0, 
"max_net_usage_words": 0, 
"ref_block_num": 248618, 
"ref_block_prefix": 2025487478, 
"region": 0 
}

## Support/Bug Reporting: viz@throughbit.com
