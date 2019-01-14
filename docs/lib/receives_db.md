# receives_db.js

receives_db.js maintains a local db storing all receives at the stestnettbit EOS account. 

# f(x):

## **update(receives_set)**

### input format:

elem is one element in the receives_set array.

Its contents are passed into a receivesSchema as follows:

```
let recs = new receivesSchema({
    trx_id :    elem.trx_id,
    block_num:  elem.block_num,
    from:       elem.data.from,
    quantity:   elem.data.quantity,
    memo:       elem.data.memo
});
```

monitor.js periodically checks actions on stestnettbit and populates a receive_set array which is sent to receives_db.js

The array is iterated through, checked against trx_id to see if the entry already exists in the db, if not, the db is updated with the new receive.

### output format:

(String) 
"GOT"

Any other response is an error.

