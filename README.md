# eos_exchange

## index.js

Uses eosjs to sign transactions.

* Currently facing bugs. Can be extended to deprecate interface.js using JSONRpc class

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

export NODE=*<port defined in config.ini::http-server-address>*


Requires call to: 

/push_transaction(s)

## monitor.js

Cron tab makes get_actions rpc calls every 5 seconds and calles update.js with a set of new receives.


Overwrites tip_backup.bloc with the latest transaction block_num to be used as a reference for filtering new receives.


## update.js


Listens for requests from monitor.js to update a local mongodb.


### REQUIRED UPGRADES:

Use ampq messaging queue for more dynamic updates to client. 

Use db to only store receives that have been validated by the client as updated.

Store latest block_num (tip_block) accordingly.


## Support/Bug Reporting: viz@throughbit.com
