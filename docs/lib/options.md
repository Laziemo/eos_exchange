# options.js

options.js is used to build options to be passed to requests to an EOS node, or any other destination.

Used in conjunction with node_request.js

## Usage

```
    const req_options = require('options.js');
    _params = {"id":"yourtxidgoeshere"}
    req_options.build("node",_params,"history","get_transaction"));
```

* **destination** : "node" is a predefined destination. For any other desintaion, include full url.

* **_params** : passed as request body

* **_type** : extension of  api endpoint defined by eosio. currently only supports "chain" or "history". (only used with "node" as destination)

* **_method** : name of the function call. (only used with "node" as destination)
