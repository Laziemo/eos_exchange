# interface_request.js

interface_request.js is a template for requests made to the EOS node.

It takes two parameters:

* **options** : built in *req_options*
* **ep_name** is used for clarity in error logging

## Usage

```
    const node_interface = require('interface_request.js');
    ...
    node_interface.req("interface",{},"POST",/new_address);
```
