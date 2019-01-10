# monitor.js

mointor.js tracks actions linked to an EOS account as a method of monitoring received payments for a given account. 


A CronJob **const job** makes requests to the /get_actions endpoint defined in interface.js, every 5 seconds.

All actions on the account are filtered down to transfer actions to the given account. These actions are then forwarded to a mongo client through a server defined in update.js

Upon getting a success response from the client a local file called tip_backup.bloc is updated with the block_num of the most recent action.
tip_backup.bloc is only read when the program is initialized.

A local variable tip_block is used for reference within the job.
This variable is updated when a success response is received from the client.

Successive requests to /get_actions, filters actions taking place after the tip_block value.

Account being monitored is hard coded into the **params** constant.

## Requires:

interface.js
update.js
