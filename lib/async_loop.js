/*
Async Loop
Developed at ThroughBit Technologies
HYFERx Project
*/
//-o_O===<..>===================================================~|
'use strict';
//-o_O===f(x)===================================================~|
let go = (list, iterator, callback)=>{

  let tracker = list.length; 

  function report() {

    tracker--;
   
    if(tracker === 0)
      callback();
  }
  // here we give each iteration its job
  for(var i = 0; i < list.length; i++) {
    // iterator takes 2 arguments, an item to work on and report function
    iterator(list[i], report);
  }
}
//-o_O===exports================================================~|
module.exports={go}
//-o_O===fin====================================================~|