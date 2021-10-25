import {ACCOUNT_INFO}  from '../Actions/userAction'

const initialStateValue={}

const userReducers=(state=initialStateValue,action)=>{
     
    switch (action.type) {
         
        case ACCOUNT_INFO:{
            return action.payload
        }
        default:{
            return state
        }
     }
}
export default userReducers