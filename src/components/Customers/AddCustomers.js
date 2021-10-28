import React from 'react'
import Swal from 'sweetalert2'
import CustomersForm from './CustomersForm'
import { Typography } from '@material-ui/core'
import { addCustomerAction } from '../../REDUX/Actions/customersActions'
import { useDispatch } from 'react-redux'

const AddCustomers = (props) => {

    const dispatch=useDispatch()

    const [isSaved,setIsSaved]=useState(false)

    const formSubmission=(formData)=>{
         const successMessage=()=>{
            Swal.fire({
                icon: 'success',
                text: 'Successfully registered'
            })
         }
       const setResetFormHandle=()=>{
          setIsSaved(true)
       }  
       dispatch(addCustomerAction(formData,successMessage,setResetFormHandle))
          
    }
    const resetFormHandle=()=>{
        setIsSaved(!isSaved)
    }

    return (
        <div>
                <Typography variant="h5">Add Customer</Typography>
            
            <CustomersForm formSubmission={formSubmission} resetFormHandle={resetFormHandle} isSaved={isSaved}/>
        </div>
    )
}

export default AddCustomers
