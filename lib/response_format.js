/*
Response Format
Developed at ThroughBit Technologies Pvt.Ltd
HYFERx Project
*/
//-o_O==========================================================~|
'use strict';

let create=(type,msg)=>{

  let response = {
    "status": type,
    "message": msg
  };

  return response;

}
//-o_O===Exports================================================~|
module.exports = {create};
//-o_O===fin====================================================~|