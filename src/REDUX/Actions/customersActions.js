import axios from "axios";

export const ADD_CUSTOMER="ADD_CUSTOMER"
export const ALL_CUSTOMER="ALL_CUSTOMER"
export const DELETE_CUSTOMER="DELETE_CUSTOMER"
export const EDIT_CUSTOMER="EDIT_CUSTOMER"

export const addCustomerAction=(formData,successMessage,setResetFormHandle)=>{

    return (dispatch)=>{
        axios.post(`https://dct-billing-app.herokuapp.com/api/customers`,formData,{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
        .then((res)=>{
              const result=res.data 
              if(result){
                    successMessage()
                    dispatch({type:ADD_CUSTOMER,payload:result})
                    setResetFormHandle()
                }  
        }).catch((err)=>{
            alert(err.message)
        })
    }
}
export const allCustomerListAction=()=>{

       return (dispatch)=>{
           axios.get(`https://dct-billing-app.herokuapp.com/api/customers`,{
               headers:{
                'Authorization':localStorage.getItem('token')
               }
           })
           .then((res)=>{
              const result=res.data
              dispatch({type:ALL_CUSTOMER,payload:result})
           })
           .catch((err)=>{
              alert(err.message)
            })
       }
}

export const deleteCustomerAction=(_id)=>{
    return (dispatch)=>{
       axios.delete(`https://dct-billing-app.herokuapp.com/api/customers/${_id}`,{
           headers:{
            'Authorization':localStorage.getItem('token') 
           }
       })
       .then((res)=>{
          const result=res.data
          dispatch({type:DELETE_CUSTOMER,payload:result})
       })  
       .catch((err)=>{
           alert(err.message)
       })
    }
}

export const editCustomerAction=(formData,_id)=>{
    return (dispatch)=>{    
        axios.put(`https://dct-billing-app.herokuapp.com/api/customers/${_id}`,formData,{
            headers:{
             'Authorization':localStorage.getItem('token') 
            }
        })    
        .then((res)=>{
            const result=res.data
            dispatch({type:EDIT_CUSTOMER,payload:result})
         
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}