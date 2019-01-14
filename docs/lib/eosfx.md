# eosfx.js

eosfx uses eosjs to perform token transfers and can be extended to support buyram, stake, unstake, create new account and other actions on the eosio account. 

# f(x):

## **async function transfer(data)**

### input types:

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
curl --header  "Content-Type: application/json" --request POST "http://127.0.0.1:8877/send" --data '{"order_id":"TBIT123R098SJ","from":"stestnettbit","to":"ptestnettbit","quantity":"1.0000 EOS","memo":"vizordskizzord"}'
```

### output types:

```
const structure = {
    "status": true,
    "result": result,
    "trx_id": result.trx_id
};
```

(or)

e instance of RPCError

