# sends_db.js

sends_db.js maintains a local db storing all sends from the stestnettbit EOS account made by users (withdrawals to external accounts). 

## f(x):

**update(sends_data)**
**check(order_id)**

## input format:

The send_data object's items are passed into the sendsSchema as follows:

```
const sends = new sendsSchema({
    "order_id":   send_data.order_id,
    "trx_id":     send_data.trx_id,
    "block_num":  send_data.block_num,
    "to":         send_data.data.from,
    "quantity":   send_data.data.quantity,
    "memo":       send_data.data.memo
});
```

sends work with individual actions and do not process batch order. 

Every transfer action request made by a user is handled individually. 

It is first checked with the check(order_id) function to see if the order has already been processed. If so, then the order's trx_id is returned to the client.

If the order does not exist it is added to the db in the above provided format.