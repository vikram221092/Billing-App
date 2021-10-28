import { ADD_PRODUCT,ALL_PRODUCTS,DELETE_PRODUCT,EDIT_PRODUCT } from '../Actions/productsActions'

const initialStateValue=[]

const productsReducers=(state=initialStateValue,action)=>{
   
         switch(action.type){
            case ADD_PRODUCT:{
                return [action.payload,...state]
            }
            case ALL_PRODUCTS:{
                return action.payload
            }
            case DELETE_PRODUCT:{
                return state.filter((ele)=>{
                    return ele._id !==action.payload._id
                })
            }
            case EDIT_PRODUCT:{
                return state.map((ele)=>{
                    if(ele._id===action.payload._id){
                        return {...ele,...action.payload.result}
                    }
                    else{
                        return {...ele}
                    }
                })
            }
            default:{
                return state
            }
         }
}
export default productsReducers