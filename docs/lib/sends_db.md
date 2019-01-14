# sends_db.js

sends_db.js maintains a local db storing all sends from the stestnettbit EOS account made by users (withdrawals to external accounts). 

# f(x):

## **update(sends_data)**

Updates a local db with sends_data.

### input format:

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

### output format

Resolves "DONE" on successful update.


## **check(order_id)**

Checks if this order is already in the db.

### input format

order_id: TBIT12345678 (12 characters)

### output format

```
if (txid in db)
    const response = {
        "message": "GOT",
        "order_id": order_id,
        "trx_id": data.trx_id
    } 
else 
    const response = {
        "message": "NEED",
        "order_id": order_id
    }
```

