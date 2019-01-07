# eos_exchange

## interface.js

Uses eosjs to sign transactions.

## interface.js

Makes API calls to an EOS node for the following methods:

/get_info

/get_account {"account_name":"stestnettbit"}

/get_actions {"pos":-1,  "offset":1, "account_name":"stestnettbit"}


CURL TESTS:

Direct to NODE:
curl -X POST "http://127.0.0.1:$NODE/v1/chain/get_account" --data '{"account_name":"stestnettbit"}'

To interface:

curl -X POST "http://127.0.0.1:8877/get_account"
(defaults => account_name: stestnettbit)


*Environment Variables*

export NODE=<port defined in config.ini::http-server-address>


Requires call to: 

>push_transaction(s)

