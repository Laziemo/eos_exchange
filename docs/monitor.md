# monitor.js

mointor.js tracks actions linked to an EOS account as a method of monitoring received payments for a given account. 


A CronJob **const job** makes requests to the /get_actions endpoint defined in interface.js, every 5 seconds.

All actions on the account are filtered by => (action: transfer, to: given_account). These actions are then forwarded to a mongo client through a server defined in update.js

Upon getting a success response (GOT) from the client a local variable *tip_block* is updated and a local file *tip_backup.bloc* is updated with the block_num of the most recent action.

Successive requests to /get_actions, filters actions taking place after the tip_block value.

Account being monitored is hard coded into the **params** constant.

## Local Dependencies

```
const request = require('./lib/node_request');
const looper = require('./lib/async_loop');
```

Refer to the individual docs of these dependencies for input and output types