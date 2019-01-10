# interface.js

interface.js defines endpoints that make specific RPC calls to an EOS node.  

## endpoints:

### /send

Request Format:
```
curl --header  "Content-Type: application/json" --request POST "http://127.0.0.1:8877/send" --data '{"from":"stestnettbit","to":"ptestnettbit","quantity":"1.0000 EOS","memo":"vizordskizzord"}'
```

### /get_info

Request Format:
```
curl --request POST "http://127.0.0.1:8877/get_info" 
```

### /get_account

Request Format:
```
curl --header  "Content-Type: application/json" --request POST "http://127.0.0.1:8877/get_account" --data '{"account_name":"stestnettbit"}'
``` 

### /get_actions

Request Format:
```
curl --header  "Content-Type: application/json" --request POST "http://127.0.0.1:8877/get_actions" --data '{"offset":1,"account_name":"stestnettbit","pos":1}'
``` 

To get the latest action set: 

**offset: -1** (number of actions to display from starting pos; -1 displays 1 from the bottom)
**pos: -1** (-1 sets start position as first from bottom (most recent); 1 sets start position as first from top(genesis tx))

*To get all account actions, ignore offset and pos parameters.*

### /get_transaction

Request Format:
```
curl --header  "Content-Type: application/json" --request POST "http://127.0.0.1:8877/get_transaction" --data '{"id":"2bd51183bbb9f4a48a8b5f13aa0b7d874a4cb8e86f2b536c0a1cac2e2ec2a482", "block_num_hint":8000855}'
``` 

*block_num_hint* is not required for local transactions. Some transactions by external accounts might require a block_num_hint.*


*Environment Variables*

export NODE=*<port defined in config.ini::http-server-address>*

