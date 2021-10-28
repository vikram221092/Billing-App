import axios from "axios";

export const ADD_PRODUCT="ADD_PRODUCT"
export const ALL_PRODUCTS="ALL_PRODUCTS"
export const DELETE_PRODUCT="DELETE_PRODUCT"
export const EDIT_PRODUCT="EDIT_PRODUCT"

export const addProductsAction=(formData,successMessage,setResetFormHandle)=>{

    return (dispatch)=>{
        axios.post(`https://dct-billing-app.herokuapp.com/api/products`,formData,{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
        .then((res)=>{
            const result=res.data
            if(result){
                dispatch({type:ADD_PRODUCT,payload:result})
                successMessage()
                setResetFormHandle()
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}
export const getAllProducts=()=>{
     return (dispatch)=>{
        axios.get(`https://dct-billing-app.herokuapp.com/api/products`,{
            headers:{
                'Authorization':localStorage.getItem('token') 
            }
        })
        .then((res)=>{
            const result=res.data
            if(result){
                dispatch({type:ALL_PRODUCTS,payload:result})    
             }
          })
        .catch((err)=>{
            alert(err.message)
        })
     }
}

export const deleteProductAction=(_id)=>{
    return (dispatch)=>{
         axios.delete(`https://dct-billing-app.herokuapp.com/api/products/${_id}`,{
             headers:{
                'Authorization':localStorage.getItem('token') 
             }
         })
         .then((res)=>{
            const result=res.data
            
            if(result){
                dispatch({type:DELETE_PRODUCT,payload:result})
            }
         })
         .catch((err)=>{
             alert(err.message)
         })
    }
}
export const editProductAction=(formData,_id)=>{
     return (dispatch)=>{
         axios.put(`https://dct-billing-app.herokuapp.com/api/products/${_id}`,formData,{
             headers:{ 
                'Authorization':localStorage.getItem('token') 
             }
         })  
         .then((res)=>{
              const result=res.data

             if(result){
                 dispatch({type:EDIT_PRODUCT,payload:{result:result,_id:_id}})
             }
         }) 
         .catch((err)=>{
             alert(err.message)
         })
     }
}