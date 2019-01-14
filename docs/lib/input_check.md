# input_check.js

input_check is a module to sanitize requests (body) being made to a server.

Perfoms regex tests to check length and character types being used.

# f(x):

## **sanitize(data,ep_case)**

### input types:

**data** is defined in interface.js. Refer to docs > format is specified as --data parameter passed in curl tests.

eg. for /send
```
const data = {
    "order_id":    "TBIT12309823",
    "from":     "stestnettbit",
    "to":       "ptestnettbit",
    "quantity": "1.0000 EOS",
    "memo":     "vizordskitzlord"
}
```

**ep_case** is the name of the endpoint to which the request is being made. The body of this request is being checked. 

Currently only supports: 

- /send
- /get_account
- /get_actions

### output types:

```
const response = {
    "status": true,
    "message": `Request at /${ep_case} passed all checks a'successfullay.`
};
```

(or)

```
const response = {
    "status": false,
    "message": `Error in 'quantity' format`
};
```

## Usage

```
const input_check = require('./lib/input_check');
...
...
input_check.sanitize(data,"send")
    .then((result)=>{
        if(result.status === true){
            //do stuff
            ...
            ...
        }
        else{
            const message = `Dirty inputs:${result.message}`;
            console.log(message);
            res.send(JSON.stringify(res_fmt.create(false,message),null,2));
        }       
    })
    .catch((e)=>{
        const message = `Error in input_check: ${e}`;
        console.log(message);
        res.send(JSON.stringify(res_fmt.create(false,message),null,2));
    });

```


## Upgrades

> Check data.quantity for requests to /send to extract 