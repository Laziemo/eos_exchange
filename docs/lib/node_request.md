# node_request.js

node_request.js is a template for requests made to the EOS node.

# f(x)

## **build_options(destination,_params,_type,_method)**


### input types

* **destination** : (String) "node" is a predefined destination. For any other desintaion, include full url.

* **_params** : (Any) passed as request body

* **_type** : (String) extension of  api endpoint defined by eosio. currently only supports "chain" or "history". (only used with "node" as destination)

* **_method** : (String) name of the function call. (only used with "node" as destination)

### output types

Object:

```
let options = {
    method: 'POST',
    url: "",
    headers:
    {
    "Content-Type": 'application/json'
    },
    body: {},
    json: true
};
```
## **send(options,ep_name)**

### input types

* **options** : (Object) from build_options 

* **ep_ref** : (String) reference to the endpoint being called (only used for error logging clarity)

### output types

HTTP Response **body** 

For requests made to "node" as destination, response format is defined response_format.js

Can be used against a custom server for which you can define your own response body formats.


## Usage

```
const request = require('./lib/request');
...
...
app.post('/get_account',(req,res)=>{
    try{
        const params = req.body;
        request.build_options('node',params,"chain","get_account")
        .then((options)=>{
            request.send(options,"Get Account")
            .then((resp)=>{
                res.send(`${JSON.stringify(resp,null,2)}`);            
            })
            .catch((e)=>{
                res.send(`${JSON.stringify(e,null,2)}`);
            });
        })
        .catch((e)=>{
            res.send(`${JSON.stringify(e,null,2)}`);
        });
    }
    ...
    ...
}
```

