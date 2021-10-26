import {ADD_CUSTOMER,ALL_CUSTOMER,DELETE_CUSTOMER,EDIT_CUSTOMER} from '../Actions/customersActions'

const initialState = []

const customersReducers=(state=initialState,action)=>{

    switch(action.type){
         case ADD_CUSTOMER:{
            return [action.payload,...state] 
         }
         case ALL_CUSTOMER:{
             return action.payload
         }
         case DELETE_CUSTOMER:{
             return state.filter((ele)=>{
                return ele._id !== action.payload._id 
             })
         }
         case EDIT_CUSTOMER:{
             return state.map((ele)=>{
                 if(ele._id===action.payload._id){
                     return {...ele,...action.payload}
                 }else{
                     return {...ele}
                 }
             })
         }
        default:{
            return state
        }
    }
}
export default customersReducers