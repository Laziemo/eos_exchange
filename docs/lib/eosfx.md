# eosfx.js

eosfx uses eosjs to perform token transfers and can be extended to support buyram, stake, unstake, create new account and other actions on the eosio account. 

## f(x):

**async function transfer(data)**

## input format:

```
const data = {
    "from":     "stestnettbit",
    "to":       "ptestnettbit",
    "quantity": "1.0000 EOS",
    "memo":     "vizordskitzlord"
}
```


The transfer function is exported and used at the **/send** endpoint defined in interface.js. Below is an example request to this endpoint to execute a transfer:


```
curl --header  "Content-Type: application/json" --request POST "http://127.0.0.1:8877/send" --data '{"from":"stestnettbit","to":"ptestnettbit","quantity":"1.0000 EOS","memo":"vizordskizzord"}'
```
