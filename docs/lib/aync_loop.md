# async_loop.js

async_loop.js uses a reference counting algorithm to deal with looping in an asynchronous environment.

In several cases time-consuming processing on data is required before passing control flow, for example db read-write, formatting responses etc. In such cases async_loop can be used to iterate over an array of data, process each element and report() upon completion of work on a single element. report() counts down a tracker which is set by the length of the array (reference count). Once this tracker counts down to 0,  all elements are completely processed and control flows into the callback function where program flow can continue.

## Usage

```
    const async_loop = require('async_loop.js');
    let success_counter = 0;

    async_loop.go(array_to_iterate_over,(element_in_array,report)=>{
        fs.appendFile(`${L_PATH}`,`${JSON.stringify(element_in_array,null,1)}\n${log_separator}\n`, (err)=>{
        if(err){
            console.log("Could not write to file: \n", err);
            report(); //tracker-- ; continue looping until tracker === 0
        }
        else{
            console.log(`Successfully written receives to log @ ${L_PATH}`);
            success_counter++;
            report(); //tracker-- ; continue looping until tracker === 0
        }
        });
    },()=>{//Callback fired when tracker===0
        res.send(`${success_counter}/${array_to_iterate_over.length} elements were written to file`)
        //you can be certain that this response will not go out until
        //fs.appenFile has been executed for every iteration over array_to_iterate_over
    });
```