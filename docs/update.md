# update.js

update.js updates a mongo database with all tokens received by a given account.

It receives an array of transactions, checks the database to see if these transactions exist by trx_id and updates accordingly. 

Upon successful completion a message "GOT" is sent back as a response to request made by monitor.js

This response will update the tip_block variable for job the CronDog.