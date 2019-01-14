/*
EOS Exchange Services::input_checks

Developed at ThroughBit Technologies Pvt. Ltd.
HYFERx Project
*/
//-<..>===========================================================~|
'use strict';
//-o_o===modules===================================================|
//-o_o===init======================================================|
//-o_o===update====================================================|
let sanitize = (data,ep_case)=>{
    return new Promise((resolve,reject)=>{
        try{
            switch(ep_case){
//ooooooooooooo-------SEND----ooooooo---------------------------oooo
//------------------------------------------------------------------
                case 'send':
                    //perform checks
                    console.log(`Cheking out these inputs for send: ${JSON.stringify(data,null,2)}`);
                    //tokens
                    let o_id = false;
                    let from = false;
                    let to = false;
                    let qnt = false; 
                    let memo = false;
                    let o_id_ex = /^[A-Z0-9]{12}$/;
                    let from_ex = /^[a-zA-Z]{12}$/;
                    let to_ex = /^[a-zA-Z]{12}$/;
                    let token_check = data.quantity.substring(data.quantity.length - 3);
                    // let qnt_ex = /[A-Z{10}/;  <------------gotta work with this to separate tokens
                    let memo_ex = /^[a-zA-Z]{12}$/;

                    console.log(`****************token_check: ${token_check}*******************`);
//-------------------------------ORDER_ID---------------------------
                    if(o_id_ex.test(data.order_id)){
                        o_id = true;
                    }
                    else{
                        const response = {
                            "status": false,
                            "message": `Error in 'order_id' format`
                        };
                        resolve (response);
                    }
//-------------------------------FROM-------------------------------
                    if(from_ex.test(data.from)){
                        from = true;
                    }
                    else{
                        const response = {
                            "status": false,
                            "message": `Error in 'from account' format`
                        };
                        resolve (response);
                    }
//-------------------------------TO---------------------------------
                    if(to_ex.test(data.to)){
                        to = true;
                    }
                    else{
                        const response = {
                            "status": false,
                            "message": `Error in 'to' account format`
                        };
                        resolve (response);
                    }
//-------------------------------QUANTITY----------------------------
                    if(token_check === "EOS"){
                        qnt = true;
                    }
                    else{
                        const response = {
                            "status": false,
                            "message": `Error in 'quantity' format`
                        };
                        resolve (response);
                    }
//-------------------------------MEMO--------------------------------
                    if(memo_ex.test(data.memo)){
                        memo = true;
                    }
                    else{
                        const response = {
                            "status": false,
                            "message": `Error in 'memo' format`
                        };
                        resolve (response);
                    }
//-------------------------------ALL=--------------------------------

                    if (o_id && from && to && qnt && memo){
                        const response = {
                        "status": true,
                        "message": `Request at /${ep_case} passed all checks a'sucessfullay.`
                        };
                        
                        resolve (response);
                    }
                    break;//safety break
//ooooooooooooo-------GET ACCOUNT----ooooooo--------------------oooo
//------------------------------------------------------------------        
                case 'get_account':
                    let acc = false;
                    const acc_ex = /^[a-zA-Z]{12}$/;
                    console.log(`Cheking out these inputs for get_account: ${JSON.stringify(data,null,2)}`);

//-------------------------------ACCOUNT----------------------------
                    if(acc_ex.test(data.account_name)){
                        acc = true;
                    }
                    else{
                        const response = {
                            "status": false,
                            "message": `Error in 'account_name' format`
                        };
                        resolve (response);
                    }
//-------------------------------ALL=--------------------------------

                    if (acc){
                        const response = {
                        "status": true,
                        "message": `Request at /${ep_case} passed all checks a'sucessfullay.`
                        };
                        
                        resolve (response);
                    }

                    break;//safety break
//ooooooooooooo-------GET ACTIONS----ooooooo--------------------oooo
//------------------------------------------------------------------ 
                case 'get_actions':
                    let acc0 = false;
                    const acc_ex0 = /^[a-zA-Z]{12}$/;
                    console.log(`Cheking out these inputs for get_actions: ${JSON.stringify(data,null,2)}`);

//-------------------------------ACCOUNT----------------------------
                    if(acc_ex0.test(data.account_name)){
                        acc0 = true;
                    }
                    else{
                        const response = {
                            "status": false,
                            "message": `Error in 'account_name' format`
                        };
                        resolve (response);
                    }
//-------------------------------ALL=--------------------------------

                    if (acc_n){
                        const response = {
                        "status": true,
                        "message": `Request at /${ep_case} passed all checks a'sucessfullay.`
                        };
                        
                        resolve (response);
                    }
                    
                    break;//safety break
//ooooooooooooo-------NO MATCH-------ooooooo--------------------oooo
//------------------------------------------------------------------
                default:
                    reject(`No endpoint_cases matched. Specify a valid endpoint to check.`);
            }

            //safety reject
            reject(`Broke out of case check without a resolution! Resend request.`)

        }
        catch(e){
            console.log(`Caught outside sanitize o))): ${e}`);
            reject(e);
        }
    });
  };
//-o_o===exports===================================================|
module.exports={sanitize};
//-o_o===fin=======================================================|