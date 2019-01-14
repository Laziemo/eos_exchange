# response_format.js

## Overview

resposne_format.js defines a format for responses that can be easily parsed through.  

It is recommended to only be used at the res.send() level, and all clients must be notified about the response format being served.

It takes two arguments:

* **status** : true or false
* **message** : response as a string, object or array

## Usage

          const res_fmt = require('response_format.js');

          res.send(res_fmt.create(true,{this:cool,that:orange,then:nothing}));

Result: 

{
    status: true,
    message: {this:cool,that:orange,then:nothing}
}

